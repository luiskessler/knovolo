import { compare } from "bcryptjs";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import jwt from "jsonwebtoken";


export const extensionRouter = createTRPCRouter({
    handleSignIn: publicProcedure
        .input(z.object({ organization: z.string(), email: z.string(), password: z.string() }))
        .mutation(async ({ input }) => {
            const { organization, email, password } = input;

            if (!organization || !email || !password) {
                throw new Error("Invalid input");
            }

            const user = await db.user.findFirst({
                where: {
                email: email,
                organization: {
                    slug: organization,
                },
                },
                include: { organization: true },
            });

            if (!user || !user.password) return null;

            const valid = await compare(password.toString(), user.password);
            if (!valid) return null;

            const token = jwt.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    organization: user.organization,
                },
                process.env.EXTENSION_AUTH_SECRET!,
                {
                    expiresIn: "30d",
                }
            );
            
            return { token };
        }),
}); 