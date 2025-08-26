import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AdminSidenavComponent } from '../../features/admin/components/admin-sidenav/admin-sidenav.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, AdminSidenavComponent, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  sidebarOpen = true;
  currentUser: any = null;
  private userUpdateSubscription!: Subscription;

  constructor(private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    // Suscribirse a los cambios del usuario
    this.userUpdateSubscription = this.authService.userUpdated$.subscribe(updatedUser => {
      if (updatedUser) {
        this.currentUser = updatedUser;
        console.log('Usuario actualizado en layout:', updatedUser);
      }
    });
  }

  ngOnDestroy() {
    // Limpiar la suscripción al destruir el componente
    if (this.userUpdateSubscription) {
      this.userUpdateSubscription.unsubscribe();
    }
  }



  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
