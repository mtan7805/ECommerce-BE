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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../common/decorators/user.decorator';
import { IDDto } from '../../common/dto/param.dto';
import { GetUsersPaginationDto } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  getUser(@Param() { id }: IDDto, @User() user) {
    return this.usersService.getUser({ id });
  }

  @Patch(':id')
  updateUser(@Param() { id }: IDDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({
      data: updateUserDto,
      where: { id },
    });
  }

  @Delete(':id')
  deleteUser(@Param() { id }: IDDto) {
    return this.usersService.deleteUser({ id });
  }
}
