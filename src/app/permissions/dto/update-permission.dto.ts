import { PartialType } from '@nestjs/swagger';
import { createPermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(createPermissionDto) {}
