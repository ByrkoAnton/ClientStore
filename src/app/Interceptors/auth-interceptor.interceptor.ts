import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TokenModel } from '../Models/Account/token-model';
import { AuthState } from '../State-manager/State/auth-state';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private store:Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.store.selectSnapshot(AuthState.getToken)}`
      }
    });
    return next.handle(request);
  }
}
