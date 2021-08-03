import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ChangePassword, GetUser, UpdateUser } from 'src/app/State-manager/Action/user-acton';
import { UserState } from 'src/app/State-manager/State/user-state';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userForm: FormGroup = {} as FormGroup;
  changePasswordForm: FormGroup;
  isDisable: boolean = true;

  error_messages = {
    'userFirstName': [
      { type: 'required', message: 'First Name is required' },
      { type: 'minlength', message: 'Min length 2' }
    ],

    'userLastName': [
      { type: 'required', message: 'Last Name is required' }
    ],

    'userEmail': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email address' }
    ],

    'currentPassword': [
      { type: 'required', message: 'Password is required' },
    ],

    'newPassword': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Min password length 8' },
      { type: 'pattern', message: 'One ore more lowercase characters' },
      { type: 'pattern', message: 'One ore more uppercase characters' },
      { type: 'pattern', message: 'Any symbols " @#$%_!%&* "' },
      { type: 'pattern', message: 'One more digit from 0-9' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Min password length 8' },
    ],
  };

  regExpPassword: string = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%_!%&*]).{8,20})";

  constructor(private store: Store, public formBuilder: FormBuilder) {
    this.changePasswordForm = formBuilder.group({
      currentPassword: new FormControl('', Validators.compose([Validators.required])),
      newPassword: new FormControl('', Validators.compose([Validators.minLength(8), Validators.pattern(this.regExpPassword)])),
      confirmPassword: new FormControl('')
    }, {
      validators: this.isPasswordsMatch.bind(this)
    }
    )
    
    this.changePasswordForm.disable()
  }

  isPasswordsMatch(changePasswordForm: FormGroup) {
    const password = changePasswordForm.get('newPassword')?.value;
    const confirmPassword  = changePasswordForm.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordNotMatch:'passwordNotMatch'};
  }


  ngOnInit(): void {
    this.store.dispatch(new GetUser());
    this.store.select(UserState.getUser).subscribe((result) => {
      this.userForm = new FormGroup
        ({
          userEmail: new FormControl(result?.email, Validators.compose([Validators.required, Validators.email])),
          userFirstName: new FormControl(result?.firstName, Validators.compose([Validators.required, Validators.minLength(2)])),
          userLastName: new FormControl(result?.lastName, Validators.compose([Validators.required, Validators.minLength(2)]))
        })
      this.userForm.disable()
    })
  }

  Edit() {
    this.userForm.reset();
    this.changePasswordForm.reset();
    this.userForm.get('userEmail')?.setValue(this.store.selectSnapshot(UserState.getUser)?.email);
    this.userForm.get('userFirstName')?.setValue(this.store.selectSnapshot(UserState.getUser)?.firstName);
    this.userForm.get('userLastName')?.setValue(this.store.selectSnapshot(UserState.getUser)?.lastName);
    this.userForm.enabled ? this.userForm.disable() : this.userForm.enable();
    this.changePasswordForm.enabled ? this.changePasswordForm.disable() : this.changePasswordForm.enable();
  }

  makeButtonSaveEnable() {
    this.isDisable = false;
  }

  userUpdate() {
    if (this.userForm.dirty) {
      this.store.dispatch(new UpdateUser({
        firstName: this.userForm.get('userFirstName')?.value,
        lastName: this.userForm.get('userLastName')?.value,
        email: this.userForm.get('userEmail')?.value
      }
      ))
      this.userForm.disable() 
    }
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      this.store.dispatch(new ChangePassword({
        currentPassword: this.changePasswordForm.get('currentPassword')?.value,
        newPassword: this.changePasswordForm.get('newPassword')?.value
      }))
    }
  }
}
