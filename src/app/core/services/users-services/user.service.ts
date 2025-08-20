// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminProfile } from '../../models/users-models/admin-profile.model';
import { AuthService } from '../../auth/services/auth.service';
import { UserUpdateData } from '../../models/users-models/User-admin-update.model';

// Interface para la respuesta del API
interface ApiResponse {
  status: string;
  message?: string;
  user: AdminProfile;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  getCurrentUser(): Observable<AdminProfile> {
    const token = this.authService.getToken();
    return this.http.get<ApiResponse>(`${this.API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(response => response.user)
    );
  }

  // updateCurrentUser(userData: any): Observable<AdminProfile> {
  //   debugger
  //   return this.http.put<ApiResponse>(`${this.API_URL}/users/UpdateCurrentUser`, userData)
  //     .pipe(
  //       map(response => response.user) // Extrae el objeto user de la respuesta
  //     );
  // }
  updateCurrentUser(userData: UserUpdateData): Observable<any> {
    const token = this.authService.getToken();
    return this.http.put<any>(
      `${this.API_URL}/users/UpdateCurrentUser`,
      userData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }

  updatePassword(id: number, passwordData: { currentPassword: string, newPassword: string }): Observable<any> {
    const token = this.authService.getToken();
    return this.http.put<any>(`${this.API_URL}/users/${id}/password`, passwordData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
