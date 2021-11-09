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
import { AlertService } from 'src/app/services/alert/alert.service';
import { ActiveModalConstants, PaymentResultConstants, StripeCardOptionsConstants, StripeElementsOptionsConstants, SweetAlertConstants } from 'src/app/app-constants';

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
    iconStyle: StripeCardOptionsConstants.IconStyleSolid,
    style: {
      base: {
        iconColor: StripeCardOptionsConstants.BaseIcionColorSoftBlue,
        color: StripeCardOptionsConstants.ColorDarkBlue,
        fontWeight: StripeCardOptionsConstants.FontWeight300,
        fontFamily: StripeCardOptionsConstants.FontFamily,
        fontSize: StripeCardOptionsConstants.FontSize,
        '::placeholder': {
          color: StripeCardOptionsConstants.CollorGray,
        }
      },
      invalid: {
        iconColor: StripeCardOptionsConstants.InvalidIcionColorPink,
        color: StripeCardOptionsConstants.ColorPink
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: StripeElementsOptionsConstants.LocaleEn
  };

  stripeForm!: FormGroup;

  description!: string;

  orderId!:string;

  constructor(private store: Store, public activeModal: NgbActiveModal,
    private fb: FormBuilder, private stripeService: StripeService,
    private eventEmitterService: EventEmitterService, private alertService: AlertService) {
  }


  ngOnInit(): void {
    this.stripeForm! = this.fb.group({
      name: [String, [Validators.required]]
    });

    this.store.select(CartState.getCart).subscribe(result => {
      this.total =
        result?.reduce((accumulator, current) => accumulator + current.edition?.price! * current.editionQuantity!, 0)!;
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
        editionForPay.count = element.editionQuantity!;
        this.editionsForPay.push(editionForPay)
      });
    })

    this.stripeService
      .createToken(this.card.element)
      .subscribe((result) => {
        if (result.error) {
          this.alertService.showErrorMessage(result.error.message!)
          return;
        }

        if (result.token) {
          this.activeModal.dismiss(ActiveModalConstants.DismissCrossClick)
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
      icon: SweetAlertConstants.IconSuccess,
      confirmButtonColor:SweetAlertConstants.ConfirmButtonColorGreen,
      title:PaymentResultConstants.OrderNumberMsg +_title,
      text: _text  
    }).then(()=>{
      this.eventEmitterService.clearCart()
    });
  }
}
