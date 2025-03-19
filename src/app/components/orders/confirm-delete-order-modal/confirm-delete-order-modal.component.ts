import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-confirm-delete-order-modal',
  templateUrl: './confirm-delete-order-modal.component.html',
  styleUrls: ['./confirm-delete-order-modal.component.css'],
})
export class ConfirmDeleteOrderModalComponent {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ConfirmDeleteOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirmDelete(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .delete(`http://localhost:2003/order-service/api/v1/order?orderUuid=${this.data.orderUuid}`, { headers })
      .subscribe(
        (response: any) => {
          this.notificationService.showNotification('Order deleted successfully', 'success');
          this.dialogRef.close(true); // Close the modal and return true to indicate success
        },
        (error) => {
          this.notificationService.showNotification(
            error.error.message || 'Failed to delete order',
            'error'
          );
        }
      );
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the modal without deleting
  }
}