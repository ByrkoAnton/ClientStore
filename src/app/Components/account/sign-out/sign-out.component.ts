import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TokenModel } from 'src/app/Models/Account/token-model';
import { SignOut } from 'src/app/State-manager/Action/auth-action';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  
  tokenModel: TokenModel = {} as TokenModel;

  constructor(private store: Store) { }
  signOut(): void {
    this.store.dispatch(new SignOut())
  }
  
  ngOnInit(): void {
  }
}
