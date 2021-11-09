import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Store } from '@ngxs/store';
import { ErrorConstants, RegExpConstants, RoutingConstants, TechnicalConstants } from 'src/app/app-constants';
import { SignUp } from 'src/app/state-manager/action/auth-action';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signInRoute=RoutingConstants.SignIn;
  signUpForm: FormGroup;
  isDisable: boolean = false;

  error_messages = ErrorConstants.SignUpFormErrors;

  requestSend: boolean = false;

  constructor(private store: Store, public formBuilder: FormBuilder) {
    this.signUpForm = formBuilder.group({
      firstName: new FormControl ('', Validators.compose ([Validators.required, Validators.minLength(2)])),
      lastName: new FormControl ('', Validators.compose ([Validators.required, Validators.minLength(2)])),
      email: new FormControl ('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl ('', Validators.compose ([Validators.required, Validators.minLength(8), Validators.pattern(RegExpConstants.Password)])),
      confirmPassword: new FormControl ('', Validators.compose ([Validators.required]))
    }, {
      validators: this.isPasswordsMatch.bind(this)
    });
  }

  isPasswordsMatch(signUpForm: FormGroup) {
    console.log(signUpForm.value)
    const password = signUpForm.get(TechnicalConstants.Password)?.value;
    const confirmPassword  = signUpForm.get(TechnicalConstants.ConfirmPassword)?.value;
    return password === confirmPassword ? null : {passwordNotMatch:TechnicalConstants.PasswordNotMatch};
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.requestSend = true;
      this.store.dispatch(new SignUp({
        email: this.signUpForm.get(TechnicalConstants.Email)?.value,
        password: this.signUpForm.get(TechnicalConstants.Password)?.value,
        lastName: this.signUpForm.get(TechnicalConstants.LastName)?.value,
        firstName: this.signUpForm.get(TechnicalConstants.FirstName)?.value
      })).subscribe(res => {
        this.requestSend = false;
      },
       err =>{
         console.log(err);
        this.requestSend = false;
      })
    }
  }

  ngOnInit(): void { }
}
