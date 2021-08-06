import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EditionInCartModel, CartModel  } from 'src/app/Models/cart/cart-model';
import { EditionModel } from 'src/app/Models/edition/edition-models';
import { CartService } from 'src/app/Services/cart/cart.service';
import { EventEmitterService } from 'src/app/Services/event-emitter/event-emitter.service';
import { StoreItemsInCartCount } from 'src/app/State-manager/Action/cart-action';
import { GetEdition } from 'src/app/State-manager/Action/edition-action';
import { EditonState as EditionState } from 'src/app/State-manager/State/edition-state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edition-profile',
  templateUrl: './edition-profile.component.html',
  styleUrls: ['./edition-profile.component.scss']
})

export class EditionProfileComponent implements OnInit {

  constructor(private store: Store, private eventEmitterService: EventEmitterService,  private cartService: CartService) {
  }

  edition$ = this.store.select(EditionState.getCurrentEdition)
  

  editionQty: number = 1;
  edition:EditionModel = {} as EditionModel;
  
  ngOnInit(): void {
   var editionId:number = JSON.parse(localStorage.getItem('currentEditonId')!)
   this.getEdition(editionId);
    // this.store.select(EditionState.getCurrentEditionId).subscribe((x: number) => {
    //   this.getEdition(x);
    // }) !Спросить какой вариант оставить!!
    
    this.edition$.subscribe((x:EditionModel|null)=> {
      this.edition = x!
    })
  }

  getEdition(editionId: number): void {
    this.store.dispatch(new GetEdition({
      Id: editionId
    }))
  }

  signOut() {
    this.eventEmitterService.signOut();
  }

  addToCart()
  {
    var editionToCart : EditionInCartModel = {
      edition: this.edition,
      editionQty: this.editionQty
     };
    if(localStorage.getItem('userCart') === null)
    {
     var cart:EditionInCartModel[] = [];
      cart.push(editionToCart)
      localStorage.setItem('userCart', JSON.stringify(cart));
      this.showSuccesMsg(this.edition.title!, this.editionQty.toString())
      localStorage.setItem('cartItemsCount', JSON.stringify(editionToCart.editionQty));
      this.storeCountItemsInCart(editionToCart.editionQty);
     // this.storeCart(cart);
      this.editionQty =1;
      return
    }

    var cart:EditionInCartModel[] = JSON.parse(localStorage.getItem('userCart')!);
    var productPositionInCart = cart.findIndex(({edition}) =>
    edition?.id === this.edition.id);

    if(productPositionInCart ==-1)
    {
      cart.push(editionToCart);
      localStorage.setItem('userCart', JSON.stringify(cart));
      this.showSuccesMsg(this.edition.title!, this.editionQty.toString())
      localStorage.setItem('cartItemsCount', JSON.stringify(this.countEditionsInCart(cart)));
      this.storeCountItemsInCart(this.countEditionsInCart(cart));
      //this.storeCart(cart);
      this.editionQty =1;
      return;
    }
      cart[productPositionInCart].editionQty!+=this.editionQty
      localStorage.setItem('userCart', JSON.stringify(cart));
      this.showSuccesMsg(this.edition.title!, this.editionQty.toString())
      localStorage.setItem('cartItemsCount', JSON.stringify(this.countEditionsInCart(cart)));
      this.storeCountItemsInCart(this.countEditionsInCart(cart));
      //this.storeCart(cart);
      this.editionQty =1;
  }

  countEditionsInCart(cart:EditionInCartModel[]): number
  {
    var count: number = 0;
    cart.forEach(element => {
      count += element.editionQty!
    });
    return count;
  }

  getUserCart(): EditionInCartModel[]
  {
    var userCart :EditionInCartModel[] = JSON.parse(localStorage.getItem('userCart')!); 
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

  storeCountItemsInCart(itemsCount: number | null) {
      this.store.dispatch(new StoreItemsInCartCount({
        itemsInCartCount:itemsCount
      }))
  }
}
