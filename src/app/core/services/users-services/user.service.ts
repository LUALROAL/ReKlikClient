// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminProfile } from '../../models/users-models/admin-profile.model';

// Interface para la respuesta del API
interface ApiResponse {
  status: string;
  user: AdminProfile;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<AdminProfile> {
    return this.http.get<ApiResponse>(`${this.API_URL}/users/me`)
      .pipe(
        map(response => response.user) // Extrae el objeto user de la respuesta
      );
  }

  updateCurrentUser(userData: any): Observable<AdminProfile> {
    return this.http.put<ApiResponse>(`${this.API_URL}/users/me`, userData)
      .pipe(
        map(response => response.user) // Extrae el objeto user de la respuesta
      );
  }

  updatePassword(id: number, passwordData: {
    currentPassword: string,
    newPassword: string
  }): Observable<any> {
    return this.http.put(`${this.API_URL}/users/${id}/password`, passwordData);
  }
}
