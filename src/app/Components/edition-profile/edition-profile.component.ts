import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EditionInCartModel} from 'src/app/Models/cart/cart-model';
import { EditionModel } from 'src/app/Models/edition/edition-models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter.service';
import { StoreItemsInCartCount } from 'src/app/State-manager/action/cart-action';
import { GetEdition } from 'src/app/State-manager/action/edition-action';
import { EditonState as EditionState } from 'src/app/State-manager/state/edition-state';

@Component({
  selector: 'app-edition-profile',
  templateUrl: './edition-profile.component.html',
  styleUrls: ['./edition-profile.component.scss']
})

export class EditionProfileComponent implements OnInit {

  constructor(private store: Store, private eventEmitterService: EventEmitterService,  private alertService: AlertService) {
  }

  edition$ = this.store.select(EditionState.getCurrentEdition)
  

  editionQty: number = 1;
  edition:EditionModel = {} as EditionModel;
  
  ngOnInit(): void {
   var editionId:number = JSON.parse(localStorage.getItem('currentEditonId')!)
   this.getEdition(editionId);
   
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
      this.alertService.showSuccesMessage(this.edition.title!, this.editionQty.toString() + " copies added to cart")
      localStorage.setItem('cartItemsCount', JSON.stringify(editionToCart.editionQty));
      this.storeCountItemsInCart(editionToCart.editionQty);
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
      this.alertService.showSuccesMessage(this.edition.title!, this.editionQty.toString() + " copies added to cart")
      localStorage.setItem('cartItemsCount', JSON.stringify(this.countEditionsInCart(cart)));
      this.storeCountItemsInCart(this.countEditionsInCart(cart));
      this.editionQty =1;
      return;
    }
      cart[productPositionInCart].editionQty!+=this.editionQty
      localStorage.setItem('userCart', JSON.stringify(cart));
      this.alertService.showSuccesMessage(this.edition.title!, this.editionQty.toString() + " copies added to cart")
      localStorage.setItem('cartItemsCount', JSON.stringify(this.countEditionsInCart(cart)));
      this.storeCountItemsInCart(this.countEditionsInCart(cart));
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

  storeCountItemsInCart(itemsCount: number | null) {
      this.store.dispatch(new StoreItemsInCartCount({
        itemsInCartCount:itemsCount
      }))
  }
}
