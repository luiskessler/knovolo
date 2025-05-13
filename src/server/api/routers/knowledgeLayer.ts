import { compare } from "bcryptjs";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import jwt from "jsonwebtoken";


export const knowledgeLayerRouter = createTRPCRouter({
    handleCreateKnowledgeLayer: publicProcedure
    .input(z.object({ organization: z.string(), email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {})
});