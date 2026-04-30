import { Injectable } from '@nestjs/common';

import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { WithUser } from '../../common/decorators/user.decorator';
import { PrismaBaseService } from '../../common/services/prisma-base.service';
import { RolePermission } from './entities/role-permission.entity';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class RolePermissionsService extends PrismaBaseService<'rolePermission'> {
  private rolePermissionEntityName = RolePermission.name;
  private excelSheets = {
    [this.rolePermissionEntityName]: this.rolePermissionEntityName,
  };
  constructor(public prismaService: PrismaService) {
    super(prismaService, 'rolePermission');
  }

  get client() {
    return super.client;
  }

  get extended() {
    return super.extended;
  }

  async createRolePermission(createDto: WithUser<CreateRolePermissionDto>) {
    const { user, ...dataCreate } = createDto;
    return await this.client.create({
      data: dataCreate,
    });
  }

  async deleteRolePermission(roleID: string, permissionID: string) {
    return await this.client.delete({
      where: {
        roleID_permissionID: {
          roleID,
          permissionID,
        },
      },
    });
  }

  async getRolePermissions() {
    const data = await this.extended.findMany({
      select: {
        permission: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    return data;
  }
}
