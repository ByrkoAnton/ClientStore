import { ChangePasswordModel } from "src/app/Models/user/change-password-model";
import {UserModel } from "src/app/Models/user/user-model";

export class GetUser {
    static readonly type = '[User] UserData';
    constructor() {}
  }

  export class UpdateUser {
    static readonly type = '[User] UserUpdate';
    constructor(public payload: UserModel) {}
  }

  export class ChangePassword {
    static readonly type = '[User] ChangePassword';
    constructor(public payload: ChangePasswordModel) {}
  }