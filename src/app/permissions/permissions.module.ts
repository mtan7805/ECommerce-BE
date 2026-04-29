import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PaginationUtilService } from '../../common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from 'src/common/query-util/query-util.service';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService, PaginationUtilService, QueryUtilService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
