import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    // otras propiedades del usuario que devuelva tu backend
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  isAuthenticated = signal(false);
  currentUser = signal<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(response => {
        this.handleAuthentication(response);
      }),
      catchError(error => {
        this.handleLoginError(error);
        return throwError(() => error);
      })
    );
  }

 private handleAuthentication(response: LoginResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUser.set(response.user);
    this.isAuthenticated.set(true);
    this.router.navigate(['/dashboard']);
  }

  private handleLoginError(error: any): void {
    console.error('Login error:', error);
    // Puedes manejar diferentes tipos de errores aquí
    if (error.status === 401) {
      throw new Error('Credenciales inválidas');
    } else {
      throw new Error('Error en el servidor. Por favor intente más tarde.');
    }
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
