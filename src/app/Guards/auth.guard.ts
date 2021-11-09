import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RoutingConstants } from '../app-constants';
import {AuthState} from '../state-manager/state/auth-state'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store, private router: Router) {}
  
    canActivate() {
        const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
        if (!isAuthenticated) {
            this.router.navigateByUrl(RoutingConstants.SignIn);
          return false;
        }
        return true;
      }
  }
  
  

