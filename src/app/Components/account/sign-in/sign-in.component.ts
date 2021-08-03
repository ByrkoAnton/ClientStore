import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import {SignInModel} from '../../../Models/Account/sign-in-model';

import { SignIn } from '../../../State-manager/Action/auth-action';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  error_messages = {
    
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],

    'password': [
      { type: 'required', message: 'Password is required' }, 
    ],
  };

  signInModel:SignInModel ={} as SignInModel;
  signInForm: FormGroup;

  constructor(private store:Store, public formBuilder: FormBuilder ) {
    this.signInForm = formBuilder.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required]))
    })
  } 
  
  signIn():void{
  this.store.dispatch(new SignIn({
    email: this.signInForm.get('email')?.value, 
    password: this.signInForm.get('password')?.value})
  )}

  ngOnInit(): void {}
 }



  
