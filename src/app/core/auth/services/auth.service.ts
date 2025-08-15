import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  isAuthenticated = signal(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.isAuthenticated.set(true);
        this.router.navigate(['/']);
      })
    );
  }

  register(userData: any) {
    return this.http.post(`${this.API_URL}/auth/register`, userData);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }

  checkAuthentication() {
    const token = localStorage.getItem('token');
    this.isAuthenticated.set(!!token);
    return this.isAuthenticated();
  }
}
