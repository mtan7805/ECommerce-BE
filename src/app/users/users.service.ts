import { Injectable } from '@nestjs/common';
import { PrismaBaseService } from 'src/common/services/prisma-base.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { isEmpty } from 'es-toolkit/compat';
import { GetUsersPaginationDto } from './dto/get-user.dto';
import { PaginationUtilService } from 'src/common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from 'src/common/query-util/query-util.service';

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
}
