import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCode } from '../../models/product-code.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-code-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-code-generator.component.html',
  styleUrls: ['./product-code-generator.component.scss']
})
export class ProductCodeGeneratorComponent implements OnInit {

  products: Product[] = [];
  generatedCodes: ProductCode[] = [];
  generatorForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.generatorForm = this.fb.group({
      productId: [null, [Validators.required]],
      quantity: [100, [Validators.required, Validators.min(1), Validators.max(10000)]],
      batchNumber: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los productos.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onGenerate(): void {
    if (this.generatorForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.generatedCodes = [];

    const { productId, quantity, batchNumber } = this.generatorForm.value;

    this.productService.generateCodes(productId, { quantity, batchNumber }).subscribe({
      next: (codes) => {
        this.generatedCodes = codes;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al generar los códigos. Por favor, inténtelo de nuevo.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  exportToCsv(): void {
    if (this.generatedCodes.length === 0) {
      return;
    }

    const headers = ['UUID,BatchNumber,GeneratedAt\n'];
    const rows = this.generatedCodes.map(code =>
      `${code.uuidCode},${code.batchNumber || ''},${code.generatedAt}\n`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + headers.join('') + rows.join('');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `codes-${this.generatorForm.value.productId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
