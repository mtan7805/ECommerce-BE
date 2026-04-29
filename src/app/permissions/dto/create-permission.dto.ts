import { createZodDto } from 'nestjs-zod';
import { PermissionCreateInputSchema } from 'src/generated/zod';

class createPermissionDto extends createZodDto(PermissionCreateInputSchema) {}

export { createPermissionDto };
