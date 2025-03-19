import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteOrderModalComponent } from '../components/orders/confirm-delete-order-modal/confirm-delete-order-modal.component';
import { ConfirmCancelOrderModalComponent } from '../components/orders/confirm-cancel-order-modal/confirm-cancel-order-modal.component';
import { ViewOrderModalComponent } from '../components/orders/view-order-modal/view-order-modal.component';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  isLoading = false;
  currentPage = 0;
  pageSize = 10;
  totalRecords = 0;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get(`${this.configService.ORDER_SERVICE_BASE_URL}/orders?page=${this.currentPage}&size=${this.pageSize}`, { headers })
      .subscribe(
        (response: any) => {
          this.orders = response.data;
          this.totalRecords = response.meta.totalRecords;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.notificationService.showNotification(
            error.error.message || 'Failed to load orders',
            'error'
          );
        }
      );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }

  openDeleteOrderModal(orderUuid: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteOrderModalComponent, {
      width: '300px',
      data: { orderUuid },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadOrders(); // Reload orders after deleting
      }
    });
  }

  // orders.component.ts
openCancelOrderModal(orderUuid: string): void {
  const dialogRef = this.dialog.open(ConfirmCancelOrderModalComponent, {
    width: '300px',
    data: { orderUuid },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.loadOrders(); // Reload orders after canceling
    }
  });
}

openViewOrderModal(order: any): void {
  this.dialog.open(ViewOrderModalComponent, {
    width: '400px',
    data: { order },
  });
}
}