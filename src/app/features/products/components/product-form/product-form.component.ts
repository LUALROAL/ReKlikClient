import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModalService } from '../../../../core/auth/services/message-modal.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../shared/loading/loading.component';

import { ProductCreate } from '../../models/product-create.model';
import { ProductUpdate } from '../../models/product-update.model';
import { MessageModalComponent } from '../../../../shared/components/message-modal/message-modal.component';
import { CompanyService } from '../../../companies/services/company.service';
import { Company } from '../../../companies/models/company.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports:  [CommonModule, ReactiveFormsModule, LoadingComponent, MessageModalComponent],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId?: number;
  loading = false;
  submitting = false;
  companies: Company[] = [];

  materialTypes = ['PET', 'vidrio', 'carton', 'aluminio', 'papel', 'plastico', 'metal', 'otros'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCompanies();
    this.checkEditMode();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      companyId: ['', [Validators.required, Validators.min(1)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      brand: [''],
      description: [''],
      materialType: ['', Validators.required],
      weight: [null],
      recyclable: [true],
      recyclingInstructions: [''],
      imageUrl: ['']
    });
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (response) => {
        if (response.success) {
          this.companies = response.data;
        } else {
          console.error('Error loading companies:', response.message);
          this.messageService.showError('Error', 'No se pudieron cargar las empresas');
        }
      },
      error: (error) => {
        console.error('Error loading companies:', error);
        this.messageService.showError('Error', 'No se pudieron cargar las empresas');
      }
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

    if (this.isEditMode && this.productId) {
      const productData: ProductUpdate = { id: this.productId, ...this.productForm.value };
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: () => {
          this.handleSuccess('Producto actualizado correctamente');
        },
        error: (error) => {
          this.handleError(error, 'actualizar');
        }
      });
    } else {
      const productData: ProductCreate = this.productForm.value;
      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.handleSuccess('Producto creado correctamente');
        },
        error: (error) => {
          this.handleError(error, 'crear');
        }
      });
    }
  }

  private handleSuccess(message: string): void {
    this.submitting = false;
    this.messageService.showSuccess('Éxito', message);
    this.router.navigate(['/admin/productos']);
  }

  private handleError(error: any, action: string): void {
    this.submitting = false;
    console.error(`Error ${action} product:`, error);
    const errorMessage = error.error?.message || `Error al ${action} el producto`;
    this.messageService.showError('Error', errorMessage);
  }

  private markFormGroupTouched(): void {
    Object.values(this.productForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/productos']);
  }
}
