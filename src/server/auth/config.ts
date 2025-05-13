import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "~/server/db"; // your Prisma client
import bcrypt, { compare } from "bcryptjs"; // or argon2 etc.

import type { NextAuthConfig, Session } from "next-auth";
import { getUserFromCache, setUserInCache } from "~/lib/redis/userDataRedis";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        org: { label: "Organization", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials, req) {
        const { org, email, password } = credentials ?? { org: "", email: "", password: "" };

        if (!org || !email || !password) return null;

        const user = await db.user.findFirst({
          where: {
            email: email,
            organization: {
              slug: org,
            },
          },
          include: { organization: true },
        });

        if (!user || !user.password) return null;

        const valid = await compare(password.toString(), user.password);
        if (!valid) return null;

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          organization: user.organization,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.name = user.name;
        token.email = user.email;
        token.org = user.organization;
        token.role = user.role;    
      }
      return token;
    },
    async session({ session, token } : {session: Session, token: any}) {
      let userData = await getUserFromCache(token.id);


      if (!userData) {
        const data = await db.user.findFirst({
          where: {
            id: session.user.id,
          },
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            role: true,
            status: true,
            organization: {
              select: {
                id: true,
                name: true,
                slug: true,
                createdAt: true,
                status: true,
                bucket: true,    
                billingEntity: {
                  select: {
                    stripeCustomer: true,
                  }
                }          
                //invoiceEmail: true,
                //billingAddress: true,
                //taxId: true,
              }
            }
          },
        });

        if (data && session.user) {
          session.user.id = data.id as string;
          session.user.name = data.name as string;
          session.user.email = data.email as string;
          session.user.role = data.role as string;
          

          if (data.role === "admin") {
            session.user.organization = data.organization;
            if (data) {
              setUserInCache(data.id, data);
            }
          } else { 
            const { billingEntity, ...orgWithoutBillingEntity } = data.organization || {};
            session.user.organization = orgWithoutBillingEntity;

            if (data) {
              setUserInCache(data.id, {
                ...data,
                organization: orgWithoutBillingEntity,
              });
            }
          }
        }
        



        return session;
      }
      
      if (session.user && token) {
        session.user.id = userData.id as string;
        session.user.name = userData.name as string;
        session.user.email = userData.email as string;
        session.user.organization = userData.organization;
        session.user.role = userData.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
};