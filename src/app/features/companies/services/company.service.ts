
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { AuthService } from '../../../core/auth/services/auth.service';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { Company, CompanyCreateDTO } from '../models/company.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/companies`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  getCompanies(): Observable<ApiResponse<Company[]>> {
    return this.http.get<ApiResponse<Company[]>>(this.apiUrl);
  }

    getCompaniesForProducts(): Observable<Company[]> {
    return this.http.get<ApiResponse<Company[]>>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.data || [])
    );
  }

    private getAuthHeaders() {
    const token = this.authService.getToken();
    return {
      'Authorization': `Bearer ${token}`
    };
  }
  getCompany(id: number): Observable<ApiResponse<Company>> {
    return this.http.get<ApiResponse<Company>>(`${this.apiUrl}/${id}`);
  }

  createCompany(company: FormData): Observable<ApiResponse<Company>> {
    return this.http.post<ApiResponse<Company>>(this.apiUrl, company, { headers: this.getAuthHeaders() });
  }

  updateCompany(id: number, company: FormData): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${id}`, company, { headers: this.getAuthHeaders() });
  }

  deleteCompany(id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${id}`);
  }
}
