import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/auth/services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductCreate } from '../models/product-create.model';
import { ProductUpdate } from '../models/product-update.model';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { GenerateCodes } from '../models/generate-codes.model';
import { ProductCode } from '../models/product-code.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = `${environment.apiUrl}/products`;

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

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(this.API_URL).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error in getAllProducts:', error);
        return of([]);
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<ApiResponse<Product>>(`${this.API_URL}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createProduct(productData: ProductCreate): Observable<Product> {
    return this.http.post<ApiResponse<Product>>(this.API_URL, productData, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data)
    );
  }

  updateProduct(id: number, productData: ProductUpdate): Observable<any> {
    return this.http.put<ApiResponse<any>>(`${this.API_URL}/${id}`, productData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getProductsByMaterial(materialType: string): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(`${this.API_URL}/material/${materialType}`).pipe(
      map(response => response.data || [])
    );
  }

  getProductsByCompany(companyId: number): Observable<Product[]> {
    return this.http.get<ApiResponse<Product[]>>(`${this.API_URL}/company/${companyId}`).pipe(
      map(response => response.data || [])
    );
  }

  generateCodes(productId: number, data: GenerateCodes): Observable<ProductCode[]> {
    return this.http.post<ApiResponse<ProductCode[]>>(`${this.API_URL}/${productId}/generate-codes`, data, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.data)
    );
  }
}
