import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  userType: string = 'ADMIN'; // Explicitly type as string

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.signup(this.name, this.email, this.password, this.userType).subscribe(
      (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/otp-verification'], { state: { email: this.email } });
      },
      (error) => {
        console.error('Signup failed', error);
      }
    );
  }
}