import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/entities/user.entity';
import { UsersService } from 'src/app/users/users.service';
import { EnvVars } from 'src/common/envs/validate.env';
import { RequestMethod } from 'src/common/utils/api-util/api-util.const';
import { string } from 'zod';
import { Actions } from './access-control.const';
import { IS_SKIP_AUTH } from 'src/app/auth/auth.decorator';

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  getCurrentRoute(req: Request) {
    const { path, params } = req;
    let basePath = path;
    for (const [key, value] of Object.entries(params)) {
      basePath = basePath.replace(value as string, `:${key}`);
    }
    return basePath.replace(this.configService.get(EnvVars.APP_PREFIX)!, '');
  }

  private async canAccessResources(userID: User['id'], permissionKey: string) {
    const isSuperAdmin = await this.usersService.isSupperAdmin(userID);
    if (isSuperAdmin) return true;

    const canAccess = await this.usersService.isExistPermissionKey({
      userID,
      permissionKey,
    });
    return canAccess;
  }

  getAction(httpMethod: RequestMethod) {
    const actionsCoverter = {
      [RequestMethod.GET]: Actions.READ,
      [RequestMethod.POST]: Actions.CREATE,
      [RequestMethod.PUT]: Actions.UPDATE,
      [RequestMethod.PATCH]: Actions.UPDATE,
      [RequestMethod.DELETE]: Actions.UPDATE,
    };
    const action = actionsCoverter[httpMethod];
    if (!action) throw new BadRequestException('Action not define');
    return action;
  }

  async canActivate(context: ExecutionContext) {
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(IS_SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (IS_SKIP_AUTH) {
      return true;
    }
    return true;

    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const user = req['user'];
    if (!user) return false;

    const route = this.getCurrentRoute(req);
    const action = this.getAction(req.method as unknown as RequestMethod);
    const canAccess = await this.canAccessResources(
      user.userID as string,
      `[${route}]_[${action}]`,
    );
    return canAccess;
  }
}
