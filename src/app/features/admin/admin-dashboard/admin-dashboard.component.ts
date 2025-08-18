import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('materialsChart') materialsChartRef!: ElementRef;

  timeRange: string = 'month';
  stats: any = {
    total_users: 1243,
    recycler_users: 342,
    citizen_users: 901,
    total_products: 876,
    total_codes: 12456,
    total_scans: 5432,
    recycling_scans: 3210,
    first_scans: 2222,
    total_companies: 45,
    avg_products_per_company: 19
  };

  topCompanies = [
    { name: 'EcoPack', products: 124 },
    { name: 'GreenBottle', products: 98 },
    { name: 'RecyclaCorp', products: 87 },
    { name: 'BioMaterials', products: 76 },
    { name: 'EcoFriendly Inc', products: 65 }
  ];

  recentScans = [
    {
      scanned_at: new Date(),
      user_name: 'María González',
      product_name: 'Botella PET 500ml',
      company_name: 'EcoPack',
      scan_type: 'reciclaje',
      scan_city: 'Madrid',
      scan_country: 'España'
    },
    {
      scanned_at: new Date(Date.now() - 3600000),
      user_name: 'Punto Acopio Central',
      product_name: 'Lata aluminio',
      company_name: 'GreenBottle',
      scan_type: 'reciclaje',
      scan_city: 'Barcelona',
      scan_country: 'España'
    },
    {
      scanned_at: new Date(Date.now() - 7200000),
      user_name: 'Carlos Ruiz',
      product_name: 'Botella vidrio',
      company_name: 'RecyclaCorp',
      scan_type: 'primero',
      scan_city: 'Valencia',
      scan_country: 'España'
    },
    {
      scanned_at: new Date(Date.now() - 10800000),
      user_name: 'Ana Martínez',
      product_name: 'Caja cartón',
      company_name: 'BioMaterials',
      scan_type: 'otros',
      scan_city: 'Sevilla',
      scan_country: 'España'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    console.log('AdminDashboardComponent cargado correctamente');
    // Aquí iría la llamada a tu API para obtener los datos reales
    // this.loadDashboardData();
  }

  ngAfterViewInit() {
    this.renderMaterialsChart();
  }

  renderMaterialsChart() {
    const ctx = this.materialsChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['PET', 'Vidrio', 'Cartón', 'Aluminio', 'Papel', 'Plástico', 'Metal', 'Otros'],
        datasets: [{
          data: [1250, 980, 760, 540, 430, 320, 210, 150],
          backgroundColor: [
            '#4CAF50',
            '#2196F3',
            '#FFC107',
            '#FF5722',
            '#9C27B0',
            '#607D8B',
            '#795548',
            '#E91E63'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Materiales reciclados',
            font: {
              size: 16
            }
          }
        }
      }
    });
  }

  navigateTo(destination: string) {
    console.log(`Navegando a ${destination}`);
    // Aquí iría la navegación real a la sección correspondiente
    // this.router.navigate([`/admin/${destination}`]);
  }

   logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
