import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthUtilService } from 'src/app/services/authentication/auth-util.service';
import { isNullOrUndefined } from 'src/app/shared/nullorundefined.util';


@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authUtil: AuthUtilService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!isNullOrUndefined(this.authUtil.currentTokenValue)) {
            return true;
        }
        this.router.navigate(['/auth/login'], {
            queryParams: {
              return: state.url
            }
          });
       
        return false;
    }

}
