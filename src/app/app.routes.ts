import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { AdminGuard } from './core/auth/guards/adminGuard';
import { ADMIN_ROUTES } from './features/admin/admin.routes';

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
  //  {
  //   path: 'admin-dashboard',
  //   loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    // canActivate: [AuthGuard, AdminGuard] // Protegemos toda el área de admin

  // },
    {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  // {
  //   path: 'admin-dashboard',
  //   children: ADMIN_ROUTES, // Usamos las rutas definidas para admin
  // },
  { path: '**', redirectTo: '' }
];
