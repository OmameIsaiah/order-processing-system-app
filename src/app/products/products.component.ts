import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductModalComponent } from '../components/products/add-product-modal/add-product-modal.component';
import { EditProductModalComponent } from '../components/products/edit-product-modal/edit-product-modal.component';
import { ConfirmDeleteModalComponent } from '../components/products/confirm-delete-modal/confirm-delete-modal.component';
import { ViewProductModalComponent } from '../components/products/view-product-modal/view-product-modal.component';
import { OrderProductModalComponent } from '../components/products/order-product-modal/order-product-modal.component'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = false;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get('http://localhost:2003/order-service/api/v1/products?page=0&size=50', { headers })
      .subscribe(
        (response: any) => {
          this.products = response.data;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.notificationService.showNotification(
            error.error.message || 'Failed to load products',
            'error'
          );
        }
      );
  }

  // products.component.ts
  openAddProductModal(): void {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts(); // Reload products after adding
      }
    });
  }

  openEditProductModal(product: any): void {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '400px',
      data: { product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts(); // Reload products after updating
      }
    });
  }

  openDeleteConfirmationModal(productUuid: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '300px',
      data: { productUuid },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts(); // Reload products after deleting
      }
    });
  }

  openViewProductModal(product: any): void {
    this.dialog.open(ViewProductModalComponent, {
      width: '400px',
      data: { product }, // Pass the product data
    });
  }
  // Add this method
  openOrderProductModal(product: any): void {
    const dialogRef = this.dialog.open(OrderProductModalComponent, {
      width: '400px',
      data: { product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts(); // Reload products after ordering
      }
    });
  }

}