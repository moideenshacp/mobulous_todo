import { z } from "zod";

export const registerInput = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export const loginInput = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof registerInput>;
export type LoginInput = z.infer<typeof loginInput>;