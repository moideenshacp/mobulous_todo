import { procedure, router } from "../trpc";
import {
  todoCreateSchema,
  todoDeleteSchema,
  todoUpdateSchema,
} from "../schemas/todoSchema";
import { TRPCError } from "@trpc/server";

export const todoRouter = router({
  create: procedure.input(todoCreateSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repositories.todo.create(input);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create todo",
        cause: error,
      });
    }
  }),

  list: procedure.query(async ({ ctx }) => {
    try {
      return await ctx.repositories.todo.findAll();
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch todos",
        cause: error,
      });
    }
  }),

  update: procedure.input(todoUpdateSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repositories.todo.update(input);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update todo",
        cause: error,
      });
    }
  }),

  delete: procedure.input(todoDeleteSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repositories.todo.delete(input);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete todo",
        cause: error,
      });
    }
  }),
});
