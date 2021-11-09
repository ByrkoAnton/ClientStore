import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ErrorConstants, TechnicalConstants } from 'src/app/app-constants';
import { ForgotPassword } from 'src/app/state-manager/action/auth-action';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  error_messages = ErrorConstants.ForgotPasswordFormErrors;
  
  constructor(private store: Store, public formBuilder: FormBuilder) {
    this.forgotPasswordForm = formBuilder.group({
      email: new FormControl ('', Validators.compose([Validators.required, Validators.email]))
  })}

  ngOnInit(): void {
  }

  forgotPassword():void{
  this.store.dispatch(new ForgotPassword({email: this.forgotPasswordForm.get(TechnicalConstants.Email)?.value}))
  }

}
