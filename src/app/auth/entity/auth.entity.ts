import { PickType } from '@nestjs/swagger';
import { User } from 'src/app/users/entities/user.entity';

export class Auth extends PickType(User, ['email', 'phone', 'password']) {}
