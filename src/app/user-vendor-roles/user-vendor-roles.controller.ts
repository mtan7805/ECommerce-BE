import { Controller, Get } from '@nestjs/common';
import { UserVendorRolesService } from './user-vendor-roles.service';

@Controller('user-vendor-roles')
export class UserVendorRolesController {
  constructor(
    private readonly userVendorRolesService: UserVendorRolesService,
  ) {}

  @Get()
  getUserVendorRoles() {
    return this.userVendorRolesService.getUserVendorRoles();
  }
}
