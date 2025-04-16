import { PrismaClient } from "@prisma/client";
import * as trpcNext from "@trpc/server/adapters/next";
import { TodoRepository } from "./repositories/todoRepository";
import { UserRepository } from "./repositories/userRepository";
import { AuthService } from "./services/authService";

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  // Get the user token from the headers
  const token = req.headers.authorization?.split(" ")[1];

  // Retrieve a user with the token
  const userId = token ? authService.verifyToken(token) : null;

  return {
    req,
    res,
    prisma,
    userId,
    repositories: {
      todo: new TodoRepository(prisma),
      user: userRepository,
    },
    services: {
      auth: authService,
    },
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
