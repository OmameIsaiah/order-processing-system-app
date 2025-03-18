import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-order-modal',
  templateUrl: './view-order-modal.component.html',
  styleUrls: ['./view-order-modal.component.css'],
})
export class ViewOrderModalComponent {
  order: any;

  constructor(
    public dialogRef: MatDialogRef<ViewOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data.order; // Assign the order data
  }

  onClose(): void {
    this.dialogRef.close();
  }
}