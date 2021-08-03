import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { RestoreTokens as RestoreTokens } from './State-manager/Action/auth-action';

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
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    if(accessToken !== null){
      this.store.dispatch(new RestoreTokens({accessToken: accessToken,
       refreshToken: refreshToken}))
    }
  } 
}


