import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './Components/account/forgot-password/forgot-password.component';
import { ResetPasswordSuccessComponent } from './Components/account/reset-password-success/reset-password-success.component';
import { SignInComponent } from './Components/account/sign-in/sign-in.component';
import { SignOutComponent } from './Components/account/sign-out/sign-out.component';
import { SignUpSuccessComponent } from './Components/account/sign-up-success/sign-up-success.component';
import { SignUpComponent } from './Components/account/sign-up/sign-up.component';
import { CartComponent } from './Components/cart/cart.component';
import { EditionProfileComponent } from './Components/edition-profile/edition-profile.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { StoreComponent } from './Components/store/store.component';
import { UserProfileComponent } from './Components/user/user-profile/user-profile.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
{path: 'signin', component: SignInComponent}, 
{ path: 'store', component:StoreComponent},
{path: 'signup', component: SignUpComponent},
{path: 'registrationsuccess', component: SignUpSuccessComponent},
{path: 'forgotpassword', component: ForgotPasswordComponent},
{path: 'resetpasswordsuccess', component: ResetPasswordSuccessComponent},
{path: 'signout', component: SignOutComponent},
{path: 'getuser', component: UserProfileComponent, canActivate: [AuthGuard]},
{path: 'editionprofile', component: EditionProfileComponent},
{path: 'navbar', component: NavbarComponent},
{path: 'cart', component: CartComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
