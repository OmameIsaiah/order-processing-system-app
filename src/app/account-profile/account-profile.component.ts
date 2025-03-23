import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css'],
})
export class AccountProfileComponent implements OnInit {
  isLoading = false;
  userProfile: any = null;
  isEditingName = false;
  updatedName: string = '';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get(`${this.configService.ACCOUNT_SERVICE_BASE_URL}/profile`, { headers })
      .subscribe(
        (response: any) => {
          this.userProfile = response.data;
          this.updatedName = this.userProfile.name; 
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.notificationService.showNotification(
            error.error.message || 'Failed to load user profile',
            'error'
          );
        }
      );
  }

  toggleEditName(): void {
    this.isEditingName = !this.isEditingName;
  }

  onUpdateProfile(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = {
      name: this.updatedName,
    };

    this.http
      .put(`${this.configService.ACCOUNT_SERVICE_BASE_URL}/profile/update`, payload, { headers })
      .subscribe(
        (response: any) => {
          this.notificationService.showNotification(response.message, 'success');
          this.userProfile.name = this.updatedName; // Update the displayed name
          this.isEditingName = false; // Exit edit mode
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.notificationService.showNotification(
            error.error.message || 'Failed to update profile',
            'error'
          );
        }
      );
  }
}