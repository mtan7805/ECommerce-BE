import { User } from '@prisma/client';
import { ExportExcelDto } from 'src/common/dto/param.dto';
import { Pagination } from 'src/common/utils/pagination-util/pagination-util.interface';

class ExportUserDto extends ExportExcelDto {}

class IsExistPermissionKeyDto {
  userID: User['id'];
  permissionKey: string;
}

class GetUsersPaginationDto extends Pagination {}

export { ExportUserDto, IsExistPermissionKeyDto, GetUsersPaginationDto };
