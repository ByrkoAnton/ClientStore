import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { TechnicalConstants } from './app-constants';
import { RestoreTokens as RestoreTokens } from './state-manager/action/auth-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';

  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.restoreTokens();
    } 

  restoreTokens():void{ 
    let accessToken = localStorage.getItem(TechnicalConstants.AccessToken);
    let refreshToken = localStorage.getItem(TechnicalConstants.RefreshToken);
    if(accessToken !== null){
      this.store.dispatch(new RestoreTokens({accessToken: accessToken,
       refreshToken: refreshToken}))
    }
  } 
}


