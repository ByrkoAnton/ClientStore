import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ForgotPasswordModel } from 'src/app/Models/account/forgot-password-model';
import { SignInModel } from 'src/app/Models/account/sign-in-model';
import { SignUpModel } from 'src/app/Models/account/sign-up-model';
import { TokenModel } from 'src/app/Models/account/token-model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  tokenModel: TokenModel = {} as TokenModel;

  signIn(model:SignInModel): Observable<TokenModel> {
    return this.http.post<TokenModel>('https://localhost:5001/api/Account/signIn', model); 
  } 

  signUp(model: SignUpModel) {
    return this.http.post('https://localhost:5001/api/Account/signUp', model);
    }

  forgotPassword(model:ForgotPasswordModel){
    return this.http.post('https://localhost:5001/api/User/ForgotPassword', model); 
    } 

    updateTokens(model:TokenModel): Observable<TokenModel> {
      return this.http.post<TokenModel>('https://localhost:5001/api/Account/updateTokens', model); 
    } 

    
}
