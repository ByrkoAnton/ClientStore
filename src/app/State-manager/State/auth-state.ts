import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { RoutingConstants, StateConstants, TechnicalConstants } from 'src/app/app-constants';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TokenModel } from '../../models/account/token-model';
import { ForgotPassword, RestoreTokens as RestoreTokens, SignIn, SignOut, SignUp, UpdateTokens } from '../action/auth-action';



@State<TokenModel>({
  name: StateConstants.Auth,
  defaults: {
    accessToken:null,
    refreshToken:null
  }
})

@State({
  name: StateConstants.AuthNameRegister
})

@State({
  name: StateConstants.AuthNameGetTokens
})

@State({
  name: StateConstants.AuthNameSignOut
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
        localStorage.setItem(TechnicalConstants.AccessToken, String (result.accessToken));
        localStorage.setItem(TechnicalConstants.RefreshToken, String (result.refreshToken));
        this.router.navigateByUrl(RoutingConstants.Store);
      }),
      catchError(async error => 
        this.alertService.showErrorMessage(error.error))
       )
  }

  @Action(SignUp)
  signUp(context: null, action: SignUp) {
    return this.authService.signUp(action.payload).pipe(
      tap(() => {
        this.alertService.showSuccesMessage(StateConstants.AuthSignUpSuccesMsg,
           StateConstants.AuthSignUpConfirmEmailMsg)
      }),
      catchError(async error => 
        this.alertService.showErrorMessage(error.error))
       )
  }

  @Action(ForgotPassword)
  forgotPassword(context: null, action: ForgotPassword) {
    return this.authService.forgotPassword(action.payload).pipe(
      tap(() => {
        this.alertService.showSuccesMessage(StateConstants.AuthSendPasworgMsg)
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
        localStorage.setItem(TechnicalConstants.AccessToken, String (result.accessToken));
        localStorage.setItem(TechnicalConstants.RefreshToken, String (result.refreshToken));
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
        localStorage.removeItem(TechnicalConstants.AccessToken);
        localStorage.removeItem(TechnicalConstants.RefreshToken);
  }
}


