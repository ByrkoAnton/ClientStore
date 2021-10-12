import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SignOut, UpdateTokens } from 'src/app/State-manager/action/auth-action';
import { AuthState } from 'src/app/State-manager/state/auth-state';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private router: Router, public store: Store) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: any) => {
      if (this.isRefreshing || error.status === 403){
        this.router.navigateByUrl('signin');
        return this.store.dispatch(new SignOut());
      }
      if (error.status === 401) {
          this.isRefreshing = true;
          return this.store.dispatch(new UpdateTokens({
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: localStorage.getItem('refreshToken'),
          })).pipe(
            mergeMap((token : any) =>{
                request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token.auth.accessToken}`
                }});
              return next.handle(request)
            })
          ); 
      }
      return throwError(error)
    }))
  }
}
////////////////////////////////////////////////////////////////////////////////
//   constructor(private router: Router, public store: Store) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     const token = localStorage.getItem('refreshToken');
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//         }
//       });
//     }

//     return next.handle(request).pipe(tap(() => { },
//       (err: any) => {
//         if (err instanceof HttpErrorResponse) {
//           if (err.status == 401) {
//             this.store.dispatch(new UpdateTokens({
//               accessToken: localStorage.getItem('accessToken'),
//               refreshToken: localStorage.getItem('refreshToken'),
//             }));
//           }
//           return;
//         }
//       }));
//   }
// }
///////////////////////////////////////////////////////////////////////////////////
//   refreshTokenInProgress = false;
//   tokenRefreshedSource = new Subject();
//   tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

//   constructor(private injector: Injector, private router: Router, public store:Store) {}

//   refreshToken(): Observable<any> {
//     this.store.dispatch(new UpdateTokens({
//                 accessToken: localStorage.getItem('accessToken'),
//                 refreshToken: localStorage.getItem('refreshToken'),
//               }));
//     if (this.refreshTokenInProgress) {
//         return new Observable(observer => {
//             this.tokenRefreshed$.subscribe(() => {
//                 observer.next();
//                 observer.complete();
//             });
//         });
//     } else {
//         this.refreshTokenInProgress = true;

//         return this.refreshToken().pipe(
//             tap(() => {
//                 this.refreshTokenInProgress = false;
//                 this.tokenRefreshedSource.next();
//             })  
//             );
//     }   
// }

// handleResponseError(error:any, request?:any, next?:any):any {
//    if (error.status === 401) {
//       return this.refreshToken().pipe(
//           switchMap(() => {
//               request = request.clone({
//                             setHeaders: {
//                               //Authorization: `Bearer ${this.store.selectSnapshot(AuthState.getToken)}`
//                               Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//                             }
//                           });
//               return next.handle(request);
//           }),
//           catchError(e => {
//               if (e.status !== 401) {
//                   return this.handleResponseError(e);            
//           };
//   }

//           ))}}


//           intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {


//             request = request.clone({
//               setHeaders: {
//                 //Authorization: `Bearer ${this.store.selectSnapshot(AuthState.getToken)}`
//                 Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//               }
//             });

//             // Handle response
//             return next.handle(request).pipe(catchError(error => {
//                 return this.handleResponseError(error, request, next);
//             }));
//         }
//     }

/////////////////////////////////////////////////////////////////////////////////////////////////////
  // constructor(private alertService: AlertService, public router: Router, public store:Store) {}



  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   var d = request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${this.store.selectSnapshot(AuthState.getToken)}`
  //     }
  //   });
  //   const clonRequest = request.clone();
  //   return next.handle(request).pipe(
  //     catchError((error) => {
  //       if(error instanceof HttpErrorResponse && error.status  === 401)
  //       {
  //           this.store.dispatch(new UpdateTokens({
  //           accessToken: localStorage.getItem('accessToken'),
  //           refreshToken: localStorage.getItem('refreshToken'),
  //         }));
  //         mergeMap(()=>{
  //           request.clone({
  //             setHeaders: {
  //               //Authorization: `Bearer ${this.store.selectSnapshot(AuthState.getToken)}`
  //               Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  //             }
  //           });
  //           return next.handle(request)
  //         })           
  //       }
  //       return next.handle(request)
  //     })
  //   )
  // }
