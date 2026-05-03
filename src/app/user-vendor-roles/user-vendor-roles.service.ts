import { Injectable } from '@nestjs/common';
import { PrismaBaseService } from '../../common/services/prisma-base.service';
import { UserVendorRole } from './entities/user-vendor-role.entity';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class UserVendorRolesService extends PrismaBaseService<'userVendorRole'> {
  private userVendorRoleEntityName = UserVendorRole.name;

  constructor(public prismaService: PrismaService) {
    super(prismaService, 'userVendorRole');
  }

  get client() {
    return super.client;
  }

  get extended() {
    return super.extended;
  }

  async getUserVendorRoles() {
    const data = await this.extended.findMany({
      select: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        vendor: {
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
