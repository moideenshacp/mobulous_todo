import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { RegisterInput } from "../schemas/authenticationSchema";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create({ email, password, name }: RegisterInput) {
    const passwordHash = await bcrypt.hash(password, 10);
    
    return this.prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
      },
    });
  }

  async validatePassword(hash: string, password: string) {
    return bcrypt.compare(password, hash);
  }
}