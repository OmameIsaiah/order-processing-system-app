import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationService } from './notification.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private baseUrl = 'http://localhost:2001/account-service/api/v1/users';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private notificationService: NotificationService
  ) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Display the error message from the backend
    if (error.error && error.error.message) {
      this.notificationService.showNotification(error.error.message, 'error');
    } else {
      // Fallback message if no specific error message is provided
      this.notificationService.showNotification('Oops! Unable to process request at the moment, please try again.', 'error');
    }
    return throwError(error);
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.configService.ACCOUNT_SERVICE_BASE_URL}/entrance/signin`, { email, password })
      .pipe(catchError((error) => this.handleError(error)));
  }

  signup(name: string, email: string, password: string, userType: string): Observable<any> {
    return this.http
      .post(`${this.configService.ACCOUNT_SERVICE_BASE_URL}/onboarding/signup`, { name, email, password, userType })
      .pipe(catchError((error) => this.handleError(error)));
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http
      .post(`${this.configService.ACCOUNT_SERVICE_BASE_URL}/onboarding/verify/otp`, { email, otp })
      .pipe(catchError((error) => this.handleError(error)));
  }

  resendOtp(email: string): Observable<any> {
    return this.http
      .post(`${this.configService.ACCOUNT_SERVICE_BASE_URL}/onboarding/send/otp`, { email })
      .pipe(catchError((error) => this.handleError(error)));
  }
  // login(email: string, password: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/entrance/signin`, { email, password });
  // }

  // signup(name: string, email: string, password: string, userType: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/onboarding/signup`, { name, email, password, userType });
  // }

  // verifyOtp(email: string, otp: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/onboarding/verify/otp`, { email, otp });
  // }

  // resendOtp(email: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/onboarding/send/otp`, { email });
  // }
}