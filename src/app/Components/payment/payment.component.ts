import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { Store } from '@ngxs/store';
import { CartState } from 'src/app/State-manager/state/cart-state';
import Swal from 'sweetalert2';
import { Pay } from 'src/app/State-manager/action/payment-action';
import { EditionForPayModel } from 'src/app/Models/edition/edition-models';
import { CartComponent } from '../cart/cart.component';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter.service';
import { PaymentState } from 'src/app/State-manager/state/payment-state';
import { map } from 'rxjs/operators';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { PaymentModel, ResultPayModel } from 'src/app/Models/payment/payment-model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cart: CartComponent = {} as CartComponent;

  total!: number;
  editionsForPay: EditionForPayModel[] = [];

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee'
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeForm!: FormGroup;

  description!: string;

  orderId!:string;

  constructor(private store: Store, public activeModal: NgbActiveModal,
    private fb: FormBuilder, private stripeService: StripeService,
    private eventEmitterService: EventEmitterService) {
  }


  ngOnInit(): void {
    this.stripeForm! = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.store.select(CartState.getCart).subscribe(result => {
      this.total =
        result?.reduce((accumulator, current) => accumulator + current.edition?.price! * current.editionQty!, 0)!;
    })

    this.store.select(PaymentState.getPaymentResult).subscribe(result => {
      if(result?.orderId)
      {
        this.showPaymentResult(result?.orderId, result.message!);
      }
    });
  }

  pay(): void {
    this.store.select(CartState.getCart).subscribe(result => {
      result!.forEach(element => {
        var editionForPay = {} as EditionForPayModel;
        editionForPay.editionId = element.edition?.id!
        editionForPay.count = element.editionQty!;
        this.editionsForPay.push(editionForPay)
      });
    })

    this.stripeService
      .createToken(this.card.element)
      .subscribe((result) => {
        if (result.error) {
          Swal.fire({
            icon: 'error',
            title: result.error.message,
            confirmButtonColor: '#378f7b'
          })
          return;
        }

        if (result.token) {
          this.activeModal.dismiss('Cross click')
          this.store.dispatch(
            new Pay(
              {
                token: result.token.id,
                orderDescription: this.description,
                editions: this.editionsForPay
              }
            )
          )
        }
      });
  }

  showPaymentResult(_title: string, _text: string) {
    Swal.fire({
      icon: 'success',
      confirmButtonColor:"#378f7b",
      
      title:"Order number: "+_title,
      text: _text  
    }).then(()=>{
      this.eventEmitterService.clearCart()
    });
  }
}
