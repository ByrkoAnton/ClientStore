import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap } from "rxjs/operators";
import { StateConstants } from "src/app/app-constants";
import { UserModel } from "src/app/Models/user/user-model";
import { AlertService } from "src/app/services/alert/alert.service";
import { UserService } from "src/app/services/user/user.service";
import { ChangePassword, GetUser, UpdateUser } from "../action/user-acton";


  @State<UserModel>({
    name: StateConstants.UserStateName,
    defaults:{
      email:null,
      firstName:null,
      lastName:null
    }
  })

@Injectable()
export class UserState {
  constructor(private userService:UserService, private alertService: AlertService) { }
  @Selector()
  static getUser(state: UserModel): UserModel | null {
    return state;
  }

  @Action(GetUser)
  getUser(context: StateContext<UserModel>, action: GetUser) {
    return this.userService.getUser().pipe(
      tap((result) => {
        context.patchState({
            email: result.email,
            lastName: result.lastName,
            firstName: result.firstName
        });
      }),
      catchError(async error => 
        this.alertService.showErrorMessage(error.error))
       )
  }

  @Action(UpdateUser)
  updateUser(context: StateContext<UserModel>, action: UpdateUser) {
    return this.userService.updateUser(action.payload).pipe(
      tap(() => {
        context.patchState(action.payload)
      }),
      catchError(async error => 
        this.alertService.showErrorMessage(error.error))
       );
  }

  @Action(ChangePassword)
  changePassword(context: null, action: UpdateUser) {
    return this.userService.changePassword(action.payload).pipe(
      tap(() => {
    }),
    catchError(async error => 
      this.alertService.showErrorMessage(error.error))
     );
  }
}