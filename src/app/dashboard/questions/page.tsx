"use client";

import type { Answer } from "@prisma/client";
import { ArrowLeft, ClipboardIcon, Reply, Search, Send, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MediaUpload from "~/app/_components/common/mediaUpload";
import { SearchableTable } from "~/app/_components/dashboard/searchableTable";
import type { QuestionWithRelations } from "~/types/prismaTypes";
import { api } from "~/trpc/react";

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] =
    useState<boolean>(false);
  const [openQuestion, setOpenQuestion] = useState<QuestionWithRelations>();
  const [questions, setQuestions] = useState<QuestionWithRelations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [newAnswer, setNewAnswer] = useState<string>("");

  const [replyMessage, setReplyMessage] = useState<Answer>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const questionFromSearchParams = searchParams.get("question");

  const session = useSession();

  const departments =
    questions.length > 0
      ? [
          "All",
          ...Array.from(
            new Set(questions.map((q) => q.organizationId).filter(Boolean)),
          ),
        ]
      : ["All"];

  const columns = [
    {
      field: "title" as const,
      label: "Question",
      sortable: true,
      render: (item: QuestionWithRelations) => (
        <span className="font-medium text-black">
          {item.title || "Untitled"}
        </span>
      ),
    },
    {
      field: "authorId" as const,
      label: "Creator",
      sortable: true,
      render: (item: QuestionWithRelations) => (
        <span className="font-medium text-black">
          {item.author?.name || "Unknown User"}
        </span>
      ),
    },
    {
      field: "answers" as const,
      label: "Answers",
      sortable: true,
      render: (item: QuestionWithRelations) => (
        <span className="font-medium text-black">
          {item.answers?.length || 0}
        </span>
      ),
    },
    {
      field: "createdAt" as const,
      label: "Date Created",
      sortable: true,
      render: (item: QuestionWithRelations) => (
        <span>
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : "Unknown date"}
        </span>
      ),
    },
  ];

  const filterOptions = [
    {
      field: "organizationId",
      label: "Department",
      options: departments,
    },
  ];

  const { data, refetch: refetchQuestions } =
    api.question.getAllQuestions.useQuery();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await refetchQuestions();

        if (data!.data!.status === 200 && data!.data!.data) {
          setQuestions(data!.data!.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (questionFromSearchParams && questions.length > 0) {
      const question = questions.find(
        (question) => question.id === questionFromSearchParams,
      );
      setOpenQuestion(question);
    }
  }, [questionFromSearchParams, questions]);

  const handleAddQuestion = () => {
    setIsAddQuestionModalOpen(true);
  };

  const handleRowClick = (question: QuestionWithRelations) => {
    router.push(`/dashboard/questions?question=${question.id}`);
    setOpenQuestion(question);
  };

  const createAnswerMutation = api.question.createAnswer.useMutation();

  const handleNewAnswerSubmit = async () => {
    if (!newAnswer.trim()) {
      return;
    }

    if (!openQuestion) {
      console.error("No question selected");
      return;
    }

    try {
      const result = await createAnswerMutation.mutateAsync({
        content: newAnswer.trim(),
        questionId: openQuestion.id,
        parentId: replyMessage ? replyMessage.id : null,
      });

      if (result.status === 200 || (result.status === 201 && result.data)) {
        setOpenQuestion((prevQuestion) => {
          if (!prevQuestion) return prevQuestion;

          return {
            ...prevQuestion,
            answers: [
              ...prevQuestion.answers,
              result.data as QuestionWithRelations["answers"][number],
            ],
          };
        });

        setNewAnswer("");
        setReplyMessage(undefined);

        const answersContainer = document.querySelector(".overflow-y-scroll");
        if (answersContainer) {
          answersContainer.scrollTop = answersContainer.scrollHeight;
        }
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const userQuestions = questions.filter(
    (q) => q.authorId === (session.data?.user?.id || ""),
  );

  return (
    <>
      {isAddQuestionModalOpen && (
        <AddQuestionModal
          isOpen={isAddQuestionModalOpen}
          onClose={() => setIsAddQuestionModalOpen(!isAddQuestionModalOpen)}
          onQuestionAdded={(newQuestion) => {
            setQuestions((prev) => [newQuestion, ...prev]);
            setIsAddQuestionModalOpen(false);
          }}
        />
      )}
      <main className="h-full max-h-[92vh] overflow-y-scroll p-6">
        {openQuestion && (
          <>
            <div className="h-full w-full">
              <div className="mb-4 flex items-center">
                <button
                  onClick={() => {
                    router.push("/dashboard/questions");
                    setOpenQuestion(undefined);
                  }}
                  className="mr-4 flex items-center text-gray-500 hover:text-black"
                >
                  <ArrowLeft size={16} className="mr-1" /> Back
                </button>
              </div>
              <div className="h-[93.5%] rounded-lg border border-gray-200 bg-white">
                <div className="flex h-fit flex-col gap-4 border-b border-gray-200 p-6">
                  <div className="flex justify-between">
                    <p className="text-xl font-medium">
                      {openQuestion.title || "Untitled Question"}
                    </p>
                    <div className="text-sm text-gray-500">
                      Created by {openQuestion.author?.name || "Unknown User"}{" "}
                      on{" "}
                      {openQuestion.createdAt
                        ? new Date(openQuestion.createdAt).toLocaleDateString()
                        : "Unknown date"}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {openQuestion.content || "No description provided."}
                  </div>
                </div>

                <div
                  className={`flex ${
                    replyMessage
                      ? "h-[calc(100%-260px)]"
                      : "h-[calc(100%-200px)]"
                  } flex-col gap-4 overflow-y-scroll p-6`}
                >
                  {openQuestion.answers && openQuestion.answers.length > 0 ? (
                    openQuestion.answers.map((answer, index) => {
                      if (!answer) return null;

                      const currentDate = answer.createdAt
                        ? new Date(answer.createdAt).toDateString()
                        : new Date().toDateString();

                      const prevDate =
                        index > 0 && openQuestion.answers[index - 1]?.createdAt
                          ? new Date(
                              openQuestion.answers[index - 1]!.createdAt,
                            ).toDateString()
                          : null;

                      const showDateSeparator = currentDate !== prevDate;
                      const isCurrentUser =
                        answer.authorId === session?.data?.user?.id;

                      return (
                        <React.Fragment key={answer.id}>
                          {showDateSeparator && (
                            <div className="z-10 mb-2 bg-white text-center text-xs text-gray-500">
                              {answer.createdAt
                                ? new Date(answer.createdAt).toLocaleDateString(
                                    undefined,
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    },
                                  )
                                : "Unknown date"}
                            </div>
                          )}
                          <div
                            id={answer.id}
                            className={`relative flex w-full ${
                              isCurrentUser ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`group relative ${
                                isCurrentUser ? "flex-row" : "flex-row-reverse"
                              } flex max-w-[70%]`}
                              onDoubleClick={() => {
                                setReplyMessage(answer);
                              }}
                            >
                              <div className="hidden w-fit flex-col justify-between gap-2 p-1 px-2 group-hover:flex">
                                <div className="flex gap-1">
                                  <button
                                    onClick={() =>
                                      navigator.clipboard.writeText(
                                        answer.content || "",
                                      )
                                    }
                                  >
                                    <ClipboardIcon
                                      size={20}
                                      className="inline w-fit"
                                    />
                                  </button>
                                  <button
                                    onClick={() => setReplyMessage(answer)}
                                  >
                                    <Reply size={20} className="inline w-fit" />
                                  </button>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {answer.createdAt
                                    ? new Date(
                                        answer.createdAt,
                                      ).toLocaleTimeString()
                                    : "Unknown time"}
                                </span>
                              </div>

                              <div className="flex flex-col rounded-lg bg-gray-50">
                                {answer.parentId && (
                                  <Link
                                    href={`/dashboard/questions?question=${openQuestion.id}#${answer.id}`}
                                    className="flex w-full items-center gap-1 p-1 px-2 text-gray-500"
                                  >
                                    <Reply size={18} className="inline w-fit" />
                                    <p>
                                      {answer.author?.name || "Unknown"} replied
                                      to{" "}
                                      {answer.parent?.author?.name || "Unknown"}
                                    </p>
                                  </Link>
                                )}

                                <div
                                  className={`rounded-lg p-4 ${
                                    isCurrentUser
                                      ? "bg-gray-100"
                                      : "bg-gray-100"
                                  }`}
                                >
                                  <span className="font-medium">
                                    {isCurrentUser
                                      ? "You"
                                      : answer.author?.name || "Unknown User"}
                                  </span>

                                  <p>{answer.content || "No content"}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">
                      No answers yet. Be the first to respond!
                    </div>
                  )}
                </div>

                {replyMessage && (
                  <div className="flex h-10 w-full items-center gap-4 rounded-t-md bg-gray-100 px-4">
                    <p className="line-clamp-1 w-full text-sm overflow-ellipsis text-gray-700">
                      Replying to: {replyMessage.content || "This message"}
                    </p>
                    <button onClick={() => setReplyMessage(undefined)}>
                      <X size={20} />
                    </button>
                  </div>
                )}
                <div className="flex h-fit flex-col gap-4 border-t border-gray-200 p-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add your answer..."
                      className="h-10 flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleNewAnswerSubmit();
                        }
                      }}
                    />
                    <button
                      onClick={handleNewAnswerSubmit}
                      disabled={!newAnswer.trim()}
                      className="flex h-10 items-center justify-center gap-1 rounded-lg bg-black px-4 py-2 text-white disabled:bg-gray-300"
                    >
                      <p>Send</p>
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {!openQuestion && (
          <>
            <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
              <div className="relative">
                <Search className="absolute top-0 bottom-0 left-3 my-auto h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ask a question or search for a process..."
                  className="w-full rounded-lg border border-gray-300 py-3 pr-20 pl-10 text-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute top-1 right-1 bottom-1 my-auto rounded-lg bg-black px-4 py-2 text-white transition-all hover:bg-gray-800">
                  Ask AI
                </button>
              </div>
            </div>

            <div className="mb-8 flex flex-col-reverse gap-8">
              <SearchableTable
                data={questions}
                columns={columns}
                defaultSortField="createdAt"
                defaultSortOrder="desc"
                title="Recent Questions"
                searchPlaceholder="Search questions..."
                addButton={{
                  label: "New Question",
                  onClick: handleAddQuestion,
                }}
                emptyStateMessage={
                  loading
                    ? "Loading questions..."
                    : "No questions found. Create a new one!"
                }
                onRowClick={handleRowClick}
              />
              <SearchableTable
                data={userQuestions}
                columns={columns}
                defaultSortField="createdAt"
                defaultSortOrder="desc"
                title="Your Questions"
                searchPlaceholder="Search questions..."
                addButton={{
                  label: "New Question",
                  onClick: handleAddQuestion,
                }}
                emptyStateMessage={
                  loading
                    ? "Loading questions..."
                    : "No questions found. Create a new one!"
                }
                onRowClick={handleRowClick}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}

type AddQuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onQuestionAdded: (question: QuestionWithRelations) => void;
};

const AddQuestionModal = ({
  isOpen,
  onClose,
  onQuestionAdded,
}: AddQuestionModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const router = useRouter();

  const createNewQuestionMutation =
    api.question.createNewQuestion.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!title || !description) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await createNewQuestionMutation.mutateAsync({
        question: title,
        description: description,
        files: files,
      });

      if (data.status === 201 || data.status === 200) {
        const safeQuestion = {
          ...data.question,
          author: data.question!.author!,
          answers: data.question!.answers!,
          organization: data.question!.organization!,
          votes: data.question!.votes!,
        };

        onQuestionAdded(safeQuestion! as QuestionWithRelations);
        router.push(`/dashboard/questions?question=${safeQuestion.id}`);
      }
    } catch (error) {
      console.error("Error creating question:", error);
      setError("Failed to create question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="hide-scrollbar flex h-fit max-h-[80vh] w-full max-w-[70%] flex-col gap-4 overflow-y-scroll rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Add New Question</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Ask a question or search for a process..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              className="min-h-fit w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              name="description"
              id="description"
              placeholder="Describe the question in detail..."
              cols={5}
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <MediaUpload
            onMediaUpload={() => setFiles([])}
            setIsUploaded={setIsUploaded}
          />

          <button
            onClick={(e) => handleSubmit(e)}
            className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
