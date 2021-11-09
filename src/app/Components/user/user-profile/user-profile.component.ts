import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ErrorConstants, RegExpConstants, TechnicalConstants, UserProfileConstants } from 'src/app/app-constants';
import { ChangePassword, GetUser, UpdateUser } from 'src/app/state-manager/action/user-acton';
import { UserState } from 'src/app/state-manager/state/user-state';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userForm: FormGroup = {} as FormGroup;
  changePasswordForm: FormGroup;
  isDisable: boolean = true;

  error_messages = ErrorConstants.UserProfileFormErrors;

  constructor(private store: Store, public formBuilder: FormBuilder) {
    this.changePasswordForm = formBuilder.group({
      currentPassword: new FormControl(TechnicalConstants.EmptyString, Validators.compose([Validators.required])),
      newPassword: new FormControl(TechnicalConstants.EmptyString, Validators.compose([Validators.minLength(TechnicalConstants.PasswordMinLenghts),
         Validators.pattern(RegExpConstants.Password)])),
      confirmPassword: new FormControl(TechnicalConstants.EmptyString)
    }, {
      validators: this.isPasswordsMatch.bind(this)
    }
    )
    
    this.changePasswordForm.disable()
  }

  isPasswordsMatch(changePasswordForm: FormGroup) {
    const password = changePasswordForm.get(TechnicalConstants.NewPassword)?.value;
    const confirmPassword  = changePasswordForm.get(TechnicalConstants.ConfirmPassword)?.value;
    return password === confirmPassword ? null : {passwordNotMatch:TechnicalConstants.PasswordNotMatch};
  }


  ngOnInit(): void {
    this.store.dispatch(new GetUser());
    this.store.select(UserState.getUser).subscribe((result) => {
      this.userForm = new FormGroup
        ({
          userEmail: new FormControl(result?.email, Validators.compose([Validators.required, Validators.email])),
          userFirstName: new FormControl(result?.firstName, Validators.compose([Validators.required,
             Validators.minLength(TechnicalConstants.FirstNameMinLenghts)])),
          userLastName: new FormControl(result?.lastName, Validators.compose([Validators.required,
             Validators.minLength(TechnicalConstants.LastNameMinLenghts)]))
        })
      this.userForm.disable()
    })
  }

  Edit() {
    this.userForm.reset();
    this.changePasswordForm.reset();
    this.userForm.get(UserProfileConstants.FormUserEmail)?.setValue(this.store.selectSnapshot(UserState.getUser)?.email);
    this.userForm.get(UserProfileConstants.FormUserName)?.setValue(this.store.selectSnapshot(UserState.getUser)?.firstName);
    this.userForm.get(UserProfileConstants.FormUserLastName)?.setValue(this.store.selectSnapshot(UserState.getUser)?.lastName);
    this.userForm.enabled ? this.userForm.disable() : this.userForm.enable();
    this.changePasswordForm.enabled ? this.changePasswordForm.disable() : this.changePasswordForm.enable();
  }

  makeButtonSaveEnable() {
    this.isDisable = false;
  }

  userUpdate() {
    if (this.userForm.dirty) {
      this.store.dispatch(new UpdateUser({
        firstName: this.userForm.get(UserProfileConstants.FormUserName)?.value,
        lastName: this.userForm.get(UserProfileConstants.FormUserLastName)?.value,
        email: this.userForm.get(UserProfileConstants.FormUserEmail)?.value
      }
      ))
      this.userForm.disable() 
    }
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      this.store.dispatch(new ChangePassword({
        currentPassword: this.changePasswordForm.get(TechnicalConstants.CurrentPassword)?.value,
        newPassword: this.changePasswordForm.get(TechnicalConstants.NewPassword)?.value
      }))
    }
  }
}
