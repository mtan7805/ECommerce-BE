import { Controller, Body, Post, Get, Delete, Param } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { User } from '../../common/decorators/user.decorator';
import type { UserInfo } from 'src/common/decorators/user.decorator';

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}

  @Get()
  getRolePermissions() {
    return this.rolePermissionsService.getRolePermissions();
  }

  @Post()
  createRolePermission(
    @Body() createDto: CreateRolePermissionDto,
    @User() user: UserInfo,
  ) {
    return this.rolePermissionsService.createRolePermission({
      ...createDto,
      user,
    });
  }

  @Delete(':roleID/:permissionID')
  deleteRolePermission(
    @Param('roleID') roleID: string,
    @Param('permissionID') permissionID: string,
  ) {
    return this.rolePermissionsService.deleteRolePermission(
      roleID,
      permissionID,
    );
  }
}
