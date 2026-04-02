import { User } from '@prisma/client';
import { ExportExcelDto } from 'src/common/dto/param.dto';

class ExportUserDto extends ExportExcelDto {}

class IsExistPermissionKeyDto {
  userID: User['id'];
  permissionKey: string;
}

export { ExportUserDto, IsExistPermissionKeyDto };
