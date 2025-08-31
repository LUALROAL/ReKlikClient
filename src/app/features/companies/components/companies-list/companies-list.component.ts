// companies-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { MessageModalComponent } from '../../../../shared/components/message-modal/message-modal.component';
import { FormsModule } from '@angular/forms';
import { MessageModalService } from '../../../../core/auth/services/message-modal.service';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent, MessageModalComponent, FormsModule],
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  loading = false;
  searchTerm = '';
  contactPersonFilter = '';

  constructor(
    private companyService: CompanyService,
    private messageService: MessageModalService
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.loading = true;
    this.companyService.getCompanies().subscribe({
      next: (response) => {
        if (response.success) {
          this.companies = response.data || [];
          this.filteredCompanies = this.companies;
        } else {
          this.messageService.showError('Error', response.message || 'No se pudieron cargar las compañías');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading companies:', error);
        this.messageService.showError('Error', 'No se pudieron cargar las compañías');
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredCompanies = this.companies.filter(company => {
      const searchTermLower = this.searchTerm.toLowerCase();
      const matchesSearch = company.name.toLowerCase().includes(searchTermLower) ||
        company.email.toLowerCase().includes(searchTermLower);

      const matchesContactPerson = !this.contactPersonFilter ||
        (company.contactPerson && company.contactPerson.toLowerCase().includes(this.contactPersonFilter.toLowerCase()));

      return matchesSearch && matchesContactPerson;
    });
  }

  deleteCompany(id: number): void {
    this.messageService.showConfirmation('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar esta compañía?', () => {
      this.companyService.deleteCompany(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.showSuccess('Éxito', 'Compañía eliminada correctamente');
            this.loadCompanies();
          } else {
            this.messageService.showError('Error', response.message || 'Error al eliminar la compañía');
          }
        },
        error: (error) => {
          console.error('Error deleting company:', error);
          const errorMessage = error.error?.message || 'Error al eliminar la compañía';
          this.messageService.showError('Error', errorMessage);
        }
      });
    });
  }
}
