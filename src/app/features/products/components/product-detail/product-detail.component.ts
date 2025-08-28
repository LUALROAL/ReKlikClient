import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageModalService } from '../../../../core/auth/services/message-modal.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { MessageModalComponent } from '../../../../shared/components/message-modal/message-modal.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, LoadingComponent, MessageModalComponent, RouterModule],
  templateUrl: './product-detail.component.html',
 styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  loading = false;

  // Modal properties
  modalVisible = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' | 'info' | 'warning' = 'info';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.loading = true;
    const productId = this.route.snapshot.params['id'];

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.messageService.showError('Error', 'No se pudo cargar el producto');
        this.loading = false;
        this.router.navigate(['/admin/products']);
      }
    });
  }

  deleteProduct(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: (response: any) => {
          this.messageService.showSuccess('Éxito', response.message || 'Producto eliminado correctamente');
          this.router.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          const errorMessage = error.error?.message || 'Error al eliminar el producto';
          this.messageService.showError('Error', errorMessage);
        }
      });
    }
  }

  showModal(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = type;
    this.modalVisible = true;
  }

  hideModal(): void {
    this.modalVisible = false;
  }
}
