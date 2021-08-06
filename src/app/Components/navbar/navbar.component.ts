import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SignOut } from 'src/app/State-manager/Action/auth-action';
import { StoreItemsInCartCount } from 'src/app/State-manager/Action/cart-action';
import { AuthState } from 'src/app/State-manager/State/auth-state';
import { CartState } from 'src/app/State-manager/State/cart-state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated!: boolean;
  auth = this.store.select(AuthState.isAuthenticated).subscribe(res => {
    this.isAuthenticated = res;
  });

  cartItemsCount$:any = this.store.select(CartState.getItemsInCartCount);
  isCartEmpty!:boolean;
  isCartFull!:boolean;
  cart = this.store.select(CartState.getItemsInCartCount).subscribe(res =>{
    this.isCartEmpty = res === 0;
    this.isCartFull = res! > 99
  });

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.restoreCountItemsInCart();
  }
  signOut(): void {
    this.store.dispatch(new SignOut())
  }

  restoreCountItemsInCart():void{ 
    var count:number = + localStorage.getItem('cartItemsCount')!;
      this.store.dispatch(new StoreItemsInCartCount({
        itemsInCartCount:count
      }))
    }
}

    
      