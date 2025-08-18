import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    userType: string;
    // otras propiedades del usuario que devuelva tu backend
  };
}
interface User {
  id: number;
  name: string;
  email: string;
  userType: string;
  phone: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  isAuthenticated = signal(false);
  currentUser = signal<any>(null);

  constructor(private http: HttpClient, private router: Router) { }

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

  const targetRoute = response.user.userType === 'administrador'
    ? '/admin-dashboard'
    : '/dashboard';

  // Delay mínimo para asegurar que Angular cargue Lazy Components
  setTimeout(() => {
    this.router.navigateByUrl(targetRoute).catch(err => {
      console.error('Error en navegación:', err);
      this.router.navigate(['/']); // fallback
    });
  }, 50); // 50ms suele ser suficiente
}

  //  método para obtener el usuario actual
  getCurrentUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
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

register(userData: any): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.API_URL}/auth/register`, userData).pipe(
    tap(response => {
      // Éxito → guardamos sesión/token
      this.handleAuthentication(response);
    }),
    catchError((error: HttpErrorResponse) => {
      // Error desde backend
      const backendMessage = error.error?.message || 'Error en el registro';
      // Reempaquetamos el error con el mensaje correcto
      return throwError(() => new Error(backendMessage));
    })
  );
}

googleLogin(idToken: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.API_URL}/auth/google`, { idToken }).pipe(
    tap(response => {
      this.handleAuthentication(response);
    }),
    catchError((error: HttpErrorResponse) => {
      const backendMessage = error.error?.message || 'Error en Google login';
      return throwError(() => new Error(backendMessage));
    })
  );
}


 // auth.service.ts
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.isAuthenticated.set(false);
  this.currentUser.set(null);
  this.router.navigate(['/auth/login']);
}

  checkAuthentication() {
    const token = localStorage.getItem('token');
    this.isAuthenticated.set(!!token);
    return this.isAuthenticated();
  }

// googleLogin(idToken: string): Observable<LoginResponse> {
//   return this.http.post<LoginResponse>(`${this.API_URL}/auth/google`, { idToken }).pipe(
//     tap(response => {
//       this.handleAuthentication(response);
//     })
//   );
// }
}
