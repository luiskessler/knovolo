import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import jwt from "jsonwebtoken";

export const testRouter = createTRPCRouter({
    decodeToken: protectedProcedure
      .input(z.object({ token: z.string() }))
      .mutation(async ({ input }) => {
        const {token} = input  
        const decoded = jwt.verify(token, process.env.EXTENSION_AUTH_SECRET!);
        
        return decoded
    })})