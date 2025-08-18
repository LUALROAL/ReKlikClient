import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '', // Ruta base /admin-dashboard
    component: AdminDashboardComponent
  },
  // Puedes agregar más rutas hijas aquí:
  // {
  //   path: 'users',
  //   loadComponent: () => import('./admin-users/admin-users.component').then(m => m.AdminUsersComponent)
  // }
];
