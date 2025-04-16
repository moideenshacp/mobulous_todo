import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";
import { UserRepository } from "../repositories/userRepository";
import { LoginInput, RegisterInput } from "../schemas/authenticationSchema";

export class AuthService {
  private userRepository: UserRepository;
  private jwtSecret: string;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.jwtSecret = process.env.JWT_SECRET || "super-secret";
  }

  async register(input: RegisterInput) {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User with this email already exists",
      });
    }

    const user = await this.userRepository.create(input);

    const userData = {
      email: user.email,
      name: user.name,
    };

    return {
      user: userData,
      token: this.generateToken(user.id),
    };
  }

  async login(input: LoginInput) {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Invalid credentials!!",
      });
    }

    const validPassword = await this.userRepository.validatePassword(
      user.passwordHash,
      input.password
    );

    if (!validPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials!!",
      });
    }

    const userData = {
      email: user.email,
      name: user.name,
    };

    return {
      user: userData,
      token: this.generateToken(user.id),
    };
  }

  generateToken(userId: string) {
    return jwt.sign({ userId }, this.jwtSecret, {
      expiresIn: "7d",
    });
  }

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { userId: string };
      return decoded.userId;
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
