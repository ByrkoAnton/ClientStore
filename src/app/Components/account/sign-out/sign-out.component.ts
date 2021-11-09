import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TokenModel } from 'src/app/models/account/token-model';
import { SignOut } from 'src/app/state-manager/action/auth-action';

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
