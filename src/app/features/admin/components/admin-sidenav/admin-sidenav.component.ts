import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../core/auth/services/auth.service';

// Interfaz para los elementos del menú
export interface MenuItem {
  name: string;
  route: string;
  icon: SafeHtml;
  isActive?: boolean;
}

@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidenav.component.html',
  styleUrl: './admin-sidenav.component.scss'
})
export class AdminSidenavComponent implements OnInit {
  @Input() isOpen = true;
  currentUser: any = null;
  private userUpdateSubscription!: Subscription;
  // Definición de los elementos del menú usando la interfaz - CORREGIDO
  menuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = this.authService.getCurrentUser();
    }
    this.userUpdateSubscription = this.authService.userUpdated$.subscribe(updatedUser => {
      if (updatedUser) {
        this.currentUser = updatedUser;
        console.log('Usuario actualizado:', updatedUser);
      }
    });
    // Inicializar los items del menú con SafeHtml
    this.menuItems = [
      {
        name: 'Tablero',
        route: '/admin/admin-dashboard',
        icon: this.sanitizer.bypassSecurityTrustHtml('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />')
      },
      {
        name: 'Empresas',
        route: '/admin/empresas',
        icon: this.sanitizer.bypassSecurityTrustHtml('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />')
      },
      {
        name: 'productos',
        route: '/admin/productos',
        icon: this.sanitizer.bypassSecurityTrustHtml('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />')
      },
      {
        name: 'Generar Códigos',
        route: '/admin/productos/generar-codigos',
        icon: this.sanitizer.bypassSecurityTrustHtml('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>')
      },
      {
        name: 'Usuarios',
        route: '/admin/usuarios',
        icon: this.sanitizer.bypassSecurityTrustHtml('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />')
      },
      {
        name: 'Escaneos',
        route: '/admin/escaneos',
        icon: this.sanitizer.bypassSecurityTrustHtml('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />')
      },
      {
        name: 'Perfil',
        route: '/admin/perfil',
        icon: this.sanitizer.bypassSecurityTrustHtml('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />')
      }
    ];
  }

  ngOnDestroy() {
    // Limpiar la suscripción al destruir el componente
    if (this.userUpdateSubscription) {
      this.userUpdateSubscription.unsubscribe();
    }
  }

  // Método para manejar clics en elementos del menú (opcional)
  onMenuItemClick(menuItem: MenuItem) {
    console.log(`Navegando a: ${menuItem.name}`);
    // Aquí puedes agregar lógica adicional si es necesario
  }
}
