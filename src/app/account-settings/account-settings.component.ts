import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleDialogComponent } from '../components/settings/add-role-dialog/add-role-dialog.component';
import { EditRoleDialogComponent } from '../components/settings/edit-role-dialog/edit-role-dialog.component';
import { DeleteRoleDialogComponent } from '../components/settings/delete-role-dialog/delete-role-dialog.component';
import { ConfigService } from '../services/config.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  isLoading = false;
  // Roles table data
  roles: any[] = [];
  displayedColumns: string[] = ['name', 'description', 'permissions', 'actions'];
  // Add Role Form Fields
  roleName: string = '';
  roleDescription: string = '';
  selectedPermissions: string[] = [];
  // List of permissions
  permissions: string[] = [
    "CAN_UPDATE_ROLE",
    "CAN_VIEW_USERS",
    "CAN_VIEW_ORDERS",
    "CAN_VIEW_PRODUCTS",
    "CAN_CANCEL_ORDER",
    "CAN_UPDATE_PRODUCT",
    "CAN_ORDER_PRODUCT",
    "CAN_DELETE_ROLE",
    "CAN_ADD_ROLE",
    "CAN_DELETE_PRODUCT",
    "CAN_SEARCH_PRODUCTS",
    "CAN_ADD_PRODUCT",
    "CAN_DELETE_USER"
  ];
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private notificationService: NotificationService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchRoles();
  }

  // Fetch roles from the API
  fetchRoles() {
    this.isLoading = true;
    this.http.get(`${this.configService.ACCOUNT_SERVICE_MANAGEMENT_BASE_URL}/roles`)
      .subscribe(
        (response: any) => {
          this.roles = response.data;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.notificationService.showNotification(
            error.error.message || 'Failed to load roles',
            'error'
          );
        }
      );
  }

  // Method to update password
  updatePassword() {
    const payload = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    };

    this.http.put(`${this.configService.ACCOUNT_SERVICE_MANAGEMENT_BASE_URL}/users/profile/update-password`, payload)
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          this.notificationService.showNotification(
            response.message || 'Awesome! Password updated successfully.',
            'success'
          );
          this.resetPasswordForm();
          //this.snackBar.open(response.message, 'Close', { duration: 3000 });
          //this.resetPasswordForm();
        },
        (error) => {
          this.isLoading = false;
          this.notificationService.showNotification(
            error.error.message || 'Oops! Failed to update password',
            'error'
          );
        }
      );
  }


  // Reset password form
  resetPasswordForm() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }

  // Open Add Role Dialog
  openAddRoleDialog() {
    const dialogRef = this.dialog.open(AddRoleDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addRole(result);
      }
    });
  }

  // Add a new role
  addRole(role: any) {
    this.http.post(`${this.configService.ACCOUNT_SERVICE_MANAGEMENT_BASE_URL}/roles`, role)
      .subscribe({
        next: (response: any) => {
          this.notificationService.showNotification(
            response.message || 'Awesome! Role added successfully.',
            'success'
          );
          this.fetchRoles(); // Refresh the roles list

        },
        error: (error) => {
          this.isLoading = false;
          this.notificationService.showNotification(
            error.error.message || 'Oops! Failed to add role.',
            'error'
          );
          //this.snackBar.open(error.error.message || 'Failed to add role', 'Close', { duration: 3000 });
        }
      });
  }

  // Open Edit Role Dialog
  openEditRoleDialog(role: any) {
    const dialogRef = this.dialog.open(EditRoleDialogComponent, {
      width: '500px',
      data: role
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editRole(result);
      }
    });
  }

  // Edit a role
  editRole(role: any) {
    // Prepare the request body with the correct property names
    const requestBody = {
      uuid: role.uuid, // Ensure the UUID is included
      roleName: role.name, // Rename 'name' to 'roleName'
      description: role.description,
      permissions: role.permissions
    };
  
    // Make the PUT request
    this.http.put(`${this.configService.ACCOUNT_SERVICE_MANAGEMENT_BASE_URL}/roles`, requestBody)
      .subscribe({
        next: (response: any) => {
          this.notificationService.showNotification(
            response.message || 'Awesome! Role updated successfully!',
            'success'
          );
          this.fetchRoles(); // Refresh the roles list
        },
        error: (error) => {
          this.notificationService.showNotification(
            error.error.message || 'Oops! Failed to update role. Please try again.',
            'error'
          );
        }
      });
  }

  // Open Delete Role Dialog
  openDeleteRoleDialog(roleId: string) {
    const dialogRef = this.dialog.open(DeleteRoleDialogComponent, {
      width: '400px',
      data: { roleId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRole(roleId);
      }
    });
  }

  // Delete a role
  deleteRole(roleId: string) {
    this.http.delete(`${this.configService.ACCOUNT_SERVICE_MANAGEMENT_BASE_URL}/roles/${roleId}`)
      .subscribe({
        next: (response: any) => {
          this.notificationService.showNotification(
            response.message || 'Awesome! Role deleted successfully!',
            'success'
          );
          this.fetchRoles(); // Refresh the roles list
        },
        error: (error) => {
          this.notificationService.showNotification(
            error.error.message || 'Oops! Failed to delete role.',
            'error'
          );
        }
      });
  }
}