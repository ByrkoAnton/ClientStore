import { Injectable } from '@angular/core';
import { CartModel } from 'src/app/Models/cart/cart-model';
import { EditionModel } from 'src/app/Models/edition/edition-models';
import Swal from 'sweetalert2';

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
      this.showSuccesMsg(_edition.title!, count.toString())
      return
    }

    var cart:CartModel[] = this.getUserCart();
    var productPositionInCart = cart.findIndex(({edition}) =>
    edition?.id === _edition.id);

    if(productPositionInCart ==-1)
    {
      cart.push(editionToCart);
      localStorage.setItem('userCart', JSON.stringify(cart));
      this.showSuccesMsg(_edition.title!, count.toString())
      return;
    }
      cart[productPositionInCart].editionQty!+=count
      localStorage.setItem('userCart', JSON.stringify(cart));
      this.showSuccesMsg(_edition.title!, count.toString())
  }

  getUserCart(): CartModel[]
  {
    var userCart :CartModel[] = JSON.parse(localStorage.getItem('userCart')!); 
    return userCart
  }

  showSuccesMsg(_title: string, _text: string)
  {
    Swal.fire({
      icon: 'success',
      confirmButtonColor:"#378f7b",
      title:_title,
      text: _text + " copies added to cart" 
    });
  }

}
