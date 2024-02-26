import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate{

//   constructor(private router: Router) {}

//   canActivate(): Observable<boolean | UrlTree> {
//     console.log('here')
//     const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
//     if (!token) {
//       return of(this.router.parseUrl('/login'));
//     }
//     return of(true);
//   }
// }

export const canActivate = (): boolean => {
  const route = inject(Router)
    const token = localStorage.getItem('x-authorization-m-token');
    if (!token) {
      // return of(route.parseUrl('/login'));
      route.navigate(['/login']);
      return false;
    }
    return true;
};
