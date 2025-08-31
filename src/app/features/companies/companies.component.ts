
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Company, CompanyCreateDTO } from './models/company.model';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  private fb = inject(FormBuilder);

  companies: Company[] = [];
  isModalOpen = false;
  isEditing = false;
  companyForm: FormGroup;
  currentCompanyId: number | null = null;

  constructor(
     private companyService: CompanyService,
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactPerson: [''],
      phone: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(response => {
      if (response.success) {
        this.companies = response.data;
      }
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.currentCompanyId = null;
    this.companyForm.reset();
    this.isModalOpen = true;
  }

  openEditModal(company: Company): void {
    this.isEditing = true;
    this.currentCompanyId = company.id;
    this.companyForm.patchValue(company);
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveCompany(): void {
    if (this.companyForm.invalid) {
      return;
    }

    if (this.isEditing && this.currentCompanyId) {
      const updatedCompany: Company = { id: this.currentCompanyId, ...this.companyForm.value };
      this.companyService.updateCompany(this.currentCompanyId, updatedCompany).subscribe(() => {
        this.loadCompanies();
        this.closeModal();
      });
    } else {
      const newCompany: CompanyCreateDTO = this.companyForm.value;
      this.companyService.createCompany(newCompany).subscribe(() => {
        this.loadCompanies();
        this.closeModal();
      });
    }
  }

  deleteCompany(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta compañía?')) {
      this.companyService.deleteCompany(id).subscribe(() => {
        this.loadCompanies();
      });
    }
  }
}
