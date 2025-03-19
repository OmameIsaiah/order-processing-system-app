import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css'],
})
export class EditProductModalComponent {
  product: any;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product = { ...data.product }; // Copy the product data
  }

  onUpdateProduct(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Map uuid to productUuid in the payload
    const payload = {
      productUuid: this.product.uuid,
      name: this.product.name,
      quantity: this.product.quantity,
      unitPrice: this.product.unitPrice,
    };

    this.http
      .put('http://localhost:2003/order-service/api/v1/product', payload, { headers })
      .subscribe(
        (response: any) => {
          this.notificationService.showNotification('Product updated successfully', 'success');
          this.dialogRef.close(true); // Close the modal and return true to indicate success
        },
        (error) => {
          this.notificationService.showNotification(
            error.error.message || 'Failed to update product',
            'error'
          );
        }
      );
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the modal without updating
  }
}