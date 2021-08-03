import { Injectable } from '@angular/core';
import { CartModel } from 'src/app/Models/cart/cart-model';
import { EditionModel } from 'src/app/Models/edition/edition-models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(_edition: EditionModel, count: number)
  {
    var editionToCart : CartModel = {
      edition: _edition,
      editionQty: count
     };
    if(localStorage.getItem('userCart') === null)
    {
     var cart:CartModel[] = [];
      cart.push(editionToCart)
      localStorage.setItem('userCart', JSON.stringify(cart));
      debugger
      return
    }

    var cart:CartModel[] = this.getUserCart();
    var isProductExistInCart = cart.findIndex(({edition}) =>
    edition?.id === _edition.id);

    if(isProductExistInCart ==-1)
    {
      debugger
      cart.push(editionToCart);
      localStorage.setItem('userCart', JSON.stringify(cart));
      return;
    }
      cart[isProductExistInCart].editionQty!+=count
      localStorage.setItem('userCart', JSON.stringify(cart));
  }

  getUserCart(): CartModel[]
  {
    var userCart :CartModel[] = JSON.parse(localStorage.getItem('userCart')!); 
    return userCart
  }

}
