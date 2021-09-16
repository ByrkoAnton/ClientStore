import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import { Store } from '@ngxs/store';
import { CartState } from 'src/app/State-manager/State/cart-state';
import Swal from 'sweetalert2';
import { Pay } from 'src/app/State-manager/Action/payment-action';
import { EditionForPayModel } from 'src/app/Models/edition/edition-models';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

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

  constructor(private store: Store, public activeModal: NgbActiveModal,
     private fb: FormBuilder, private stripeService: StripeService) { }

  ngOnInit(): void {
    this.stripeForm! = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.store.select(CartState.getCart).subscribe(result =>
      {
       this.total = 
       result?.reduce((accumulator, current) => accumulator + current.edition?.price! * current.editionQty!, 0)!;
      })
  }

  createToken(): void {
    this.store.select(CartState.getCart).forEach(result =>
      { 
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
        if (result.token) {
          console.log(result.token.id);
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
        } else if (result.error) {
          Swal.fire({
            icon: 'error',
            title: result.error.message,
            confirmButtonColor: '#378f7b'
          })
          console.log(result.error.message);
        }
      });
  }
}
