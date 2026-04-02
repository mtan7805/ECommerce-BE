import { createZodDto } from 'nestjs-zod';
import { UserSchema } from 'src/generated/zod';

const SignInSchema = UserSchema.pick({
  email: true,
  password: true,
});

const SignUpSchema = SignInSchema.merge(
  UserSchema.pick({ firstName: true, fullAddress: true }),
);

class SignInDto extends createZodDto(SignInSchema) {}

class SignUpDto extends createZodDto(SignUpSchema) {}

export { SignInDto, SignUpDto };
