import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AdminProfile } from '../../models/users-models/admin-profile.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // En user.service.ts
  getCurrentUser(): Observable<AdminProfile> {
    return this.http.get<AdminProfile>(`${this.API_URL}/users/me`);
  }

  updateCurrentUser(userData: any): Observable<AdminProfile> {
    return this.http.put<AdminProfile>(`${this.API_URL}/users/me`, userData);
  }

  updatePassword(id: number, passwordData: {
    currentPassword: string,
    newPassword: string
  }): Observable<any> {
    return this.http.put(`${this.API_URL}/users/${id}/password`, passwordData);
  }
}
