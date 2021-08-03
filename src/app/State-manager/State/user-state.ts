import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { UserModel } from "src/app/Models/user/user-model";
import { AuthenticationService } from "src/app/Services/Authentication/authentication.service";
import { UserService } from "src/app/Services/User/user.service";
import { ChangePassword, GetUser, UpdateUser } from "../Action/user-acton";


  @State<UserModel>({
    name: 'UserData'
  })

@Injectable()
export class UserState {
  constructor(private userService:UserService, private authService:AuthenticationService, private router: Router) { }
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
      })
    )
  }
  @Action(UpdateUser)
  updateUser(context: StateContext<UserModel>, action: UpdateUser) {
    return this.userService.updateUser(action.payload).pipe(
      tap(() => {
        context.patchState(action.payload)
      }));
  }
  @Action(ChangePassword)
  changePassword(context: null, action: UpdateUser) {
    return this.userService.changePassword(action.payload).pipe(
      tap(() => {
    }));
  }
}