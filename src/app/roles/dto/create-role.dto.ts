import { createZodDto } from 'nestjs-zod';
import { RoleCreateInputSchema } from 'src/generated/zod';

class CreateRoleDto extends createZodDto(RoleCreateInputSchema) {}

export { CreateRoleDto };
