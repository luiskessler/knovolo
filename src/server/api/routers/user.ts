import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendUserResetPasswordEmail } from "~/lib/email/services/sendUserResetPassword";

export const userRouter = createTRPCRouter({
    handleForgotPassword: publicProcedure
        .input(z.object({ email: z.string() }))
        .mutation(async ({ input }) => {
            const { email } = input;

            if (!email) {
                return { message: "Invalid input", status: 400 };
            }

            const user = await db.user.findFirst({
                where: {
                    email: email,
                },
                include: {
                    organization: true
                }
            });

            if (!user) {
                return { message: "User not found", status: 400 };
            }

            const token = jwt.sign(
                {
                    userID: user.id,
                },
                process.env.RESET_PASSWORD_SECRET!,
                {
                    expiresIn: "1d",
                }
            );

            await db.jwtTokens.create({
                data: {
                    userId: user.id,
                    token: token,
                    purpose: "userPasswordReset",
                    state: "active",
                    createdAt: new Date(Date.now()),
                },
            });

            const resetPasswordLink = `http://localhost:3000/user/reset-password?token=${token}`;

            sendUserResetPasswordEmail(email, resetPasswordLink, user.organization, user);

            return { message: user, resetPasswordLink, status: 200 };
        }),

    handleResetPassword: publicProcedure
        .input(z.object({ userID: z.string()}))
        .mutation(async ({ input }) => {
            const { userID } = input;

            if (!userID) {
                return { message: "Invalid input", status: 400 };
            }

            const user = await db.user.findFirst({
                where: {
                    id: userID,
                },
                include: {
                    organization: true
                }
            });

            if (!user) {
                return { message: "User not found", status: 400 };
            }

            const token = jwt.sign(
                {
                    userID: user.id,
                },
                process.env.RESET_PASSWORD_SECRET!,
                {
                    expiresIn: "1d",
                }
            );

            await db.jwtTokens.create({
                data: {
                    userId: user.id,
                    token: token,
                    purpose: "userPasswordReset",
                    state: "active",
                    createdAt: new Date(Date.now()),
                },
            });

            const resetPasswordLink = `http://localhost:3000/user/reset-password?token=${token}`;

            sendUserResetPasswordEmail(user.email, resetPasswordLink, user.organization, user);

            return { message: { user, resetPasswordLink }, status: 200 };
        }),

    handleResetPasswordConfirm: protectedProcedure
        .input(z.object({ token: z.string(), password: z.string() }))
        .mutation(async ({ input }) => {
            const { token, password } = input;

            if (!token || !password) {
                return { message: "Invalid input", status: 400 };
            }

            let decoded: any;
            try {
                decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET!);
            } catch (error) {
                return { message: "Invalid or expired token", status: 400 };
            }

            const { userID } = decoded;

            const user = await db.user.findFirst({
                where: {
                    id: userID,
                },
                include: {
                    emails: true,
                }
            });

            if (!user) {
                return { message: "User not found", status: 400 };
            } 
            
            const jwtToken = await db.jwtTokens.findFirst({
            where: {
                purpose: "userPasswordReset",
                state: "active",
                userId: user!.id,
                createdAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24) }, 
            },
            });

            if (!jwtToken) {
            return { message: "Password Reset Token has already been used.", status: 400 };
            }

            await db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    password: await bcrypt.hash(password, 12),
                    status: "active",
                },
            });

            await db.jwtTokens.update({
                where: {
                    id: jwtToken.id,
                },
                data: {
                    state: "used",
                },
            });

            return { message: "Password reset successfully", status: 200 };
        }),

    /*getUser: protectedProcedure
    .query(async ({ ctx }) => {
        const user = await db.user.findFirst({
            where: {
                id: ctx.session.user.id,
            },
            select: {
                name: true,
                surname: true,
                email: true,
                role: true,
                status: true,
            },
        });

        if (!user) {
            return { message: "User not found", status: 400 };
        }

        return user;
    }),*/
}); 