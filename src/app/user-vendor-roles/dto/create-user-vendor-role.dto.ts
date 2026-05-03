import { createZodDto } from 'nestjs-zod';
import { UserVendorRoleUncheckedCreateInputSchema } from 'src/generated/zod';

class CreateUserVendorRoleDto extends createZodDto(
  UserVendorRoleUncheckedCreateInputSchema,
) {}

export { CreateUserVendorRoleDto };
