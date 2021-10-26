import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { CartConstants, RoutingConstants, SweetAlertConstants, TechnicalConstants } from 'src/app/app-constants';
import { EditionInCartModel } from 'src/app/Models/cart/cart-model';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter.service';
import { ClearCart, StoreCart, StoreItemsInCartCount } from 'src/app/State-manager/action/cart-action';
import { AuthState } from 'src/app/State-manager/state/auth-state';
import { CartState } from 'src/app/State-manager/state/cart-state';
import Swal from 'sweetalert2';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() src: any;

  cart: EditionInCartModel[] = {} as EditionInCartModel[];
  signInRoute = RoutingConstants.SignIn;

  isAuthenticated!: boolean;
  auth = this.store.select(AuthState.isAuthenticated).subscribe(res => {
    this.isAuthenticated = res;
  });

  totalPrice!:number;

  isCartEmpty!: boolean;
  result = this.store.select(CartState.getItemsInCartCount).subscribe(res => {
  this.isCartEmpty! = res === CartConstants.EmptyCart;
  });

  itemsInCartCount$ = this.store.select(CartState.getItemsInCartCount);

  cart$ = this.store.select(CartState.getCart);

  constructor(private store: Store, public activeModal: NgbActiveModal,
     public modalService: NgbModal, private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem(TechnicalConstants.UserCart)!)
    if (this.cart !== undefined) {
      this.store.dispatch(new StoreCart({
        editionsAndQty: this.cart
      }))
    }

    this.cart$.subscribe(res =>
      {
       this.totalPrice = 
       res?.reduce((accumulator, current) => accumulator + current.edition?.price! * current.editionQty!, 0)!;
      })

    this.eventEmitterService.subsVar = this.eventEmitterService.    
    invokeClearCart.subscribe(() => {    
    this.clearCart();   
    });
         
  }

  add(editionQty: number|null, editionId: number | null)
  {
      this.changeCart(++editionQty!,editionId);
  }

  subtract(editionQty: number|null, editionId: number | null)
  {
      this.changeCart(--editionQty!,editionId);
  }

  delete(editionId: number | null)
  {
      this.changeCart(CartConstants.EmptyCart, editionId);
  }

  changeCart(editionQty: number|null, editionId: number | null ) {
    var cart: EditionInCartModel[] = JSON.parse(localStorage.getItem(TechnicalConstants.UserCart)!);
    var positionInCart = cart.findIndex(({ edition }) => edition?.id === editionId);
    var countItemsInCart:number = JSON.parse(localStorage.getItem(TechnicalConstants.CartItemsCount)!);
    var updatedCountItemsInCart = countItemsInCart - cart[positionInCart].editionQty! + editionQty!;

    if (editionQty === TechnicalConstants.NumberDefault) {
      Swal.fire({
        title: CartConstants.DialogDelTitle,
        text: CartConstants.DialogDelTextPaart1 + cart[positionInCart].edition?.title + CartConstants.DialogDelTextPaart2,
        icon: SweetAlertConstants.IconQuestion,
        showCancelButton: SweetAlertConstants.ShowCancelButtonTrue,
        confirmButtonColor: SweetAlertConstants.ConfirmButtonColorGreen,
        cancelButtonColor: SweetAlertConstants.CancelButtonColorRed,
        confirmButtonText: CartConstants.DialogDelConfirmText
      }).then((result) => {
        if (result.isConfirmed) {
          cart.splice(positionInCart, 1);
          localStorage.setItem(TechnicalConstants.UserCart, JSON.stringify(cart));
          localStorage.setItem(TechnicalConstants.CartItemsCount, JSON.stringify(updatedCountItemsInCart))
          this.store.dispatch(new StoreCart({
            editionsAndQty: cart
          }))
          this.store.dispatch(new StoreItemsInCartCount({
            itemsInCartCount:updatedCountItemsInCart
          }))   
        }
      })
      return
    }

    cart[positionInCart].editionQty = editionQty;
    localStorage.setItem(TechnicalConstants.UserCart, JSON.stringify(cart));
      localStorage.setItem(TechnicalConstants.CartItemsCount, JSON.stringify(updatedCountItemsInCart))
      this.store.dispatch(new StoreCart({
        editionsAndQty: cart
      }))
      this.store.dispatch(new StoreItemsInCartCount({
        itemsInCartCount:updatedCountItemsInCart
      }))
  }

  clearCart()
  {
    localStorage.removeItem(TechnicalConstants.UserCart);
    localStorage.removeItem(TechnicalConstants.CartItemsCount);
    this.store.dispatch(new ClearCart)
    location.reload();
  }

  pay() {
    this.modalService.open(PaymentComponent);
  }
}

