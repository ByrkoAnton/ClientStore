import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest!: FormGroup;

  constructor(private store: Store, public activeModal: NgbActiveModal,
     private fb: FormBuilder, private stripeService: StripeService) { }

  ngOnInit(): void {
    // this.invokeStripe();
    this.stripeTest! = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name')!.value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  // makePayment(amount: any) {
  //   const paymentHandler = (<any>window).StripeCheckout.configure({
  //     key:
  //       'pk_test_51IpZMGKDlX8pBARSSDF2qOOxTWr8ITBjqaJmwwAll04P7YmBC0eRt1KbFEWzUd13g6N5u1fp8Bq0NQeBxATPwgNH00EfpD8gFW',

  //     locale: 'auto',
  //     token: function (stripeToken: any) {
  //       console.log(stripeToken.card);
  //       alert('Stripe token generated!');
  //     },
  //   });

  //   paymentHandler.open({
  //     name: 'Technical Adda',
  //     description: '4 Products Added',
  //     amount: amount * 100,
  //   });
  // }

  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement('script');
  //     script.id = 'stripe-script';
  //     script.type = 'text/javascript';
  //     script.src = 'https://checkout.stripe.com/checkout.js';
  //     window.document.body.appendChild(script);
  //   }
  // }
}
