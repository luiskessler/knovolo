import React from "react";
import {
  AccordionItem,
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "../common/ui/accordion";

export default function FAQSectionComponent() {
  const faqItems = [
    {
      id: "1",
      question: "What is Knovolo?",
      answer:
        "Knovolo is a platform that allows you to create and manage your knowledge base. It is a powerful tool for organizing and sharing knowledge, making it easy to find and access the information you need.",
    },
    {
      id: "2",
      question: "How does Knovolo work?",
      answer:
        "Knovolo is a platform that allows you to create and manage your knowledge base. It is a powerful tool for organizing and sharing knowledge, making it easy to find and access the information you need.",
    },
    {
      id: "3",
      question: "What are the benefits of using Knovolo?",
      answer:
        "Knovolo is a platform that allows you to create and manage your knowledge base. It is a powerful tool for organizing and sharing knowledge, making it easy to find and access the information you need.",
    },
    {
      id: "4",
      question: "How can I get started with Knovolo?",
      answer:
        "Knovolo is a platform that allows you to create and manage your knowledge base. It is a powerful tool for organizing and sharing knowledge, making it easy to find and access the information you need.",
    },
  ];

  const Separator = () => (
    <div className="flex w-full items-center justify-center py-4">
      <hr className="w-full border-[#acacac]/30" />
    </div>
  );

  return (
    <div
      className="w-full border-t border-[#1c1c1c]"
      style={{
        background:
          "linear-gradient(36deg,rgba(12, 12, 12, 0.3) 0%, rgba(44, 44, 44, 0.4) 60%, rgba(12, 12, 12, 1) 100%)",
      }}
    >
      <div className="mx-auto flex w-[70%] max-w-7xl flex-col space-y-[10vh] py-[10vh]">
        <h3 className="w-4/6 text-4xl font-medium text-balance text-white">
          Frequently asked questions
        </h3>
        <Accordion className="flex w-full flex-col" type="single" collapsible>
          {faqItems.map((item, index) => (
            <div key={index + item.id}>
              <AccordionItem
                key={index}
                value={item.id}
                isFirst={index === 0}
                isLast={index === faqItems.length - 1}
              >
                <AccordionTrigger theme="dark">
                  <h3 className="pr-2 text-start">{item.question}</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pt-2 text-start text-[#acacac]">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
              {index !== faqItems.length - 1 && <Separator />}
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
