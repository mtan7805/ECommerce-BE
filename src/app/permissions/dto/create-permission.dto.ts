import { createZodDto } from 'nestjs-zod';
import { PermissionCreateInputSchema } from 'src/generated/zod';

class CreatePermissionDto extends createZodDto(PermissionCreateInputSchema) {}

export { CreatePermissionDto };
