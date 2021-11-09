import { ActionConstants } from 'src/app/app-constants';
import { ForgotPasswordModel } from 'src/app/models/account/forgot-password-model';
import { SignUpModel } from 'src/app/models/account/sign-up-model';
import { TokenModel } from 'src/app/models/account/token-model';
import {SignInModel} from '../../models/account/sign-in-model'

export class SignIn {
  static readonly type = ActionConstants.AuthSignIn;

  constructor(public payload: SignInModel) {}
}

export class ForgotPassword {
  static readonly type = ActionConstants.AuthForgotPassword;

  constructor(public payload: ForgotPasswordModel) {}
}

export class SignUp {
  static readonly type = ActionConstants.AuthSignUp;

  constructor(public payload: SignUpModel) {}
}

export class RestoreTokens {
  static readonly type = ActionConstants.AuthRestoreTokens;
  constructor(public payload: TokenModel) {}
}

export class SignOut {
  static readonly type = ActionConstants.AuthSignOut;
  constructor() {}
}

export class UpdateTokens {
  static readonly type = ActionConstants.AuthUpdateTokens;
  constructor(public payload: TokenModel) {}
}