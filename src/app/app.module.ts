import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AuthState } from './State-manager/State/auth-state';
import { AuthGuard } from './Guards/auth.guard';
import { AccountModule } from './modules/account/account.module';
import { AuthInterceptorInterceptor } from './Interceptors/auth-interceptor.interceptor';
import { UserState } from './State-manager/State/user-state';
import { CommonModule } from '@angular/common';
import { UserModule } from './modules/user/user.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from './modules/store/store.module';
import { StoreState } from './State-manager/State/store-state';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditonState } from './State-manager/State/edition-state';
import { EditionModule } from './modules/edition/edition.module';
import { EventEmitterService } from './services/event-emitter/event-emitter.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { CartState } from './State-manager/State/cart-state';
import { OrderPaymentModule } from './modules/order-payment/order-payment.module';
import { PaymentState } from './State-manager/State/payment-state';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,  
  ],
  imports: [
    NgxsModule.forRoot([
      AuthState,
      UserState, 
      StoreState, 
      EditonState,
      PaymentState, 
      CartState
    ], { developmentMode: !environment.production }),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountModule,
    UserModule,
    StoreModule,
    EditionModule,
    OrderPaymentModule,
    RouterModule,
    NgbModule,
  
  ],
  providers: [
    AuthGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorInterceptor,
        multi: true
    },
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
