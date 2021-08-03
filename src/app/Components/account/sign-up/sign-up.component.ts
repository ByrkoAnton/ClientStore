import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Store } from '@ngxs/store';
import { SignUp } from 'src/app/State-manager/Action/auth-action';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  isDisable: boolean = false;

  error_messages = {
    'firstName': [
      {type: 'required', message: 'First Name is required'},
      {type: 'minlength', message: 'Min length 2'}
    ],

    'lastName': [
      { type: 'required', message: 'Last Name is required' }
    ],

    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],

    'password': [
      
      { type: 'minlength', message: 'Min password length 8' },
      { type: 'pattern', message: 'One ore more lowercase characters'},
      { type: 'pattern', message: 'One ore more uppercase characters'},
      { type: 'pattern', message: 'Any symbols " @#$%_!%&* "'},
      { type: 'pattern', message: 'One more digit from 0-9'}
    ],
    'confirmPassword': [
      { type: 'minlength', message: 'Min password length 8' },
    ],
  };

  regExpPassword:string ="((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%_!%&*]).{8,20})"; 

  requestSend: boolean = false;

  constructor(private store: Store, public formBuilder: FormBuilder) {
    this.signUpForm = formBuilder.group({
      firstName: new FormControl ('', Validators.compose ([Validators.required, Validators.minLength(2)])),
      lastName: new FormControl ('', Validators.compose ([Validators.required, Validators.minLength(2)])),
      email: new FormControl ('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl ('', Validators.compose ([Validators.required, Validators.minLength(8), Validators.pattern(this.regExpPassword)])),
      confirmPassword: new FormControl ('', Validators.compose ([Validators.required]))
    }, {
      validators: this.isPasswordsMatch.bind(this)
    });
  }

  isPasswordsMatch(signUpForm: FormGroup) {
    console.log(signUpForm.value)
    const password = signUpForm.get('password')?.value;
    const confirmPassword  = signUpForm.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordNotMatch:"passwordNotMatch"};
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.requestSend = true;
      this.store.dispatch(new SignUp({
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        lastName: this.signUpForm.get('lastName')?.value,
        firstName: this.signUpForm.get('firstName')?.value
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
