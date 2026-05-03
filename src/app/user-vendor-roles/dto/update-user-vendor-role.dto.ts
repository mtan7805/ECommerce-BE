import { PartialType } from '@nestjs/swagger';
import { CreateUserVendorRoleDto } from './create-user-vendor-role.dto';

export class UpdateUserVendorRoleDto extends PartialType(
  CreateUserVendorRoleDto,
) {}
