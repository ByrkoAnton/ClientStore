import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from 'src/app/Components/account/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from 'src/app/Components/account/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'src/app/Components/account/forgot-password/forgot-password.component';
import { SignOutComponent } from 'src/app/Components/account/sign-out/sign-out.component';
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
