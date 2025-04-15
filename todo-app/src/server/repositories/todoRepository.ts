// src/server/repositories/todoRepository.ts
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

  async create(data: TodoCreateInput) {
    return this.prisma.todo.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update({ id, isCompleted }: TodoUpdateInput) {
    return this.prisma.todo.update({
      where: { id },
      data: {
        isCompleted,
        updatedAt: new Date(),
      },
    });
  }

  async delete({ id }: TodoDeleteInput) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
