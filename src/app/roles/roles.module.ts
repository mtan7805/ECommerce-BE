import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PaginationUtilService } from 'src/common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from 'src/common/query-util/query-util.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, PaginationUtilService, QueryUtilService],
  exports: [RolesService],
})
export class RolesModule {}
