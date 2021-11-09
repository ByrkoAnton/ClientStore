import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartConstants, EditionProfileConstants, TechnicalConstants } from 'src/app/app-constants';
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
  

  editionQuantity: number = EditionProfileConstants.OneEdition;
  edition:EditionModel = {} as EditionModel;
  
  ngOnInit(): void {
   var editionId:number = JSON.parse(localStorage.getItem(TechnicalConstants.CurrentEditonId)!)
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
      editionQuantity: this.editionQuantity
     };

    if(localStorage.getItem(TechnicalConstants.UserCart) === null)
    {
     var cart:EditionInCartModel[] = [];
      cart.push(editionToCart)
      this.alertService.showSuccesMessage(this.edition.title!, this.editionQuantity.toString() + CartConstants.AddEditionsToCartMsg)
      this.storeCart(cart, editionToCart.editionQuantity)
      return
    }

    var cart:EditionInCartModel[] = JSON.parse(localStorage.getItem(TechnicalConstants.UserCart)!);
    var productPositionInCart = cart.findIndex(({edition}) =>
    edition?.id === this.edition.id);

    if(productPositionInCart == EditionProfileConstants.NoCurrentEditionInCart)
    {
      cart.push(editionToCart);
      this.alertService.showSuccesMessage(this.edition.title!, this.editionQuantity.toString() + CartConstants.AddEditionsToCartMsg)
      this.storeCart(cart) 
      return;
    }
      cart[productPositionInCart].editionQuantity!+=this.editionQuantity
      this.alertService.showSuccesMessage(this.edition.title!, this.editionQuantity.toString() + CartConstants.AddEditionsToCartMsg)
      this.storeCart(cart) 
  }

  storeCart( cart:EditionInCartModel[], editionQuantity:number | null = TechnicalConstants.NumberDefault)
  {
    var editionCount = editionQuantity !== TechnicalConstants.NumberDefault ? editionQuantity : this.countEditionsInCart(cart);
    localStorage.setItem(TechnicalConstants.UserCart, JSON.stringify(cart));
    localStorage.setItem(TechnicalConstants.CartItemsCount, JSON.stringify(editionCount));
    this.storeCountItemsInCart(editionCount);
    this.editionQuantity = EditionProfileConstants.OneEdition;
  }

  
  countEditionsInCart(cart:EditionInCartModel[]): number
  {
    var count: number = TechnicalConstants.NumberDefault;
    cart.forEach(element => {
      count += element.editionQuantity!
    });
    return count;
  }

  getUserCart(): EditionInCartModel[]
  {
    var userCart :EditionInCartModel[] = JSON.parse(localStorage.getItem(TechnicalConstants.UserCart)!); 
    return userCart
  }

  storeCountItemsInCart(itemsCount: number | null) {
      this.store.dispatch(new StoreItemsInCartCount({
        itemsInCartCount:itemsCount
      }))
  }
}
