import bcrypt, { compare } from "bcryptjs";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import jwt from "jsonwebtoken";
import { sendVerifyOrganizationEmail } from "~/lib/email/services/sendVerifyOrganizationEmai";
import { isValidCustomEmail } from "~/utils/org/validators";
import { addDomain } from "~/utils/org/domainHelper";
import { initializeOrganizationBucket } from "~/server/storage";


export const organizationRouter = createTRPCRouter({
    handleCreateNewOrganization: publicProcedure
        .input(z.object({ organization: z.string(), name: z.string(), surname: z.string(), email: z.string(), password: z.string() }))
        .mutation(async ({ input }) => {
            const { organization, name, surname, email, password } = input;

            if (!organization || !name || !surname || !email || !password) {
                return { message: "Invalid input", status: 400 };
            }

            if (!await isValidCustomEmail(email)) {
                return { message: "Invalid email", status: 400 };
            }

            const user = await db.user.findFirst({
                where: {
                email: email,
                organization: {
                    slug: organization.toLowerCase(),
                },
                },
                include: { organization: true },
            });

            if (user) {
              return { message: "User already exists", status: 400 };              
            }

            const orgCheck = await db.organization.findFirst({
                where: {
                    name: organization,
                },
            });

            if (orgCheck) {
                return { message: "Organization with that name already exists", status: 400 };
            }

            const organizationData = await db.organization.create({
                data: {
                    name: organization,
                    slug: organization.toLowerCase(),
                    createdAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
                    users: {
                        create: {
                            email: email,
                            name: name,
                            surname: surname,
                            password: await bcrypt.hash(password, 12),
                            role: "admin",
                            status: "active",
                        },
                    },
                    
                },
            });

            const bucketSlug = await initializeOrganizationBucket(organizationData.id); 

            if (bucketSlug.status !== 200) {
                return { message: bucketSlug.message, status: bucketSlug.status };
            }

            await db.organization.update({
                where: { id: organizationData.id },
                data: { bucket: bucketSlug.data },
            });            
          
            const userData = await db.user.findFirst({
                where: {
                   email: email,
                   organization: {
                        id: organizationData.id,
                   }                   
               },
            });

            const token = jwt.sign(
              {
                  organizationID: organizationData.id,
                  userID: userData!.id,
              },
              process.env.ORG_AUTH_SECRET!,
              {
                  expiresIn: "7d",
              }
            );

            const tokenData = await db.jwtTokens.create({
                data: {
                    token: token,
                    state: "active",
                    purpose: "orgVerifyOrganization",
                    organization: {
                        connect: { id: organizationData.id },
                    },
                },
            });

            addDomain(userData?.email.split("@")[1]!, organizationData.id, userData!.id!);

            const verificationLink = `https://localhost:3000/auth/organization/verify-email?token=${token}`;

            sendVerifyOrganizationEmail(email, verificationLink, organizationData);

            return {
                message: "Organization created successfully",
                organization: organizationData,
                user: userData,
                status: 200,
              };
          }),
    
          handleVerifyEmail: protectedProcedure
          .input(z.object({ token: z.string() }))
          .mutation(async ({ input }) => {
              const { token } = input;
  
              if (!token) {
                  return { message: "Invalid input", status: 400 };
              }

              
              let decoded: any;

              try {
                  decoded = jwt.verify(token, process.env.ORG_AUTH_SECRET!);
              } catch (error) {
                  return { message: "Invalid or expired token", status: 400 };
              }

              
  
              const { userID, organizationID } = decoded;

           
              /*if (!await isValidCustomEmail(email)) {
                  return { message: "Invalid email", status: 400 };
              }*/ // fetch E-Mail from decoded.ID
  
              const user = await db.user.findFirst({
                  where: {
                      id: userID,
                      organization: {
                        id: organizationID
                      },
                  },
                  include: { organization: true },
              });

              const jwtToken = await db.jwtTokens.findFirst({
                where: {
                    token: token,
                    state: "active",
                    purpose: "orgVerifyOrganization",
                    organization: {
                        id: organizationID,
                    },
                },
            });

            if (!jwtToken) {
                return { message: "Invalid or expired token", status: 400 };
            }

  
              if (!user) {
                  return { message: "User not found", status: 400 };
              }
  
              const organization = await db.organization.findFirst({
                  where: {
                      id: organizationID,
                  },
              });
  
              if (!organization) {
                  return { message: "Organization not found", status: 400 };
              }
  
              if (organization.status !== "pending") {
                  return { message: "Organization already verified", status: 400 };
              }

              await db.organization.update({
                  where: { id: organizationID },
                  data: { status: "onboarding" },
              });

              await db.jwtTokens.update({
                  where: { id: jwtToken.id },
                  data: { state: "used" },
              });
  
              return { message: "Email verified successfully", status: 200 };
          }),

          getAllUsers: protectedProcedure
          .query(async ({ ctx }) => {
              const { organization } = ctx.session.user;

              if (!organization) {
                  return { message: "Invalid Session", status: 400 };
              }

              const organizationData = await db.organization.findFirst({
                  where: {
                      id: organization?.id,
                  },
                  include: {
                      users: {
                        select: {
                            id: true,
                            name: true,
                            surname: true,
                            email: true,
                            role: true,
                            status: true,
                        },
                      }
                  }
              });

              if (!organizationData) {
                  return { message: "Organization not found", status: 400 };
              }

              return { message: organizationData.users, status: 200 };
          }),

          handleAddNewDomain: protectedProcedure
          .input(z.object({ domain: z.string() }))
          .mutation(async ({ input, ctx }) => {
              const { domain } = input;
              

              if (!domain) {
                  return { message: "Invalid input", status: 400 };
              }

              addDomain(domain, ctx.session.user.organization!.id!, ctx.session.user.id!);

              return { message: "Domain added successfully", status: 200 };
          }),

          getUserOrganization: protectedProcedure
          .query(async ({ ctx }) => {
              const { organization } = ctx.session.user;

              /*if (!organization) {
                  return { message: "Invalid Session", status: 400 };
              }*/

              const organizationData = await db.organization.findFirst({
                  where: {
                      id: organization?.id,
                  },
              });

              /*if (!organizationData) {
                  return { message: "Organization not found", status: 400 };
              }*/

              return { message: organizationData, status: 200 };
          }),   
    })