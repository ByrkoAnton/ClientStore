import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ForgotPasswordModel } from 'src/app/Models/Account/forgot-password-model';
import { ForgotPassword } from 'src/app/State-manager/Action/auth-action';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  error_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ]};

  constructor(private store: Store, public formBuilder: FormBuilder) {
    this.forgotPasswordForm = formBuilder.group({
      email: new FormControl ('', Validators.compose([Validators.required, Validators.email]))
  })}

  forgotPassword():void{
  this.store.dispatch(new ForgotPassword({email: this.forgotPasswordForm.get('email')?.value}))
  }

  ngOnInit(): void {
  }
}
