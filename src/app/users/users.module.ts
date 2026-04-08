import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PaginationUtilService } from 'src/common/utils/pagination-util/pagination-util.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PaginationUtilService],
  exports: [UsersService],
})
export class UsersModule {}
