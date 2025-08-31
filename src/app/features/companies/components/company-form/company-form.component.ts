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

  onSubmit(): void {
    if (this.companyForm.invalid) {
      this.messageService.showWarning('Advertencia', 'Por favor complete todos los campos requeridos');
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;

    if (this.isEditMode && this.companyId) {
      const companyData: Company = { id: this.companyId, ...this.companyForm.value };
      this.companyService.updateCompany(this.companyId, companyData).subscribe({
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
      const companyData: CompanyCreateDTO = this.companyForm.value;
      this.companyService.createCompany(companyData).subscribe({
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
