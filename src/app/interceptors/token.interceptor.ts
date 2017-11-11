import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' || request.method === 'POST') {
      const token = this._auth.getToken();
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
