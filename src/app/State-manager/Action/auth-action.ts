import { ForgotPasswordModel } from 'src/app/Models/Account/forgot-password-model';
import { SignUpModel } from 'src/app/Models/Account/sign-up-model';
import { TokenModel } from 'src/app/Models/Account/token-model';
import {SignInModel} from '../../Models/Account/sign-in-model'

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