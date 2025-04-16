import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const procedure = t.procedure;


// Middleware to check if user is authenticated
const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.userId) {
      throw new TRPCError({ 
        code: "UNAUTHORIZED",
        message: "Not authenticated" 
      });
    }
    return next({
      ctx: {
        // Add user ID to the context
        userId: ctx.userId,
      },
    });
  });
  
  // Protected procedure - only accessible to authenticated users
export const protectedProcedure = t.procedure.use(isAuthed);