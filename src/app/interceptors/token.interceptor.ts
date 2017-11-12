import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionToken } from '../shared/session-token';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' || request.method === 'POST') {
      const sessionToken = JSON.parse(sessionStorage.getItem('token')) as SessionToken;
      if (sessionToken !== undefined && sessionToken != null) {
        const token = sessionToken.token;
        if (token !== undefined && token !== null) {
          request = request.clone({
            setHeaders: {
              'X-XSRF-Token': token
            }
          });
          return next.handle(request);
        }
      }
    }
    return next.handle(request);
  }
}
