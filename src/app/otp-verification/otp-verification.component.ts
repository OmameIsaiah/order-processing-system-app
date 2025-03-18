import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  email: string = '';
  otp: string = '';
  timer: number = 60;
  isResendDisabled: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { email: string };
    this.email = state?.email || '';
    this.startTimer();
  }

  onSubmit(): void {
    this.authService.verifyOtp(this.email, this.otp).subscribe(
      (response) => {
        console.log('OTP verification successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('OTP verification failed', error);
      }
    );
  }

  onResendOtp(): void {
    this.authService.resendOtp(this.email).subscribe(
      (response) => {
        console.log('OTP resent successfully', response);
        this.startTimer();
      },
      (error) => {
        console.error('Failed to resend OTP', error);
      }
    );
  }

  startTimer(): void {
    this.timer = 60;
    this.isResendDisabled = true;
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(interval);
        this.isResendDisabled = false;
      }
    }, 1000);
  }
}