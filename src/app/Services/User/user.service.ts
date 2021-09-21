import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/Models/user/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>('https://localhost:5001/api/User/GetUserById');
  }

  updateUser(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('https://localhost:5001/api/User/UserUpdate', model);
  }

  changePassword(model: UserModel): Observable<UserModel> {
    debugger
    return this.http.post<UserModel>('https://localhost:5001/api/User/ChangePassword', model);
  }
}
