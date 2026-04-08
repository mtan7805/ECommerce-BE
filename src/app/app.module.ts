import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '../logger/logger.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggingInterceptor } from '../logger/logging.interceptor';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { RolesModule } from './roles/roles.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { ParseParamsPaginationPipe } from 'src/common/pipes/parse-params-pagination.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // validate: validate,
    }),
    LoggerModule,
    AuthModule,
    UsersModule,
    PrismaModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ParseParamsPaginationPipe,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UsersService,
  ],
})
export class AppModule {}
