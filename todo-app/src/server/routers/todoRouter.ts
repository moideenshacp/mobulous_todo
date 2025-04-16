import { protectedProcedure, router } from "../trpc";
import { todoCreateSchema, todoUpdateSchema, todoDeleteSchema } from "../schemas/todoSchema";
import { TRPCError } from "@trpc/server";

export const todoRouter = router({
  create: protectedProcedure.input(todoCreateSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repositories.todo.create(input, ctx.userId);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create todo",
        cause: error,
      });
    }
  }),
  
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.repositories.todo.findAll(ctx.userId);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch todos",
        cause: error,
      });
    }
  }),
  
  update: protectedProcedure.input(todoUpdateSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repositories.todo.update(input, ctx.userId);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update todo",
        cause: error,
      });
    }
  }),
  
  delete: protectedProcedure.input(todoDeleteSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.repositories.todo.delete(input, ctx.userId);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete todo",
        cause: error,
      });
    }
  }),
});