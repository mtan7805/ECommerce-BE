import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import type { UserInfo } from '../../common/decorators/user.decorator';
import { User } from '../../common/decorators/user.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { IDDto } from 'src/common/dto/param.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRolesPaginationDto } from './dto/get-role.dto';
import { GetOptionsParams } from 'src/common/query/options.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() createDto: CreateRoleDto, @User() user: UserInfo) {
    return this.rolesService.createRole({ ...createDto, user });
  }

  @Get(':id')
  getRole(@Param() { id }: IDDto) {
    return this.rolesService.getRole({ id });
  }

  @Get()
  getRoles(@Query() query: GetRolesPaginationDto) {
    return this.rolesService.getRoles(query);
  }

  @Get('options')
  getRoleOptions(@Query() query: GetOptionsParams) {
    return this.rolesService.getOptions(query);
  }

  @Patch(':id')
  updateRole(@Param() { id }: IDDto, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole({
      data: updateRoleDto,
      where: { id },
    });
  }

  @Delete(':id')
  deleteRole(@Param() { id }: IDDto) {
    return this.rolesService.deleteRole({ id });
  }
}
