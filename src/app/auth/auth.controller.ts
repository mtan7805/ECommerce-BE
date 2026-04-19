import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignInResponseDto, SignUpDto } from './dto/signin.dto';
import { SkipAuth } from './auth.decorator';
import { ZodResponse } from 'nestjs-zod';
import type { Response } from 'express';
import ms from 'ms';
import {
  COOKIE_CONFIG_DEFAULT,
  CookiesToken,
} from 'src/common/decorators/cookie/cookie.const';
import { TokenKeys } from './consts/jwt.const';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @SkipAuth()
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @SkipAuth()
  @ZodResponse({ type: SignInResponseDto })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signIn(signInDto);

    res.cookie(TokenKeys.ACCESS_TOKEN_KEY, data.accessToken, {
      ...COOKIE_CONFIG_DEFAULT,
      maxAge: ms(CookiesToken.ACCESS_TOKEN_EXPIRE_IN),
    });
    res.cookie(TokenKeys.REFRESH_TOKEN_KEY, data.refreshToken, {
      ...COOKIE_CONFIG_DEFAULT,
      maxAge: ms(CookiesToken.REFRESH_TOKEN_EXPIRE_IN),
    });
    return data;
  }
}
