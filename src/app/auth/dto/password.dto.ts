import { createZodDto } from 'nestjs-zod';
import { UserSchema } from 'src/generated/zod';
import z from 'zod';

const forgotPasswordPrisma = z.object({
  email: UserSchema.shape.email,
  phone: UserSchema.shape.phone,
  redirectTo: z.string().url().optional(),
});

export class ForgotPasswordDto extends createZodDto(forgotPasswordPrisma) {}

const resetPasswordSchema = z.object({
  password: UserSchema.shape.password,
});

export class ResetPasswordDto extends createZodDto(resetPasswordSchema) {}
