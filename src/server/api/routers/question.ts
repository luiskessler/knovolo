import bcrypt, { compare } from "bcryptjs";
import { date, z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import jwt from "jsonwebtoken";
import { create } from "domain";


export const questionsRouter = createTRPCRouter({
    createNewQuestion: protectedProcedure 
    .input(z.object({question: z.string(), description: z.string(), files: z.array(z.string())}))
    .mutation(async ({ input, ctx }) => {
        const session = ctx.session

        if (!input.question || !input.description || !input.files) {
            return { status: 400, message: "Invalid Input." };
        }
        
        if (!session || !session.user) {
            return { status: 401, message: "You must be logged in to create a question." };
        }

        if (!session.user.organization || !session.user.organization.id) {
            return { status: 401, message: "You must be part of an organization to create a question." };
        }

        const question = await db.question.create({
            data: {
                title: input.question,
                content: input.description,                
                author: {
                    connect: {
                        id: session?.user?.id,
                    },
                },
                organization: {
                    connect: {
                        id: session?.user?.organization?.id,
                    },
                },
                files: input.files
            },
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                },
              },
              answers: true,
              votes: true,
              organization: true,
            }
        });

        return { status: 201, message: "Question created successfully.", question: question }
      }),

    getQuestionByID: protectedProcedure
    .input(z.object({questionID: z.string()}))
    .mutation(async ({input, ctx}) => {
      const session = ctx.session

      if (!input.questionID) {
        return { status: 400, message: "Invalid Input." };
      } 
      
      if (!session) {
          return { status: 401, message: "You must be logged in to create a question." };
      }

      if (!session.user.organization || !session.user.organization.id) {
          return { status: 401, message: "You must be part of an organization to create a question." };
      }

      const question = await db.question.findFirst({
        where: {
          id: input.questionID,
          organizationId: session.user.organization.id,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              surname: true,
              //email: true,          
            },
          },
          organization: true,
          answers: true,
          votes: true
        }
      });

      if (!question) {
        return { status: 404, message: "Question not found." };
      }

      return {status: 200, message: "Question found.", data: question};
    }),

    getAllQuestions: protectedProcedure
    .query(async ({ctx}) => {
      const session = ctx.session

      if (!session.user.organization) {
        return { status: 401, message: "Insufficient Permissions." };
      }

      const questions = await db.question.findMany(
        {
          where: {
            organizationId: session.user.organization.id,
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                surname: true,
              },
            },
            organization: true,
            answers: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    surname: true,
                  },
                },
                votes: true,
                parent: {
                  include: {
                    author: {
                      select: {
                        id: true,
                        name: true,
                        surname: true,
                      },
                    }
                  }
                },
                replies: true
              }
            },
            votes: true
          }
        }
      );

      return {status: 200, message: "Questions retrieved.", data: questions};
    }),

    createAnswer: protectedProcedure
    .input(z.object({
        content: z.string().min(1, "Answer content cannot be empty"),
        questionId: z.string().min(1, "Question ID is required"),
        parentId: z.string().nullish(), 
    }))
    .mutation(async ({ input, ctx }) => {
        const session = ctx.session;

        if (!session?.user?.id) {
            return { 
                status: 401, 
                message: "Unauthorized: You must be logged in" 
            };
        }

        if (!input.content || !input.questionId) {
            return { 
                status: 400, 
                message: "Missing required fields" 
            };
        }

        try {
            const question = await db.question.findUnique({
                where: {
                    id: input.questionId,
                },
                select: {
                    id: true,
                    organizationId: true,
                    status: true,
                },
            });

            if (!question) {
                return { 
                    status: 404, 
                    message: "Question not found" 
                };
            }

            
            if (!session.user.organization || question.organizationId !== session.user.organization.id) {
                return { 
                    status: 403, 
                    message: "You don't have permission to answer this question" 
                };
            }

            
            if (question.status !== "active") {
                return { 
                    status: 400, 
                    message: "Cannot answer a non-active question" 
                };
            }

            
            if (input.parentId) {
                const parentAnswer = await db.answer.findUnique({
                    where: {
                        id: input.parentId,
                    },
                    select: {
                        id: true,
                        questionId: true,
                    },
                });

                if (!parentAnswer) {
                    return { 
                        status: 404, 
                        message: "Parent answer not found" 
                    };
                }

                if (parentAnswer.questionId !== input.questionId) {
                    return { 
                        status: 400, 
                        message: "Parent answer does not belong to the specified question" 
                    };
                }
            }

            
            const newAnswer = await db.answer.create({
                data: {
                    content: input.content,
                    questionId: input.questionId,
                    authorId: session.user.id,
                    parentId: input.parentId || null,
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            surname: true,
                        },
                    },
                    votes: true,
                    parent: true,
                    replies: true,
                },
            });

            return {
                status: 201,
                message: "Answer created successfully",
                data: newAnswer,
            };
        } catch (error) {
            console.error("Error creating answer:", error);
            return { 
                status: 500, 
                message: "Failed to create answer. Please try again." 
            };
        }
    })
  })

