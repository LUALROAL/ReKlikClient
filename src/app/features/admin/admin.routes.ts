import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { AdminGuard } from '../../core/auth/guards/adminGuard';
import { AuthGuard } from '../../core/auth/guards/auth.guard';
import { ProductsListComponent } from '../products/components/products-list/products-list.component';
import { ProductFormComponent } from '../products/components/product-form/product-form.component';
import { ProductDetailComponent } from '../products/components/product-detail/product-detail.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'admin-dashboard',
        loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./components/admin-profile/admin-profile.component').then(m => m.AdminProfileComponent),
      },
      {
        path: 'productos',
        children: [
            {
                path: '',
                component: ProductsListComponent,
                pathMatch: 'full'
            },
            {
                path: 'new',
                component: ProductFormComponent
            },
            {
                path: 'edit/:id',
                component: ProductFormComponent
            },
            {
                path: 'detalles/:id',
                component: ProductDetailComponent
            }
        ]
      }
    ]
  }
];