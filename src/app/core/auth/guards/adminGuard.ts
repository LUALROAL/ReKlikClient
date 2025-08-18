import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.authService.getCurrentUser();
    console.log('AdminGuard - Usuario:', user);

    if (user && user.userType === 'administrador') {
      console.log('AdminGuard - Acceso permitido');
      return true;
    }

    console.log('AdminGuard - Redirigiendo a dashboard');
    return this.router.parseUrl('/dashboard');
  }
}
