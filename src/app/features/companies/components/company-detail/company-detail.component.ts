// company-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageModalService } from '../../../../core/auth/services/message-modal.service';
import { CommonModule, DatePipe } from '@angular/common';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { MessageModalComponent } from '../../../../shared/components/message-modal/message-modal.component';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule, LoadingComponent, MessageModalComponent, RouterModule, DatePipe],
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  company!: Company;
  loading = false;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageModalService
  ) {}

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany(): void {
    this.loading = true;
    const companyId = this.route.snapshot.params['id'];

    this.companyService.getCompany(companyId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.company = response.data;
        } else {
          this.messageService.showError('Error', response.message || 'No se pudo cargar la compañía');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading company:', error);
        this.messageService.showError('Error', 'No se pudo cargar la compañía');
        this.loading = false;
        this.router.navigate(['/admin/companias']);
      }
    });
  }

  deleteCompany(): void {
    this.messageService.showConfirmation('Confirmar Eliminación', '¿Estás seguro de que deseas eliminar esta compañía?', () => {
      this.companyService.deleteCompany(this.company.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.showSuccess('Éxito', response.message || 'Compañía eliminada correctamente');
            this.router.navigate(['/admin/companias']);
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
