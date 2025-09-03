import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCode } from '../../models/product-code.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RouterModule } from '@angular/router';
import { QrService } from '../../services/qr-service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-code-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-code-generator.component.html',
  styleUrls: ['./product-code-generator.component.scss']
})
export class ProductCodeGeneratorComponent implements OnInit {

  products: Product[] = [];
  generatedCodes: (ProductCode & {
    qrSafeUrl?: SafeUrl;
    qrDataUrl?: string
  })[] = [];
  generatorForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  generatingQR = false;

  constructor(
    private productService: ProductService,
    private qrService: QrService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.generatorForm = this.fb.group({
      productId: [null, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(10000)]],
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

  async onGenerate(): Promise<void> {
    if (this.generatorForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.generatedCodes = [];

    const { productId, quantity, batchNumber } = this.generatorForm.value;

    this.productService.generateCodes(productId, { quantity, batchNumber }).subscribe({
      next: async (codes) => {
        this.generatedCodes = codes;

        // Generar QR codes para cada código
        this.generatingQR = true;
        for (const code of this.generatedCodes) {
          try {
            const qrResult = await this.qrService.generateHummingbirdQR(code.uuidCode);
            code.qrSafeUrl = qrResult.safeUrl;
            code.qrDataUrl = qrResult.dataUrl;
          } catch (error) {
            console.error('Error generating QR for code:', code.uuidCode, error);
          }
        }
        this.generatingQR = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al generar los códigos. Por favor, inténtelo de nuevo.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }


  // Método para descargar QR individual
 downloadQR(code: any): void {
  if (!code.qrDataUrl) return;

  const link = document.createElement('a');
  link.href = code.qrDataUrl;
  link.download = `qr-${code.uuidCode}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


  // Método para exportar todos los QR en un ZIP
  async exportAllQRCodes(): Promise<void> {
    if (this.generatedCodes.length === 0) return;

    // Necesitarías una librería como JSZip para esto
    console.log('Exportar todos los QR codes (implementar con JSZip)');
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

  exportToPdf(): void {
    if (this.generatedCodes.length === 0) {
      return;
    }

    // Obtener el nombre del producto seleccionado
    const productId = this.generatorForm.value.productId;
    const product = this.products.find(p => p.id === productId);
    const productName = product ? product.name : 'Producto';

    // Crear nuevo documento PDF
    const doc = new jsPDF();

    // Añadir título
    const title = `Códigos de Producto - ${productName}`;
    const date = new Date().toLocaleDateString('es-ES');

    doc.setFontSize(18);
    doc.text(title, 14, 15);
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado el: ${date}`, 14, 22);

    // Preparar datos para la tabla
    const tableData = this.generatedCodes.map(code => [
      code.uuidCode,
      code.batchNumber || 'N/A',
      new Date(code.generatedAt).toLocaleString('es-ES')
    ]);

    // Añadir tabla al PDF
    autoTable(doc, {
      startY: 30,
      head: [['UUID', 'Número de Lote', 'Fecha de Generación']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      margin: { top: 30 },
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 }
      }
    });

    // Guardar PDF
    doc.save(`codigos-${productName.toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  private getUrlFromSafeUrl(safeUrl: SafeUrl): string | null {
    // SafeUrl puede ser de diferentes tipos, necesitamos extraer la URL real
    if (typeof safeUrl === 'string') {
      return safeUrl;
    }

    // Si es un objeto, intentar acceder a la propiedad 'changingThisBreaksApplicationSecurity'
    if (safeUrl && typeof safeUrl === 'object' && 'changingThisBreaksApplicationSecurity' in safeUrl) {
      return (safeUrl as any).changingThisBreaksApplicationSecurity;
    }

    return null;
  }
}
