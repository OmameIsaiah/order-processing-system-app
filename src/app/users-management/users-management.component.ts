import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { ConfigService } from 'src/app/services/config.service';
import { DeleteUserDialogComponent } from '../components/user-management/delete-user-dialog/delete-user-dialog.component';
import { UserDetailsDialogComponent } from '../components/user-management/user-details-dialog/user-details-dialog.component';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'userType', 'lastLogin', 'actions'];
  searchKeyword: string = '';
  selectedUserType: string = '';
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  // Fetch all users
  fetchUsers() {
    this.isLoading = true;
    const url = `${this.configService.ACCOUNT_SERVICE_MANAGEMENT_BASE_URL}/users/management/find-all?page=0&size=50`;
    this.http.get(url).subscribe({
      next: (response: any) => {
        this.users = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showNotification(
          error.error.message || 'Failed to fetch users',
          'error'
        );
      }
    });
  }

  // Search users by keyword
  searchUsers() {
    if (!this.searchKeyword) {
      this.fetchUsers();
      return;
    }

    this.isLoading = true;
    const url = `${this.configService.ACCOUNT_SERVICE_MANAGEMENT_BASE_URL}/users/management/search?keyword=${this.searchKeyword}`;
    this.http.get(url).subscribe({
      next: (response: any) => {
        this.users = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showNotification(
          error.error.message || 'Failed to search users',
          'error'
        );
      }
    });
  }

  // Filter users by user type
  filterUsers() {
    if (!this.selectedUserType) {
      this.fetchUsers();
      return;
    }

    this.isLoading = true;
    const url = `${this.configService.ACCOUNT_SERVICE_MANAGEMENT_BASE_URL}/users/management/filter?page=0&size=50&userType=${this.selectedUserType}`;
    this.http.get(url).subscribe({
      next: (response: any) => {
        this.users = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showNotification(
          error.error.message || 'Failed to filter users',
          'error'
        );
      }
    });
  }

  // Open delete user confirmation dialog
  openDeleteUserDialog(userId: string) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      data: { userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  // Delete a user
  deleteUser(userId: string) {
    const url = `${this.configService.ACCOUNT_SERVICE_MANAGEMENT_BASE_URL}/users/management/delete/${userId}`;
    this.http.delete(url).subscribe({
      next: (response: any) => {
        this.notificationService.showNotification(
          response.message || 'User deleted successfully',
          'success'
        );
        this.fetchUsers(); // Refresh the users list
      },
      error: (error) => {
        this.notificationService.showNotification(
          error.error.message || 'Failed to delete user',
          'error'
        );
      }
    });
  }

  // Open user details dialog
  openUserDetailsDialog(user: any) {
    this.dialog.open(UserDetailsDialogComponent, {
      width: '500px',
      data: user
    });
  }
}