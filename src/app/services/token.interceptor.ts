import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // debugger;
  console.log("intercept")
  // const _token = localStorage.getItem('x-authorization-token')
  // let jwtToken = req.clone({
  //   setHeaders: {
  //     Authorization: 'bearer ' + _token
  //   }
  // });
  // console.log("intercept")
  return next(req);
};
