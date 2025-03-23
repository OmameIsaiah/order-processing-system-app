import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-role-dialog',
  template: `
    <h2 mat-dialog-title>Add New Role</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Role Name</mat-label>
        <input matInput [(ngModel)]="roleName" required>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Role Description</mat-label>
        <textarea matInput [(ngModel)]="roleDescription" required></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Permissions</mat-label>
        <mat-select [(ngModel)]="selectedPermissions" multiple required>
          <mat-option *ngFor="let permission of permissions" [value]="permission">
            {{ permission }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <div class="button-container">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button (click)="onAdd()" [disabled]="!roleName || !roleDescription || selectedPermissions.length === 0">Add</button>
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
export class AddRoleDialogComponent {
  roleName: string = '';
  roleDescription: string = '';
  selectedPermissions: string[] = [];
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

  constructor(private dialogRef: MatDialogRef<AddRoleDialogComponent>) { }

  onCancel() {
    this.dialogRef.close();
  }

  onAdd() {
    const role = {
      roleName: this.roleName,
      description: this.roleDescription,
      permissions: this.selectedPermissions
    };
    this.dialogRef.close(role);
  }
}