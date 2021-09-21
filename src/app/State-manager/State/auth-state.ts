import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { TokenModel } from '../../Models/account/token-model';
import { ForgotPassword, RestoreTokens as RestoreTokens, SignIn, SignOut, SignUp } from '../action/auth-action';

@State<TokenModel>({
  name: 'auth'
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
  constructor(private authService: AuthenticationService, private router: Router) { }

  @Selector()
  static getToken(state: TokenModel): string | null {
    return state.accessToken;
  }

  @Selector()
  static isAuthenticated(state: TokenModel): boolean {
    return !!state.accessToken;
  }

  @Action(SignIn)
  login(context: StateContext<TokenModel>, action: SignIn) {
    return this.authService.signIn(action.payload).pipe(
      tap((result: TokenModel) => {
        context.patchState({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        });
        localStorage.setItem('accessToken', String (result.accessToken));
        localStorage.setItem('refreshToken', String (result.refreshToken));
        this.router.navigateByUrl('store');
      })
    )
  }

  @Action(SignUp)
  signup(context: null, action: SignUp) {
    return this.authService.signUp(action.payload).pipe(
      tap(() => {
        this.router.navigateByUrl("/registrationsuccess");
      }));
  }

  @Action(ForgotPassword)
  forgotPassword(context: null, action: ForgotPassword) {
    return this.authService.forgotPassword(action.payload).pipe(
      tap(() => {
        this.router.navigateByUrl("/resetpasswordsuccess");
      }));
  }

  @Action(RestoreTokens)
  restoreTokens(context: StateContext<TokenModel>, action: RestoreTokens) {
    context.patchState({
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken
    });
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


