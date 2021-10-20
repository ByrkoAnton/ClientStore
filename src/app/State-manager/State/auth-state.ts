import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TokenModel } from '../../Models/account/token-model';
import { ForgotPassword, RestoreTokens as RestoreTokens, SignIn, SignOut, SignUp, UpdateTokens } from '../action/auth-action';



@State<TokenModel>({
  name: 'auth',
  defaults: {
    accessToken:null,
    refreshToken:null
  }
})

@State({
  name: 'register'
})

@State({
  name: 'gettokens'
})

@State({
  name: 'signout'
})

@Injectable()
export class AuthState {
  constructor(private authService: AuthenticationService, private router: Router, private alertService: AlertService) { }

  @Selector()
  static getToken(state: TokenModel): string | null {
    return state.accessToken;
  }

  @Selector()
  static isAuthenticated(state: TokenModel): boolean {
    return !!state.accessToken;
  }

  @Action(SignIn)
  logIn(context: StateContext<TokenModel>, action: SignIn) {
    return this.authService.signIn(action.payload).pipe(
      tap((result: TokenModel) => {
        context.patchState({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        });
        localStorage.setItem('accessToken', String (result.accessToken));
        localStorage.setItem('refreshToken', String (result.refreshToken));
        this.router.navigateByUrl('store');
      }),
      catchError(async error => 
        this.alertService.showErrorMessage(error.error))
       )
  }

  @Action(SignUp)
  signUp(context: null, action: SignUp) {
    return this.authService.signUp(action.payload).pipe(
      tap(() => {
        this.alertService.showSuccesMessage("Successful registration", "Check your email and confirm it")
      }),
      catchError(async error => 
        this.alertService.showErrorMessage(error.error))
       )
  }

  @Action(ForgotPassword)
  forgotPassword(context: null, action: ForgotPassword) {
    return this.authService.forgotPassword(action.payload).pipe(
      tap(() => {
        this.alertService.showSuccesMessage("New password has been sent to email", "")
      }),
      catchError(async error => 
        this.alertService.showErrorMessage(error.error))
       )
  }

  @Action(RestoreTokens)
  restoreTokens(context: StateContext<TokenModel>, action: RestoreTokens) {
    context.patchState({
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken
    });
  }

  @Action(UpdateTokens)
  updateTokens(context: StateContext<TokenModel>, action: UpdateTokens) {
    return this.authService.updateTokens(action.payload).pipe(
      tap((result: TokenModel) => {
        context.patchState({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        });
        localStorage.setItem('accessToken', String (result.accessToken));
        localStorage.setItem('refreshToken', String (result.refreshToken));
      }),
      catchError(async error => 
        this.alertService.showErrorMessage(error.error))
       )
  }
  
  @Action(SignOut)
  SignOut(context: StateContext<TokenModel>, action: SignOut) {
        context.setState({
          refreshToken: null,
          accessToken: null,
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
  }
}


