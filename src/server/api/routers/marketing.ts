import bcrypt, { compare } from "bcryptjs";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import jwt from "jsonwebtoken";

import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const IV_LENGTH = 16;

export function encryptEmail(email: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(email, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

export const marketingRouter = createTRPCRouter({
    handleNewsletterSignup: publicProcedure
    .input(z.object({ email: z.string()}))
    .mutation(async ({ input, ctx }) => {
        if (!input.email) {
            throw new Error("Invalid input");
        }

        await db.newsletter.create({
            data: {
                email: await encryptEmail(input.email),
            },
        });

        return {
            status: "success"
        }
    }
    ),
    handleUnsubscribe: publicProcedure
        .input(z.object({ email: z.string()}))
        .mutation(async ({ input }) => {
            const { email } = input;

            if (!email) {
                return { message: "Invalid input", status: 400 };
            }

            await db.newsletter.delete({
                where: {
                    email: await encryptEmail(email),
                },
            });

            return {
                status: "success"
            }
        })
    });
