import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';




@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    BrowserModule,
    NgbModule,
    NgxStripeModule.forRoot('pk_test_51IpZMGKDlX8pBARSSDF2qOOxTWr8ITBjqaJmwwAll04P7YmBC0eRt1KbFEWzUd13g6N5u1fp8Bq0NQeBxATPwgNH00EfpD8gFW'),
    
  ]
})
export class OrderPaymentModule { }
