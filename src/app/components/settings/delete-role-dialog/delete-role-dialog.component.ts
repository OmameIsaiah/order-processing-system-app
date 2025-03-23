import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-role-dialog',
  template: `
    <h2 mat-dialog-title>Delete Role</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this role?</p>
    </mat-dialog-content>
    <mat-dialog-actions class="dialog-actions">
      <div class="button-container">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button (click)="onDelete()" color="warn">Delete</button>
      </div>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-actions {
      padding: 16px 24px; /* MatDialog default padding */
    }
    .button-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  `]
})
export class DeleteRoleDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteRoleDialogComponent>
  ) { }

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.dialogRef.close(true);
  }
}