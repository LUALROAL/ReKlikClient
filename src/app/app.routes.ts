import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { AdminGuard } from './core/auth/guards/adminGuard';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard, AdminGuard]
  }
];
