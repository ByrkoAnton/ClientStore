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
import { AccountModule } from './Modules/account/account.module';
import { AuthInterceptorInterceptor } from './Interceptors/auth-interceptor.interceptor';
import { UserState } from './State-manager/State/user-state';
import { CommonModule } from '@angular/common';
import { UserModule } from './Modules/user/user.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from './Modules/store/store.module';
import { StoreState } from './State-manager/State/store-state';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditonState } from './State-manager/State/edition-state';
import { EditionModule } from './Modules/edition/edition.module';
import { EditionProfileComponent } from './Components/edition-profile/edition-profile.component';
import { EventEmitterService } from './Services/event-emitter/event-emitter.service';




@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [
    NgxsModule.forRoot([AuthState, UserState, StoreState, EditonState], { developmentMode: !environment.production }),
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
    RouterModule,
    NgbModule
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
