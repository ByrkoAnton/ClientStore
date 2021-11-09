import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ErrorConstants, RoutingConstants, TechnicalConstants } from 'src/app/app-constants';
import {SignInModel} from '../../../models/account/sign-in-model';

import { SignIn } from '../../../state-manager/action/auth-action';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signUpRoute=RoutingConstants.SignUp;
  forgotePasswordRoute=RoutingConstants.ForgotPassword;

  error_messages = ErrorConstants.SignInFormErrors;

  signInModel:SignInModel ={} as SignInModel;
  signInForm: FormGroup;

  constructor(private store:Store, public formBuilder: FormBuilder ) {
    this.signInForm = formBuilder.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required]))
    })
  } 
  
  ngOnInit(): void {}

  signIn():void{
  this.store.dispatch(new SignIn({
    email: this.signInForm.get(TechnicalConstants.Email)?.value, 
    password: this.signInForm.get(TechnicalConstants.Password)?.value})
  )}
 }



  
