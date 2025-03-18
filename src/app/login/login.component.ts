import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent loaded'); // Add this line
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.data.jwtTokenData.authorizationToken);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}