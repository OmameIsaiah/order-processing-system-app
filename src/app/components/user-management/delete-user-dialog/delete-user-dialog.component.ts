import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-dialog',
  template: `
    <h2 mat-dialog-title>Delete User</h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete this user?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <div class="button-container">
        <button mat-button (click)="onDelete()" color="warn">Delete</button>
        <button mat-button (click)="onCancel()">Cancel</button>
      </div>
    </mat-dialog-actions>
  `,
  styles: [`
    .button-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  `]
})
export class DeleteUserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>
  ) { }

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.dialogRef.close(true);
  }
}