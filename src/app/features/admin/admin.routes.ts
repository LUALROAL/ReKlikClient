import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { AdminGuard } from '../../core/auth/guards/adminGuard';
import { AuthGuard } from '../../core/auth/guards/auth.guard';
import { ProductsListComponent } from '../products/components/products-list/products-list.component';
import { ProductFormComponent } from '../products/components/product-form/product-form.component';
import { ProductDetailComponent } from '../products/components/product-detail/product-detail.component';

import { CompaniesListComponent } from '../companies/components/companies-list/companies-list.component';
import { CompanyFormComponent } from '../companies/components/company-form/company-form.component';
import { CompanyDetailComponent } from '../companies/components/company-detail/company-detail.component';
import path from 'path';
import { ProductCodeGeneratorComponent } from '../products/components/product-code-generator/product-code-generator.component';
import { CodesListComponent } from '../products/components/codes-list/codes-list.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'admin-dashboard',
        canActivate: [AuthGuard, AdminGuard],
        loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
      {
        path: 'perfil',
        canActivate: [AuthGuard, AdminGuard],
        loadComponent: () => import('./components/admin-profile/admin-profile.component').then(m => m.AdminProfileComponent),
      },
      {
        path: 'empresas',
        canActivate: [AuthGuard, AdminGuard],
        children: [
          {
            path: '',
            component: CompaniesListComponent,
            pathMatch: 'full'
          },
          {
            path: 'new',
            component: CompanyFormComponent
          },
          {
            path: 'edit/:id',
            component: CompanyFormComponent
          },
           {
            path: 'detalles/:id',
            component: CompanyDetailComponent
          }
        ]
      },
      {
        path: 'productos',
        canActivate: [AuthGuard, AdminGuard],
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
          // {
          //   path: 'generar-codigos',
          //   component: ProductCodeGeneratorComponent
          // },
          // {
          //   path: 'ver-codigos',
          //   component: CodesListComponent
          // }

        ]
      },
      {
        path: 'generar-codigos',
          canActivate: [AuthGuard, AdminGuard],
        children: [
          {
            path: '',
            component: ProductCodeGeneratorComponent,
            pathMatch: 'full'
          },
          {
            path: 'ver-codigos',
            component: CodesListComponent
          }
        ]
      }
    ]
  }
];
