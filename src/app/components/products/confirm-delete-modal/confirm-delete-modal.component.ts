import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css'],
})
export class ConfirmDeleteModalComponent {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onConfirmDelete(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .delete(`http://localhost:2003/order-service/api/v1/product?productUuid=${this.data.productUuid}`, { headers })
      .subscribe(
        (response: any) => {
          this.notificationService.showNotification('Product deleted successfully', 'success');
          this.dialogRef.close(true); // Close the modal and return true to indicate success
        },
        (error) => {
          this.notificationService.showNotification(
            error.error.message || 'Failed to delete product',
            'error'
          );
        }
      );
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the modal without deleting
  }
}