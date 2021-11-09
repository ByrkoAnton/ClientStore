import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserServiceConstants } from 'src/app/app-constants';
import { UserModel } from 'src/app/models/user/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(UserServiceConstants.GetUserByIdControlerRoute);
  }

  updateUser(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(UserServiceConstants.UserUpdateControlerRoute, model);
  }

  changePassword(model: UserModel): Observable<UserModel> {
    debugger
    return this.http.post<UserModel>(UserServiceConstants.ChangePasswordControlerRoute, model);
  }
}
