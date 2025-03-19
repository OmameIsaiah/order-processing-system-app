import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isDropdownOpen = false;

  constructor(private router: Router) { }

  onSignOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  reloadDashboard(): void {
    window.location.reload(); // Reload the dashboard
  }
}