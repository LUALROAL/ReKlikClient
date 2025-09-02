// company-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModalService } from '../../../../core/auth/services/message-modal.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { MessageModalComponent } from '../../../../shared/components/message-modal/message-modal.component';
import { CompanyService } from '../../services/company.service';
import { Company, CompanyCreateDTO } from '../../models/company.model';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent, MessageModalComponent],
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  companyForm!: FormGroup;
  isEditMode = false;
  companyId?: number;
  loading = false;
  submitting = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      contactPerson: [''],
      phone: [''],
      address: ['']
    });
  }

  checkEditMode(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.companyId = +params['id'];
        this.loadCompany(this.companyId);
      }
    });
  }

  loadCompany(id: number): void {
    this.loading = true;
    this.companyService.getCompany(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.companyForm.patchValue(response.data);
          if (response.data.imageUrl) {
            this.imagePreview = response.data.imageUrl;
          }
        } else {
          this.messageService.showError('Error', response.message || 'No se pudo cargar la compañía');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading company:', error);
        this.messageService.showError('Error', 'No se pudo cargar la compañía');
        this.loading = false;
      }
    });
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      this.messageService.showWarning('Advertencia', 'Por favor complete todos los campos requeridos');
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;

    const formData = new FormData();
    Object.keys(this.companyForm.value).forEach(key => {
      formData.append(key, this.companyForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditMode && this.companyId) {
      formData.append('id', this.companyId.toString());
      this.companyService.updateCompany(this.companyId, formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.handleSuccess('Compañía actualizada correctamente');
          } else {
            this.handleError(response.message || 'Error al actualizar la compañía');
          }
        },
        error: (error) => {
          this.handleError(error.error?.message || 'Error al actualizar la compañía');
        }
      });
    } else {
      this.companyService.createCompany(formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.handleSuccess('Compañía creada correctamente');
          } else {
            this.handleError(response.message || 'Error al crear la compañía');
          }
        },
        error: (error) => {
          this.handleError(error.error?.message || 'Error al crear la compañía');
        }
      });
    }
  }

  private handleSuccess(message: string): void {
    this.submitting = false;
    this.messageService.showSuccess('Éxito', message);
    this.router.navigate(['/admin/empresas']);
  }

  private handleError(errorMessage: string): void {
    this.submitting = false;
    this.messageService.showError('Error', errorMessage);
  }

  private markFormGroupTouched(): void {
    Object.values(this.companyForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/empresas']);
  }
}
