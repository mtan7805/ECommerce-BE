import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../common/decorators/user.decorator';
import { IDDto } from '../../common/dto/param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // @Post('export')
  // @UseInterceptors(ExcelResponseInterceptor)
  // async exportUsers(
  //   @Body() exportUsersDto: ExportUsersDto,
  //   @Res() res: Response,
  // ) {
  //   const workbook = await this.usersService.exportUsers(exportUsersDto);
  //   await workbook.xlsx.write(res);
  //   res.end();
  //   return { message: 'Export success' };
  // }

  // @Post('import')
  // @ImportExcel()
  // importUsers(@UploadedFile() file: File, @User() user: UserInfo) {
  //   return this.usersService.importUsers({ file, user });
  // }

  // @Get()
  // getUsers(@Query() query: GetUsersPaginationDto) {
  //   return this.usersService.getUsers(query);
  // }

  // @Get('options')
  // @UsePipes(ParseParamsOptionPipe)
  // getUserOptions(@Query() query: GetOptionsParams) {
  //   return this.usersService.getOptions(query);
  // }

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
