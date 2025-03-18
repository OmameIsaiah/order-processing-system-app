import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NotificationComponent } from './components/notification/notification.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    OtpVerificationComponent,
    DashboardComponent,
    ProductsComponent,
    OrdersComponent,
    UsersManagementComponent,
    AccountProfileComponent,
    AccountSettingsComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Add this if using HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}