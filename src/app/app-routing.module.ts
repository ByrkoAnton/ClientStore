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
import { RoutingConstants } from './app-constants';

const routes: Routes = [
{path: RoutingConstants.SignIn, component: SignInComponent}, 
{path: RoutingConstants.Store, component:StoreComponent},
{path: RoutingConstants.SignUp, component: SignUpComponent},
{path: RoutingConstants.RegistrationSucces, component: SignUpSuccessComponent},
{path: RoutingConstants.ForgotPassword, component: ForgotPasswordComponent},
{path: 'resetpasswordsuccess', component: ResetPasswordSuccessComponent},
{path: RoutingConstants.SignOut, component: SignOutComponent},
{path: RoutingConstants.GetUser, component: UserProfileComponent, canActivate: [AuthGuard]},
{path: RoutingConstants.EditionProfile, component: EditionProfileComponent},
{path: RoutingConstants.Navbar, component: NavbarComponent},
{path: RoutingConstants.Cart, component: CartComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
