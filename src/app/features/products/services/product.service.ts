import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/auth/services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductCreate } from '../models/product-create.model';


interface ApiResponse {
  status: string;
  message?: string;
  products: Product[];
  product?: Product;
}

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
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

// En product.service.ts
getAllProducts(): Observable<Product[]> {
  return this.http.get<any>(this.API_URL, {
    headers: this.getAuthHeaders()
  }).pipe(
    map(response => {
      // Si la respuesta es un array, devolverlo directamente
      if (Array.isArray(response)) {
        return response;
      }
      // Si tiene estructura ApiResponse con propiedad products
      else if (response.products) {
        return response.products;
      }
      // Si tiene estructura ApiResponse con propiedad product (singular)
      else if (response.product) {
        return [response.product];
      }
      // Si no coincide con ninguna estructura esperada
      else {
        console.warn('Estructura de respuesta inesperada:', response);
        return [];
      }
    }),
    catchError(error => {
      console.error('Error en getAllProducts:', error);
      return of([]);
    })
  );
}

  getProductById(id: number): Observable<Product> {
    return this.http.get<ApiResponse>(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        if (!response.product) {
          throw new Error('Producto no encontrado');
        }
        return response.product;
      })
    );
  }


  createProduct(productData: ProductCreate): Observable<any> {
    return this.http.post<ApiResponse>(this.API_URL, productData, {
      headers: this.getAuthHeaders()
    });
  }

  updateProduct(id: number, productData: Product): Observable<any> {
    return this.http.put<ApiResponse>(`${this.API_URL}/${id}`, productData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<ApiResponse>(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getProductsByMaterial(materialType: string): Observable<Product[]> {
    return this.http.get<ApiResponse>(`${this.API_URL}/material/${materialType}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.products || [])
    );
  }

  getProductsByCompany(companyId: number): Observable<Product[]> {
    return this.http.get<ApiResponse>(`${this.API_URL}/company/${companyId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => response.products || [])
    );
  }
}
