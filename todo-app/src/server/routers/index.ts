import { router } from "../trpc";
import { todoRouter } from "./todoRouter";
import { authRouter } from "./authRouter";

export const appRouter = router({
  todo: todoRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;