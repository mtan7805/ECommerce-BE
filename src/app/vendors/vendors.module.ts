import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { PaginationUtilService } from 'src/common/utils/pagination-util/pagination-util.service';
import { QueryUtilService } from 'src/common/utils/query-util/query-util.service';

@Module({
  controllers: [VendorsController],
  providers: [VendorsService, PaginationUtilService, QueryUtilService],
  exports: [VendorsService],
})
export class VendorsModule {}
