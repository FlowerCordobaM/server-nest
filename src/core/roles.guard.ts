/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRolMeta = this.reflector.get<string[]>(
      'rol', 
      context.getHandler(),
    );

    // console.log('Required roles:', getRolMeta);

    const req = context.switchToHttp().getRequest();
    const user = req.user; 
    // Cambio aquí    console.log('User in request:', user);

    // Verifica si el usuario está autenticado y tiene la propiedad 'roles'
    if (!user || !user.roles) {
      // console.log('user or roles undefined');
      return false;
    }

    // console.log('user === role', user.roles);

    // Verifica si alguno de los roles del usuario está en los roles permitidos
    const isAllow = user.roles.some((rol: string) => getRolMeta?.includes(rol));
    // console.log('Has required role:', isAllow);

    return isAllow;
  }
}
