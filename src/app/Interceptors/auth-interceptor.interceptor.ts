import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from '../State-manager/state/auth-state';
import { InterseptorsConstants } from '../app-constants';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private store:Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${InterseptorsConstants.Bearer} ${this.store.selectSnapshot(AuthState.getToken)}`
      }
    });
    return next.handle(request);
  }
}
