// codes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductCodeWithProduct } from '../../models/product-code.model';
import { CommonModule } from '@angular/common';
import { QrService } from '../../services/qr-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-codes-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './codes-list.component.html',
  styleUrls: ['./codes-list.component.scss']
})
export class CodesListComponent implements OnInit {
  codes: (ProductCodeWithProduct & {
    qrSafeUrl?: SafeUrl;
    qrDataUrl?: string;
    generatingQR?: boolean;
  })[] = [];
  filterForm: FormGroup;
  isLoading = false;
  currentPage = 1;
  pageSize = 50;
  totalCount = 0;
  generatingAllQR = false;

  // Para usar Math en el template
  Math = Math;

  constructor(
    private productService: ProductService,
    private qrService: QrService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
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

        // Limpiar los QR existentes al cargar nuevos códigos
        this.codes.forEach(code => {
          code.qrSafeUrl = undefined;
          code.qrDataUrl = undefined;
        });
      },
      error: (error) => {
        console.error('Error loading codes:', error);
        this.isLoading = false;
      }
    });
  }

  async generateQRForCode(code: any): Promise<void> {
    if (code.qrSafeUrl) return;

    code.generatingQR = true;
    try {
      const qrResult = await this.qrService.generateHummingbirdQR(code.uuidCode);
      code.qrSafeUrl = qrResult.safeUrl;
      code.qrDataUrl = qrResult.dataUrl;
    } catch (error) {
      console.error('Error generating QR for code:', code.uuidCode, error);
      alert('Error al generar el código QR. Por favor, intente nuevamente.');
    }
    code.generatingQR = false;
  }

  async generateAllQRCodes(): Promise<void> {
    if (this.codes.length === 0) {
      alert('No hay códigos para generar QR');
      return;
    }

    this.generatingAllQR = true;

    for (const code of this.codes) {
      if (!code.qrSafeUrl) {
        await this.generateQRForCode(code);
      }
    }

    this.generatingAllQR = false;
  }

  downloadQR(code: any): void {
    if (!code.qrDataUrl) {
      alert('Primero debe generar el código QR');
      return;
    }

    const link = document.createElement('a');
    link.href = code.qrDataUrl;
    link.download = `qr-${code.uuidCode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async exportAllQRCodes(): Promise<void> {
    const codesWithQR = this.codes.filter(code => code.qrDataUrl);

    if (codesWithQR.length === 0) {
      alert('Primero debe generar los códigos QR');
      return;
    }

    try {
      const codesWithData = codesWithQR.map(code => ({
        uuid: code.uuidCode,
        dataUrl: code.qrDataUrl!
      }));

      await this.qrService.exportMultipleQRCodes(codesWithData);
    } catch (error) {
      console.error('Error exporting QR codes:', error);
      alert('Error al exportar los códigos QR. Por favor, intente nuevamente.');
    }
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

  // Método para obtener el rango de páginas para mostrar
  getPageRange(): number[] {
    const totalPages = Math.ceil(this.totalCount / this.pageSize);
    const range = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(totalPages, this.currentPage + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }
}
