import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MessageModalService } from '../../../../core/auth/services/message-modal.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { MessageModalComponent } from '../../../../shared/components/message-modal/message-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, MessageModalComponent, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = false;
  searchTerm = '';
  materialFilter = '';
  recyclableFilter = 'all';

  // Material types for filter
  materialTypes = ['PET', 'vidrio', 'carton', 'aluminio', 'papel', 'plastico', 'metal', 'otros'];

  // Modal properties
  modalVisible = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' | 'info' | 'warning' = 'info';

  constructor(
    private productService: ProductService,
    private messageService: MessageModalService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
  this.loading = true;
  this.productService.getAllProducts().subscribe({
    next: (products) => {
      console.log('Productos recibidos:', products); // Para debug
      this.products = products;
      this.filteredProducts = products;
      this.loading = false;
    },
    error: (error) => {
      console.error('Error loading products:', error);
      this.messageService.showError('Error', 'No se pudieron cargar los productos');
      this.loading = false;
      this.products = [];
      this.filteredProducts = [];
    }
  });
}
  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesMaterial = !this.materialFilter || product.materialType === this.materialFilter;

      const matchesRecyclable = this.recyclableFilter === 'all' ||
        (this.recyclableFilter === 'recyclable' && product.recyclable) ||
        (this.recyclableFilter === 'non-recyclable' && !product.recyclable);

      return matchesSearch && matchesMaterial && matchesRecyclable;
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response: any) => {
          this.messageService.showSuccess('Éxito', response.message || 'Producto eliminado correctamente');
          this.loadProducts();
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
