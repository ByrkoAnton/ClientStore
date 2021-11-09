import { ActionConstants } from "src/app/app-constants";
import { ChangePasswordModel } from "src/app/models/user/change-password-model";
import {UserModel } from "src/app/models/user/user-model";

export class GetUser {
    static readonly type = ActionConstants.UserGet;
    constructor() {}
  }

  export class UpdateUser {
    static readonly type = ActionConstants.UserUpdate;
    constructor(public payload: UserModel) {}
  }

  export class ChangePassword {
    static readonly type = ActionConstants.UserChangePassword;
    constructor(public payload: ChangePasswordModel) {}
  }