import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SignOut, UpdateTokens } from 'src/app/state-manager/action/auth-action';
import { InterseptorsConstants, RoutingConstants } from 'src/app/app-constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private router: Router, public store: Store) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: any) => {
      if (this.isRefreshing || error.status === InterseptorsConstants.Error403){
        this.router.navigateByUrl(RoutingConstants.SignIn);
        return this.store.dispatch(new SignOut());
      }
      if (error.status === InterseptorsConstants.Error401) {
          this.isRefreshing = true;
          return this.store.dispatch(new UpdateTokens({
            accessToken: localStorage.getItem(InterseptorsConstants.AccessToken),
            refreshToken: localStorage.getItem(InterseptorsConstants.RefreshToken),
          })).pipe(
            mergeMap((token : any) =>{
                request = request.clone({
                setHeaders: {
                  Authorization: `${InterseptorsConstants.Bearer} ${token.auth.accessToken}`
                }});
              return next.handle(request)
            })
          ); 
      }
      return throwError(error)
    }))
  }
}

