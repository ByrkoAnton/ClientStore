import { ForgotPasswordModel } from 'src/app/Models/account/forgot-password-model';
import { SignUpModel } from 'src/app/Models/account/sign-up-model';
import { TokenModel } from 'src/app/Models/account/token-model';
import {SignInModel} from '../../Models/account/sign-in-model'

export class SignIn {
  static readonly type = '[Auth] SignIn';

  constructor(public payload: SignInModel) {}
}

export class ForgotPassword {
  static readonly type = '[Auth] ForgotPassword';

  constructor(public payload: ForgotPasswordModel) {}
}

export class SignUp {
  static readonly type = '[Auth] SignUp';

  constructor(public payload: SignUpModel) {}
}

export class RestoreTokens {
  static readonly type = '[Auth] RestoreTokens';
  constructor(public payload: TokenModel) {}
}

export class SignOut {
  static readonly type = '[Auth] SignOut';
  constructor() {}
}

export class UpdateTokens {
  static readonly type = '[Auth] UpdateTokens';
  constructor(public payload: TokenModel) {}
}