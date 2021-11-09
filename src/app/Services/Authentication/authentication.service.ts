import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceConstants } from 'src/app/app-constants';
import { ForgotPasswordModel } from 'src/app/models/account/forgot-password-model';
import { SignInModel } from 'src/app/models/account/sign-in-model';
import { SignUpModel } from 'src/app/models/account/sign-up-model';
import { TokenModel } from 'src/app/models/account/token-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  tokenModel: TokenModel = {} as TokenModel;

  signIn(model:SignInModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(AuthServiceConstants.SignInControlerRoute, model); 
  } 

  signUp(model: SignUpModel) {
    return this.http.post(AuthServiceConstants.SignUpControlerRoute, model);
    }

  forgotPassword(model:ForgotPasswordModel){
    return this.http.post(AuthServiceConstants.ForgotPasswordControlerRoute, model); 
    } 

    updateTokens(model:TokenModel): Observable<TokenModel> {
      return this.http.post<TokenModel>(AuthServiceConstants.UpdateTokensControlerRoute, model); 
    } 

    
}
