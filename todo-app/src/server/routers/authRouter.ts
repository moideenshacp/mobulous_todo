import { procedure, router } from "../trpc";
import { loginInput, registerInput } from "../schemas/authenticationSchema";

export const authRouter = router({
  register: procedure.input(registerInput).mutation(async ({ input, ctx }) => {
    return ctx.services.auth.register(input);
  }),
  
  login: procedure.input(loginInput).mutation(async ({ input, ctx }) => {
    return ctx.services.auth.login(input);
  }),

  me: procedure.query(async ({ ctx }) => {
    if (!ctx.userId) {
      return null;
    }
    
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    
    return user;
  }),
});