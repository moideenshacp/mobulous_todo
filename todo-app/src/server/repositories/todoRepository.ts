import { PrismaClient } from "@prisma/client";
import {
  TodoCreateInput,
  TodoUpdateInput,
  TodoDeleteInput,
} from "../schemas/todoSchema";
export class TodoRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: TodoCreateInput, userId: string) {
    return this.prisma.todo.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.todo.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update({ id, isCompleted }: TodoUpdateInput, userId: string) {
    return this.prisma.todo.updateMany({
      where: {
        id,
        userId, 
      },
      data: {
        isCompleted,
        updatedAt: new Date(),
      },
    });
  }

  async delete({ id }: TodoDeleteInput, userId: string) {
    return this.prisma.todo.deleteMany({
      where: {
        id,
        userId, 
      },
    });
  }
}
