import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole = next.data['expectedRole'];
    const tokenKeys = [
      'x-authorization-m-token',
      'x-authorization-c-token',
      'x-authorization-e-token',
    ];
    let decodedToken: any;

    for (const key of tokenKeys) {
      const token = this.localStorageService.getData(key);
      if (token) {
        decodedToken = this.localStorageService.getDecodedAccessToken(token);
        break;
      }
    }

    if (!decodedToken || decodedToken.role !== expectedRole) {
      const redirectPaths = {
        'x-authorization-m-token': '/login',
        'x-authorization-c-token': '/client/login',
        'x-authorization-e-token': '/employe/login',
      };
      const redirectTo =
        Object.values(redirectPaths).find((path) => path !== '/login') ||
        '/login';
      this.router.navigate([redirectTo]);
      return false;
    }

    return true;
  }
}
