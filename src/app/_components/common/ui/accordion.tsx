"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    isFirst?: boolean;
    isLast?: boolean;
  }
>(({ className, isFirst, isLast, ...props }, ref) => {
  const itemClass = `w-full ${
    isFirst ? "pt-0 pb-4" : isLast ? "pt-4 pb-0" : "pt-4 pb-4"
  } ${className ?? ""}`;

  return <AccordionPrimitive.Item ref={ref} {...props} />;
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = ({
  children,
  theme,
  ...props
}: {
  theme?: "light" | "dark";
  children: React.ReactNode;
}) => (
  <AccordionPrimitive.Header className="flex w-full">
    <AccordionPrimitive.Trigger
      className={`text-muted-foreground } flex flex-1 items-center justify-between text-lg text-white transition-all hover:underline [&[data-state=open]>svg]:rotate-180`}
      {...props}
    >
      <span className="text-white">{children}</span>
      <ChevronDown className="size-6 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all"
    {...props}
  >
    <div className="pt-0">{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
