// codes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductCodeWithProduct } from '../../models/product-code.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-codes-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './codes-list.component.html',
  styleUrls: ['./codes-list.component.scss']
})
export class CodesListComponent implements OnInit {
  codes: ProductCodeWithProduct[] = [];
  filterForm: FormGroup;
  isLoading = false;
  currentPage = 1;
  pageSize = 50;
  totalCount = 0;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      batchNumber: [''],
      productName: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadCodes();
  }

  loadCodes(): void {
    this.isLoading = true;
    const filters = this.filterForm.value;

    this.productService.getAllCodes(filters, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.codes = response.data;
        this.totalCount = response.totalCount || response.data.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading codes:', error);
        this.isLoading = false;
      }
    });
  }

  onFilter(): void {
    this.currentPage = 1;
    this.loadCodes();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCodes();
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.currentPage = 1;
    this.loadCodes();
  }
}
