import { Injectable } from '@nestjs/common';
import { PrismaBaseService } from 'src/common/services/prisma-base.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma, VendorStatus } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { isEmpty } from 'es-toolkit/compat';
import {
  GetUsersPaginationDto,
  IsExistPermissionKeyDto,
} from './dto/get-user.dto';
import { PaginationUtilService } from 'src/common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from 'src/common/utils/query-util/query-util.service';
import { Actions } from 'src/common/guards/access-control/access-control.const';

@Injectable()
export class UsersService extends PrismaBaseService<'user'> {
  private userEntityName = User.name;
  private excelSheets = {
    [this.userEntityName]: this.userEntityName,
  };

  constructor(public prismaService: PrismaService) {
    super(prismaService, 'user');
  }

  get extended() {
    return super.extended;
  }

  async getUser(where: Prisma.UserWhereUniqueInput) {
    const data = await this.extended.findUnique({ where });
    return data;
  }

  async createUser(createUserDto: CreateUserDto) {
    const data = await this.extended.create({
      data: createUserDto,
    });
    return data;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }) {
    const { where, data: dataUpdate } = params;
    const data = await this.extended.update({
      data: dataUpdate,
      where,
    });
    return data;
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    const data = await this.extended.delete({
      where,
    });
    // const data = await this.extended.softDelete(where);
    return data;
  }

  async isSupperAdmin(userID: User['id']) {
    const data = await this.extended.findFirst({
      where: {
        id: userID,
        userVendorRoles: {
          some: {
            role: {
              isSystemRole: true,
            },
          },
        },
      },
    });
    return data ? true : false;
  }

  async isExistPermissionKey({
    userID,
    permissionKey,
  }: IsExistPermissionKeyDto) {
    const user = await this.extended.findFirst({
      include: {
        userVendorRoles: {
          select: {
            role: {
              select: {
                rolePermissions: {
                  select: {
                    permission: {
                      select: {
                        key: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id: userID,
        userVendorRoles: {
          some: { status: VendorStatus.active },
        },
      },
    });
    if (!user) return false;

    const [route] = permissionKey.split('_');
    const isExistPermission = user.userVendorRoles?.some((item) =>
      item.role?.rolePermissions?.some(
        (rp) =>
          rp.permission?.key?.includes(permissionKey) ||
          rp.permission?.key?.includes(`${route}_[${Actions.MANAGE}]`),
      ),
    );

    return isExistPermission ? true : false;
  }
}
