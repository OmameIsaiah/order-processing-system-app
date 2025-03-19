import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-confirm-cancel-order-modal',
  templateUrl: './confirm-cancel-order-modal.component.html',
  styleUrls: ['./confirm-cancel-order-modal.component.css'],
})
export class ConfirmCancelOrderModalComponent {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ConfirmCancelOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirmCancel(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const payload = {
      orderUuid: this.data.orderUuid,
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

  onCancel(): void {
    this.dialogRef.close(false); // Close the modal without canceling
  }
}