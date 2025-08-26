import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { AdminGuard } from '../../core/auth/guards/adminGuard';
import { AuthGuard } from '../../core/auth/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'admin-dashboard',
        loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
        canLoad: [AuthGuard, AdminGuard]
      },
      {
        path: 'perfil',
        loadComponent: () => import('./components/admin-profile/admin-profile.component').then(m => m.AdminProfileComponent),
        canLoad: [AuthGuard, AdminGuard]
      },
      {
        path: 'productos',
        loadComponent: () => import('../products/components/products-list/products-list.component').then(m => m.ProductsListComponent),
        canLoad: [AuthGuard, AdminGuard]
      }
      //   path: 'productos',
      //   // loadComponent: () => import('./admin-products/admin-products.component').then(m => m.AdminProductsComponent)
      // },

      // {
      //   path: 'usuarios',
      //   // loadComponent: () => import('./admin-users/admin-users.component').then(m => m.AdminUsersComponent)
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
