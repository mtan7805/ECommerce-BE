import { Injectable } from '@nestjs/common';
import { PrismaBaseService } from 'src/common/services/prisma-base.service';
import { Vendor } from './entities/vendor.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PaginationUtilService } from 'src/common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from 'src/common/utils/query-util/query-util.service';
import { Prisma } from '@prisma/client';
import { GetVendorPaginationDto } from './dto/get-vendor.dto';
import { skip } from 'node:test';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { GetOptionsParams } from 'src/common/query/options.interface';
import { take } from 'rxjs';

@Injectable()
export class VendorsService extends PrismaBaseService<'vendor'> {
  private vendorEntityName = Vendor.name;

  constructor(
    public prismaService: PrismaService,
    private paginationUtilService: PaginationUtilService,
    private queryUtilService: QueryUtilService,
  ) {
    super(prismaService, 'vendor');
  }

  get client() {
    return super.client;
  }

  get extended() {
    return super.extended;
  }

  async getVendor(where: Prisma.VendorWhereUniqueInput) {
    const data = await this.extended.findUnique({
      where,
    });
    return data;
  }

  async getVendors({
    page,
    itemPerPage,
    select,
    ...search
  }: GetVendorPaginationDto) {
    const totalItems = await this.extended.count();
    const paging = this.paginationUtilService.paging({
      page,
      itemPerPage,
      totalItems,
    });
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<Vendor>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Vendor>({
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

  async createVendor(createVendorDto: CreateVendorDto) {
    const data = await this.extended.create({
      data: createVendorDto,
    });
    return data;
  }

  async updateVendor(params: {
    where: Prisma.VendorWhereUniqueInput;
    data: UpdateVendorDto;
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
    const fieldsSelect =
      this.queryUtilService.convertFieldsSelectOption<Vendor>(select);
    const searchQuery = this.queryUtilService.buildSearchQuery<Vendor>({
      search,
    });
    const data = await this.extended.findMany({
      select: fieldsSelect,
      take: limit,
      where: searchQuery,
    });
    return data;
  }

  async deleteVendor(where: Prisma.VendorWhereUniqueInput) {
    const data = await this.extended.softDelete(where);
    return data;
  }
}
