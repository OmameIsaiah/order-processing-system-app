import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-role-dialog',
  template: `
    <h2 mat-dialog-title>Edit Role</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Role Name</mat-label>
        <input matInput [(ngModel)]="role.name" required>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Role Description</mat-label>
        <textarea matInput [(ngModel)]="role.description" required></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Permissions</mat-label>
        <mat-select [(ngModel)]="role.permissions" multiple required>
          <mat-option *ngFor="let permission of permissions" [value]="permission">
            {{ permission }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <div class="button-container">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button (click)="onSave()" [disabled]="!role.name || !role.description || role.permissions.length === 0">Save</button>
      </div>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
    .button-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  `]
})
export class EditRoleDialogComponent {
  role: any;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditRoleDialogComponent>
  ) {
    this.role = { ...data };
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close(this.role);
  }
}