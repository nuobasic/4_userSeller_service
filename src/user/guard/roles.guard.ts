import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entity/User';
import { UserRole } from '../entity/UserRole';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return roles.some((role) => user.roles?.includes(role));
  }
}

@Injectable()
export class SellerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const user = request;

    return this.isRole(user);
  }

  isRole(user: User): boolean {
    return user && user.role === UserRole.SELLER;
  }
}
