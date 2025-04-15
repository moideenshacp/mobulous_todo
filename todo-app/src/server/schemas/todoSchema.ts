import { z } from "zod";

export const todoCreateSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().optional(),
});

export const todoUpdateSchema = z.object({
  id: z.string(),
  isCompleted: z.boolean(),
});

export const todoDeleteSchema = z.object({
  id: z.string(),
});

export type TodoCreateInput = z.infer<typeof todoCreateSchema>;
export type TodoUpdateInput = z.infer<typeof todoUpdateSchema>;
export type TodoDeleteInput = z.infer<typeof todoDeleteSchema>;
