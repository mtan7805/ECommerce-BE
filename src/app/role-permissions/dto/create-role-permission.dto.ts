import { createZodDto } from 'nestjs-zod';
import { RolePermissionUncheckedCreateInputSchema } from 'src/generated/zod';

class CreateRolePermissionDto extends createZodDto(
  RolePermissionUncheckedCreateInputSchema,
) {}

export { CreateRolePermissionDto };
