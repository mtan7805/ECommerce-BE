import { Module } from '@nestjs/common';
import { UserVendorRolesService } from './user-vendor-roles.service';
import { UserVendorRolesController } from './user-vendor-roles.controller';

@Module({
  imports: [],
  controllers: [UserVendorRolesController],
  providers: [UserVendorRolesService],
})
export class UserVendorRolesModule {}
