import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { EditionInCartModel } from 'src/app/Models/cart/cart-model';
import { StoreCart, StoreItemsInCartCount } from 'src/app/State-manager/Action/cart-action';
import { CartState } from 'src/app/State-manager/State/cart-state';
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

  totalPrice!:number;

  isCartEmpty!: boolean;
  res =this.store.select(CartState.getItemsInCartCount).subscribe(res => {
  this.isCartEmpty! = res === 0;
  });

  itemsInCartCount$ = this.store.select(CartState.getItemsInCartCount);

  cart$ = this.store.select(CartState.getCart);

  constructor(private store: Store, public activeModal: NgbActiveModal, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('userCart')!)
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
      this.changeCart(0, editionId);
  }

  changeCart(editionQty: number|null, editionId: number | null ) {
    var cart: EditionInCartModel[] = JSON.parse(localStorage.getItem('userCart')!);
    var positionInCart = cart.findIndex(({ edition }) => edition?.id === editionId);
    var countItemsInCart:number = JSON.parse(localStorage.getItem('cartItemsCount')!);
    var updatedCountItemsInCart = countItemsInCart - cart[positionInCart].editionQty! + editionQty!;

    if (editionQty === 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You will remove all " + cart[positionInCart].edition?.title + " from cart",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#378f7b',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          cart.splice(positionInCart, 1);
          localStorage.setItem('userCart', JSON.stringify(cart));
          localStorage.setItem("cartItemsCount",JSON.stringify(updatedCountItemsInCart))
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
    localStorage.setItem('userCart', JSON.stringify(cart));
      localStorage.setItem("cartItemsCount",JSON.stringify(updatedCountItemsInCart))
      this.store.dispatch(new StoreCart({
        editionsAndQty: cart
      }))
      this.store.dispatch(new StoreItemsInCartCount({
        itemsInCartCount:updatedCountItemsInCart
      }))
  }

  pay() {
    this.modalService.open(PaymentComponent);
  }
}

