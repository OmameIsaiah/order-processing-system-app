import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'otp-verification', component: OtpVerificationComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'users-management', component: UsersManagementComponent },
      { path: 'account-profile', component: AccountProfileComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
    ],
  },
  { path: '**', redirectTo: '/login' }, // Redirect to login for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}