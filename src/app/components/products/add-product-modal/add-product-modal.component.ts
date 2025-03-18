import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent {
  product = {
    name: '',
    quantity: 0,
    unitPrice: 0,
  };

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onAddProduct(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post('http://localhost:2003/order-service/api/v1/product', this.product, { headers })
      .subscribe(
        (response: any) => {
          this.notificationService.showNotification('Product added successfully', 'success');
          this.dialogRef.close(true); // Close the modal and return true to indicate success
        },
        (error) => {
          this.notificationService.showNotification(
            error.error.message || 'Failed to add product',
            'error'
          );
        }
      );
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the modal without adding
  }
}