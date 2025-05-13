import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { User } from "@prisma/client";

const pathDataSchema = z.object({
   id: z.number(),
   pageURL: z.string(),
   x: z.number(),
   y: z.number(),
   scrollPosition: z.number(),
   elementType: z.enum(["button", "input", "a"]),
   action: z.enum(["click", "input", "submit", "upload", "hover"]),
   XPath: z.string(),
   CSS: z.string(),
   textContent: z.string(),
   ariaLabel: z.string().optional(),
   href: z.string().optional(),
   formContext: z.string().optional(),
});



export const pathsRouter = createTRPCRouter({
    createNewPath: protectedProcedure 
        .input(z.object({ name: z.string(), keywords: z.string().array(), userId: z.string(), organizationId: z.string(),  pathData: pathDataSchema.array() }))
        .mutation(async ({ input, ctx }) => {
            const { name, keywords, userId, organizationId, pathData } = input;

            //createNewPath
            
        })
    }) 
