import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from 'src/app/components/account/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from 'src/app/components/account/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'src/app/components/account/forgot-password/forgot-password.component';
import { SignOutComponent } from 'src/app/components/account/sign-out/sign-out.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  SignOutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule 
  ]
})
export class AccountModule { }
