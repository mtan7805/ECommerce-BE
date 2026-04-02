import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto, SignUpDto } from './dto/signin.dto';
import { StringUtilService } from 'src/common/utils/string-util/string-util.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { JWTToken, TokenKeys } from './consts/jwt.const';
import { UserInfo } from 'src/common/decorators/user.decorator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private stringUtilService: StringUtilService,
    private jwtService: JwtService,
  ) {}

  async createToken<T extends Record<string, any>>(payload: T) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: JWTToken.ACCESS_TOKEN_EXPIRE_IN,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: JWTToken.REFRESH_TOKEN_EXPIRE_IN,
    });
    return {
      [TokenKeys.ACCESS_TOKEN_KEY]: accessToken,
      [TokenKeys.REFRESH_TOKEN_KEY]: refreshToken,
    };
  }

  async verifyToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException(error);
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password, ...otherInfor } = signUpDto;
    const user = await this.usersService.getUser({ email });
    if (user) throw new BadRequestException('User already exist');

    const passwordHashed = await this.stringUtilService.hash(password);
    const userCreated = await this.usersService.createUser({
      email,
      password: passwordHashed,
      ...otherInfor,
    });
    const { password: passwordCreated, ...userResponse } = userCreated;
    return userResponse;
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.getUser({ email });
    const passwordHashed = user?.password;
    if (!passwordHashed) throw new UnauthorizedException();
    const isMath = await this.stringUtilService.compare(
      password,
      passwordHashed,
    );
    if (!isMath) throw new UnauthorizedException();
    const { id: userID, email: userEmail } = user;
    return await this.createToken({ userID, userEmail });
  }

  async refreshToken(refreshToken: string) {
    const decoded = await this.verifyToken(refreshToken);
    const { iat, exp, ...user } = decoded;
    return this.createToken(user as UserInfo);
  }
}
