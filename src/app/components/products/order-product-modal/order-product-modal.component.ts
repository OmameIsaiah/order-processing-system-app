import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-order-product-modal',
  templateUrl: './order-product-modal.component.html',
  styleUrls: ['./order-product-modal.component.css'],
})
export class OrderProductModalComponent {
  quantity: number = 1;
  orderUuid: string | null = null; // Store the order UUID after successful placement
  isOrderPlaced: boolean = false; // Track if the order is successfully placed

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<OrderProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onOrder(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = {
      productUuid: this.data.product.uuid,
      quantity: this.quantity,
    };

    this.http
      .post('http://localhost:2003/order-service/api/v1/order', payload, { headers })
      .subscribe(
        (response: any) => {
          this.notificationService.showNotification('Order placed successfully', 'success');
          this.orderUuid = response.data.orderUuid; // Store the order UUID
          this.isOrderPlaced = true; // Show the confirm/cancel buttons
        },
        (error) => {
          this.notificationService.showNotification(
            error.error.message || 'Failed to place order',
            'error'
          );
        }
      );
  }

  onConfirmOrder(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = {
      orderUuid: this.orderUuid,
    };

    this.http
      .post('http://localhost:2003/order-service/api/v1/order/confirm', payload, { headers })
      .subscribe(
        (response: any) => {
          this.notificationService.showNotification('Order confirmed successfully', 'success');
          this.dialogRef.close(true); // Close the modal and return true to indicate success
        },
        (error) => {
          this.notificationService.showNotification(
            error.error.message || 'Failed to confirm order',
            'error'
          );
        }
      );
  }

  onCancelOrder(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = {
      orderUuid: this.orderUuid,
    };

    this.http
      .post('http://localhost:2003/order-service/api/v1/order/cancel', payload, { headers })
      .subscribe(
        (response: any) => {
          this.notificationService.showNotification('Order canceled successfully', 'success');
          this.dialogRef.close(true); // Close the modal and return true to indicate success
        },
        (error) => {
          this.notificationService.showNotification(
            error.error.message || 'Failed to cancel order',
            'error'
          );
        }
      );
  }

  onClose(): void {
    this.dialogRef.close(false); // Close the modal without confirming or canceling
  }
}