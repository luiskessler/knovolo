import bcrypt, { compare } from "bcryptjs";
import { date, z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import jwt from "jsonwebtoken";
import { sendUserInviteEmail } from "~/lib/email/services/sendUserInviteEmail";


export const invitationRouter = createTRPCRouter({
    createNewInvitation: publicProcedure
    .input(z.object({email: z.string(), name: z.string(), surname: z.string(),  role: z.enum(["admin", "user"])}))
    .mutation(async ({ input, ctx }) => {
        const { email, name, surname, role } = input;

        const session = ctx.session;

        const organization = session?.user.organization?.id;

        console.log(input)

        if (!session) {
            throw new Error("Invalid session");
        }

        if (!email || !name || !surname || !role) {
            throw new Error("Invalid input");
        }

        const user = await db.user.findFirst({
            where: {
                email: email,
                organization: {
                    id: organization,
                },
            },
        });

        if (user) {
            throw new Error("User already exists");
        }

        const inviteToken = await db.inviteToken.create({
            data: {
                token: crypto.randomUUID(),
                organization: {
                    connect: {
                        id: organization,
                    },
                },
                user: {
                    create: {
                        email: email,
                        name: name,
                        surname: surname,
                        role: role,
                        organization: {
                            connect: {
                                id: organization,
                            },
                        },
                    },
                },
                status: "active",
                expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
            },

        });

        const organizationData = await db.organization.findFirst({
            where: {
                id: organization,
            },            
        });

        if (!organizationData) {
            return ({status: 400, message: "Organization not found."})
        }

        const inviteURL = `http://localhost:3000/invitation?token=${inviteToken.token}`

        sendUserInviteEmail(email, inviteURL, user!, organizationData);

        return { status: 200, message: "Invitation created successfully.", inviteURL };
    }),

    validateToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {

        if (!input.token) {
            throw new Error("Invalid input");
        }

        console.log(input.token)

        const token = await db.inviteToken.findFirst({
            where: {
                token: input.token,
                expiresAt: {
                    gt: new Date(),
                },
            },
            include: { user: true, organization: true }
        })

        if (!token) { 
            return ({status: 400, message: "Token not found or has expired."})
        }

        if (token.status === "used"){
            return ({status: 400, message: "Token has already been used."})
        }

        return { token };
    }),

    completeUserSignup: publicProcedure
    .input(z.object({ id: z.string(), password: z.string(), token: z.string() }))
    .mutation(async ({ input }) => {
        const { id, password } = input;

        console.log(input)

        if (!id || !password) {
            throw new Error("Invalid input");
        }

        const existingUser = await db.user.findFirst({
        where: {
           id: id
        },
        });
    
        if (!existingUser) {
        return ({ status: 400, message: "User doesn't exist." });
        }

        const user = await db.user.update({
        where: {
            id: id
        },
        data: {
            password: await bcrypt.hash(password, 12),
            status: "active",
        },
        });


        await db.inviteToken.update({
            where: {
                id: input.token,
            },
            data: {
                status: "used",
            },
        })

        return {status: 200, message: "User signup completed successfully."}
    }),
}); 