import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-product-modal',
  templateUrl: './view-product-modal.component.html',
  styleUrls: ['./view-product-modal.component.css'],
})
export class ViewProductModalComponent {
  product: any;

  constructor(
    public dialogRef: MatDialogRef<ViewProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Received product data:', data); // Debugging: Log the data
    this.product = data.product; // Assign the product data
  }

  onClose(): void {
    this.dialogRef.close();
  }
}