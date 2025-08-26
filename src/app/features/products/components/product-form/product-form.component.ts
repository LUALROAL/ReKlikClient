import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModalService } from '../../../../core/auth/services/message-modal.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { MessageModalComponent } from '../../../../shared/components/message-modal/message-modal.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports:  [CommonModule, ReactiveFormsModule, LoadingComponent, MessageModalComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId?: number;
  loading = false;
  submitting = false;

  // Material types for dropdown
  materialTypes = ['PET', 'vidrio', 'carton', 'aluminio', 'papel', 'plastico', 'metal', 'otros'];

  // Modal properties
  modalVisible = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' | 'info' | 'warning' = 'info';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      companyId: ['', [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      brand: ['', Validators.required],
      description: [''],
      materialType: ['', Validators.required],
      weight: [null],
      recyclable: [true],
      recyclingInstructions: [''],
      imageUrl: ['']
    });
  }

  checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.messageService.showError('Error', 'No se pudo cargar el producto');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.messageService.showWarning('Advertencia', 'Por favor complete todos los campos requeridos');
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    const productData = this.productForm.value;

    if (this.isEditMode && this.productId) {
      // Update existing product
      const updateData = { ...productData, id: this.productId };
      this.productService.updateProduct(this.productId, updateData).subscribe({
        next: (response: any) => {
          this.handleSuccess(response, 'Producto actualizado correctamente');
        },
        error: (error) => {
          this.handleError(error, 'actualizar');
        }
      });
    } else {
      // Create new product
      this.productService.createProduct(productData).subscribe({
        next: (response: any) => {
          this.handleSuccess(response, 'Producto creado correctamente');
        },
        error: (error) => {
          this.handleError(error, 'crear');
        }
      });
    }
  }

  private handleSuccess(response: any, defaultMessage: string): void {
    this.submitting = false;
    const message = response.message || defaultMessage;
    this.messageService.showSuccess('Éxito', message);

    // Redirect to products list after a short delay
    setTimeout(() => {
      this.router.navigate(['/admin/products']);
    }, 1500);
  }

  private handleError(error: any, action: string): void {
    this.submitting = false;
    console.error(`Error ${action} product:`, error);
    const errorMessage = error.error?.message || `Error al ${action} el producto`;
    this.messageService.showError('Error', errorMessage);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key)?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/products']);
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
