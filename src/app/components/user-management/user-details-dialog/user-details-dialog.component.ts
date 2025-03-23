import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details-dialog',
  template: `
    <h2 mat-dialog-title>User Details</h2>
    <mat-dialog-content>
      <p><strong>Name:</strong> {{ data.name }}</p>
      <p><strong>Email:</strong> {{ data.email }}</p>
      <p><strong>User Type:</strong> {{ data.userType }}</p>
      <p><strong>Last Login:</strong> {{ data.lastLogin }}</p>
      <p><strong>Roles:</strong> {{ data.roles.join(', ') }}</p>
      <p><strong>Permissions:</strong> {{ data.permissions.join(', ') }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class UserDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}