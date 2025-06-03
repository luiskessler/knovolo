import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { testRouter } from "./routers/test";
import { invitationRouter } from "./routers/invitation";
import { organizationRouter } from "./routers/organization";
import { userRouter } from "./routers/user";
import { questionsRouter } from "./routers/question";
import { uploadRouter } from "./routers/upload";
import { billingRouter } from "./routers/billing";
import { marketingRouter } from "./routers/marketing";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  test: testRouter,
  organization: organizationRouter,
  invitation: invitationRouter,
  user: userRouter,
  question: questionsRouter,
  upload: uploadRouter,
  billing: billingRouter,
  marketing: marketingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
