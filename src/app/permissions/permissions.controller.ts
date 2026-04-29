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
import { PermissionsService } from './permissions.service';
import { IDDto } from 'src/common/dto/param.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { GetPermissionsPaginationDto } from './dto/get-permission.dto';
import { GetOptionsParams } from 'src/common/query/options.interface';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  // @Post

  @Patch(':id')
  updatePermission(
    @Param() { id }: IDDto,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.updatePermission({
      data: updatePermissionDto,
      where: { id },
    });
  }

  @Get()
  getPermissions(@Query() query: GetPermissionsPaginationDto) {
    return this.permissionsService.getPermissions(query);
  }

  @Get('options')
  getPermissionOptions(@Query() query: GetOptionsParams) {
    return this.permissionsService.getOptions(query);
  }

  @Delete(':id')
  deletePermission(@Param() { id }: IDDto) {
    return this.permissionsService.deletePermission({ id });
  }
}
