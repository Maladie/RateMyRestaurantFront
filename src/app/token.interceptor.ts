import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' || request.method === 'POST') {
      const token = document.cookie.split('=')[1];
      console.log('|Interceptor| exctracted value: ' + token);
      console.log('|Interceptor| Retreaving cookie: ' + document.cookie);
      if (token !== undefined && token !== null) {
        request = request.clone({
          setHeaders: {
            'X-XSRF-Token': token
          }
        });
        return next.handle(request);
      }
    }
    return next.handle(request);
  }
}
