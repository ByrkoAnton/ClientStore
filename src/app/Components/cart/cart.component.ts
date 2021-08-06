import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EditionInCartModel } from 'src/app/Models/cart/cart-model';
import { StoreCart } from 'src/app/State-manager/Action/cart-action';
import { CartState } from 'src/app/State-manager/State/cart-state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  cart$ = this.store.select(CartState.getCart);

  constructor(private store: Store) { }

  ngOnInit(): void {
    var cart:EditionInCartModel[] = JSON.parse(localStorage.getItem('userCart')!)

    this.store.dispatch(new StoreCart({
    editionsAndQty:cart
    }))
  }

}
