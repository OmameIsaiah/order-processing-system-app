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
import { AddProductModalComponent } from './components/products/add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from './components/products/edit-product-modal/edit-product-modal.component';
import { ConfirmDeleteModalComponent } from './components/products/confirm-delete-modal/confirm-delete-modal.component';
import { ViewProductModalComponent } from './components/products/view-product-modal/view-product-modal.component'; 

// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDeleteOrderModalComponent } from './components/orders/confirm-delete-order-modal/confirm-delete-order-modal.component';
import { ConfirmCancelOrderModalComponent } from './components/orders/confirm-cancel-order-modal/confirm-cancel-order-modal.component';
import { ViewOrderModalComponent } from './components/orders/view-order-modal/view-order-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OrderProductModalComponent } from './components/products/order-product-modal/order-product-modal.component'; // Add this line

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
    NotificationComponent,
    AddProductModalComponent,
    EditProductModalComponent,
    ConfirmDeleteModalComponent,
    ViewProductModalComponent,
    ConfirmDeleteOrderModalComponent,
    ConfirmCancelOrderModalComponent,
    ViewOrderModalComponent,
    OrderProductModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    // Angular Material Modules
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule, 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}