import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { User, type UserInfo } from 'src/common/decorators/user.decorator';
import { IDDto } from 'src/common/dto/param.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { GetVendorPaginationDto } from './dto/get-vendor.dto';
import { GetOptionsParams } from 'src/common/query/options.interface';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorService: VendorsService) {}

  @Post()
  createVendor(@Body() createDto: CreateVendorDto, @User() user: UserInfo) {
    createDto['user'] = user;
    return this.vendorService.createVendor({ ...createDto });
  }

  @Patch(':id')
  updatevendor(
    @Param() { id }: IDDto,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return this.vendorService.updateVendor({
      data: updateVendorDto,
      where: { id },
    });
  }

  @Get()
  getVendors(@Query() query: GetVendorPaginationDto) {
    return this.vendorService.getVendors(query);
  }

  @Get(':id')
  getVendor(@Param() { id }: IDDto) {
    return this.vendorService.getVendor({ id });
  }

  @Get()
  getVendorOptions(@Query() query: GetOptionsParams) {
    return this.vendorService.getOptions(query);
  }

  @Delete(':id')
  deleteVendor(@Param() { id }: IDDto) {
    return this.vendorService.deleteVendor({ id });
  }
}
