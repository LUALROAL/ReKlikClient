import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/auth/services/auth.service';
import { map, Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly API_URL = `${environment.apiUrl}/companies`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<ApiResponse<Company[]>>(this.API_URL, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.data || [])
    );
  }
}
