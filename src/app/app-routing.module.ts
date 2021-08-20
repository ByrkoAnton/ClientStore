import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/account/forgot-password/forgot-password.component';
import { ResetPasswordSuccessComponent } from './components/account/reset-password-success/reset-password-success.component';
import { SignInComponent } from './components/account/sign-in/sign-in.component';
import { SignOutComponent } from './components/account/sign-out/sign-out.component';
import { SignUpSuccessComponent } from './components/account/sign-up-success/sign-up-success.component';
import { SignUpComponent } from './components/account/sign-up/sign-up.component';
import { CartComponent } from './components/cart/cart.component';
import { EditionProfileComponent } from './components/edition-profile/edition-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreComponent } from './components/store/store.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
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
