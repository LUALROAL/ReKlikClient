import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

 ngOnInit() {
  const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
    if (this.user.userType === 'administrador' && !this.router.url.includes('admin-dashboard')) {
      this.router.navigate(['/admin-dashboard']);
    }
  }
}

    logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
