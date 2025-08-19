import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./admin-profile/admin-profile.component').then(m => m.AdminProfileComponent)
      }
      // {
      //   path: 'usuarios',
      //   // loadComponent: () => import('./admin-users/admin-users.component').then(m => m.AdminUsersComponent)
      // },

      //   path: 'productos',
      //   // loadComponent: () => import('./admin-products/admin-products.component').then(m => m.AdminProductsComponent)
      // },


      // {
      //   path: 'empresas',
      //   // loadComponent: () => import('./admin-companies/admin-companies.component').then(m => m.AdminCompaniesComponent)
      // },

      // {
      //   path: 'escaneos',
      //   // loadComponent: () => import('./admin-scans/admin-scans.component').then(m => m.AdminScansComponent)
      // }

    ]
  }
];
