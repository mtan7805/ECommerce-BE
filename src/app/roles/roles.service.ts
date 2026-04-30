import { Injectable } from '@nestjs/common';
import { PrismaBaseService } from 'src/common/services/prisma-base.service';
import {
  GetOptionsParams,
  Options,
} from '../../common/query/options.interface';
import { Role } from './entities/role.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

import { WithUser } from 'src/common/decorators/user.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRolesPaginationDto } from './dto/get-role.dto';
import { PaginationUtilService } from 'src/common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from 'src/common/utils/query-util/query-util.service';

@Injectable()
export class RolesService extends PrismaBaseService<'role'> implements Options {
  private roleEntityName = Role.name;
  constructor(
    public prismaService: PrismaService,
    private paginationUtilService: PaginationUtilService,
    private queryUtilService: QueryUtilService,
  ) {
    super(prismaService, 'role');
  }

  get client() {
    return super.client;
  }

  get extended() {
    return super.extended;
  }

  async createRole(createRoleDto: WithUser<CreateRoleDto>) {
    const { user, ...rest } = createRoleDto;
    const data = await this.extended.create({
      data: {
        ...rest,
        createdBy: user?.userID,
      },
    });
    return data;
  }

  async getRole(where: Prisma.RoleWhereUniqueInput) {
    const data = await this.extended.findUnique({
      where,
    });
    return data;
  }

  async getRoles({
    page,
    itemPerPage,
    select,
    ...search
  }: GetRolesPaginationDto) {
    const totalItems = await this.extended.count();
    const paging = this.paginationUtilService.paging({
      page,
      itemPerPage,
      totalItems,
    });
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<Role>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Role>({
      search,
    });
    const list = await this.extended.findMany({
      select: fieldsSelect,
      skip: paging.skip,
      take: paging.itemPerPage,
      where: searchQuery,
    });

    const data = paging.format(list);
    return data;
  }

  async updateRole(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: UpdateRoleDto;
  }) {
    const { where, data: dataUpdate } = params;
    const data = await this.extended.update({ data: dataUpdate, where });
    return data;
  }

  async deleteRole(where: Prisma.RoleWhereUniqueInput) {
    const data = this.extended.softDelete(where);
    return data;
  }

  async getOptions(params: GetOptionsParams) {
    const { limit, select, ...search } = params;
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<Role>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Role>({
      search,
    });
    const data = await this.extended.findMany({
      select: fieldsSelect,
      take: limit,
      where: searchQuery,
    });
    return data;
  }
}
