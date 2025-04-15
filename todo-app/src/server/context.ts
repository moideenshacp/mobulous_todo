import { PrismaClient } from "@prisma/client";
import * as trpcNext from "@trpc/server/adapters/next";
import { TodoRepository } from "./repositories/todoRepository";

const prisma = new PrismaClient();

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  return {
    req,
    res,
    prisma,
    repositories: {
      todo: new TodoRepository(prisma),
    },
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
