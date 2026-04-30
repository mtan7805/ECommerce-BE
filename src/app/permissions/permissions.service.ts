import { BadRequestException, Injectable } from '@nestjs/common';
import { GetOptionsParams, Options } from 'src/common/query/options.interface';
import { PrismaBaseService } from 'src/common/services/prisma-base.service';
import { Permission } from './entities/permission.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaginationUtilService } from 'src/common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from 'src/common/utils/query-util/query-util.service';
import { Prisma } from '@prisma/client';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { GetPermissionsPaginationDto } from './dto/get-permission.dto';
import { Actions } from 'src/common/guards/access-control/access-control.const';
import { WithUser } from 'src/common/decorators/user.decorator';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionsService
  extends PrismaBaseService<'permission'>
  implements Options
{
  private permissionEntityName = Permission.name;

  constructor(
    public prismaService: PrismaService,
    private paginationUtilService: PaginationUtilService,
    private queryUtilService: QueryUtilService,
  ) {
    super(prismaService, 'permission');
  }

  get client() {
    return super.client;
  }

  get extended() {
    return super.extended;
  }

  async getPermission(where: Prisma.PermissionWhereUniqueInput) {
    const data = await this.extended.findUnique({
      where,
    });
    return data;
  }

  async getPermissions({
    page,
    itemPerPage,
    select,
    ...search
  }: GetPermissionsPaginationDto) {
    const totalItems = await this.extended.count();
    const paging = this.paginationUtilService.paging({
      page,
      itemPerPage,
      totalItems,
    });
    const fieldSelect =
      this.queryUtilService.convertFieldsSelectOption<Permission>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Permission>({
      search,
    });
    const list = await this.extended.findMany({
      select: fieldSelect,
      skip: paging.skip,
      take: paging.itemPerPage,
      where: searchQuery,
    });
    const data = paging.format(list);
    return data;
  }

  private isKeyValid(key: string) {
    const actions = Object.values(Actions).join('|');
    const regex = new RegExp(
      `^\\[\\/[a-zA-Z0-9\\/\\-]+\\]_\\[(${actions})\\]$`,
    );
    return regex.test(key);
  }

  async createPermission(createPermissionDto: WithUser<CreatePermissionDto>) {
    const isKeyValid = this.isKeyValid(createPermissionDto.key);
    if (!isKeyValid) {
      const actions = Object.values(Actions).join(', ');
      throw new BadRequestException(
        `Permission key ${createPermissionDto.key} is not valid. It must follow the pattern [/resource]_[action] where action is one of the following: ${actions}.`,
      );
    }
    const data = await this.extended.create({
      data: createPermissionDto,
    });
    return data;
  }

  async updatePermission(params: {
    where: Prisma.PermissionWhereUniqueInput;
    data: UpdatePermissionDto;
  }) {
    const { where, data: dataUpdate } = params;
    const data = await this.extended.update({
      data: dataUpdate,
      where,
    });
    return data;
  }

  async getOptions(params: GetOptionsParams) {
    const { limit, select, ...search } = params;
    const fieldSelect =
      this.queryUtilService.convertFieldsSelectOption<Permission>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Permission>({
      search,
    });
    const data = await this.extended.findMany({
      select: fieldSelect,
      take: limit,
      where: searchQuery,
    });
    return data;
  }

  async deletePermission(where: Prisma.PermissionWhereUniqueInput) {
    const data = await this.extended.softDelete(where);
    return data;
  }
}
