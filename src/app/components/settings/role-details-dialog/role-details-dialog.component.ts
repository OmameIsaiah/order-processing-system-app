import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-role-details-dialog',
  template: `
    <h2 mat-dialog-title>Role Details</h2>
    <mat-dialog-content>
      <p><strong>Name:</strong> {{ data.name }}</p>
      <p><strong>Description:</strong> {{ data.description }}</p>
      <p><strong>Permissions:</strong> {{ data.permissions.join(', ') }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class RoleDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}