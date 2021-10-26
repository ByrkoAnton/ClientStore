import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { CartConstants, RoutingConstants, TechnicalConstants } from 'src/app/app-constants';
import { SignOut } from 'src/app/State-manager/action/auth-action';
import { StoreItemsInCartCount } from 'src/app/State-manager/action/cart-action';
import { AuthState } from 'src/app/State-manager/state/auth-state';
import { CartState } from 'src/app/State-manager/state/cart-state';
import { CartComponent } from '../cart/cart.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signInRoute = RoutingConstants.SignIn;
  storeRoute = RoutingConstants.Store;
  profileRoute =RoutingConstants.GetUser;
  isAuthenticated!: boolean;
  auth = this.store.select(AuthState.isAuthenticated).subscribe(res => {
    this.isAuthenticated = res;
  });

  cartItemsCount$:any = this.store.select(CartState.getItemsInCartCount);
  isCartEmpty!:boolean;
  isCartFull!:boolean;
  cart = this.store.select(CartState.getItemsInCartCount).subscribe(res =>{
    this.isCartEmpty = res === CartConstants.EmptyCart;
    this.isCartFull = res! > CartConstants.FullCart;
  });


  constructor(private store: Store, private router: Router, public modalService: NgbModal) {}

  ngOnInit(): void {
    this.restoreCountItemsInCart();
  }

  openCart() {
    this.modalService.open(CartComponent);
  }

  signOut(): void {
    this.store.dispatch(new SignOut())
  }

  restoreCountItemsInCart():void{ 
    var count:number = + localStorage.getItem(TechnicalConstants.CartItemsCount)!;
      this.store.dispatch(new StoreItemsInCartCount({
        itemsInCartCount:count
      }))
    }
}

    
      