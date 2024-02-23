import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _token = localStorage.getItem('x-authorization-token')
  let jwtToken = req.clone({
    setHeaders: {
      Authorization: 'bearer ' + _token
    }
  });
  console.log(_token)
  return next(jwtToken);
  // console.log('intercept')
  // return next(req);
};
