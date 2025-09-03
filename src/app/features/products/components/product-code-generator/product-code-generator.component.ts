// product-code-generator.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCode } from '../../models/product-code.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { QrService } from '../../services/qr-service.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RouterModule } from '@angular/router';
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
    qrDataUrl?: string;
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
        this.generatingQR = true;

        // Generar QR codes para cada código
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

  downloadQR(code: any): void {
    if (!code.qrDataUrl) return;

    const link = document.createElement('a');
    link.href = code.qrDataUrl;
    link.download = `qr-${code.uuidCode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async exportAllQRCodes(): Promise<void> {
    if (this.generatedCodes.length === 0) return;

    const codesWithData = this.generatedCodes
      .filter(code => code.qrDataUrl)
      .map(code => ({
        uuid: code.uuidCode,
        dataUrl: code.qrDataUrl!
      }));

    if (codesWithData.length === 0) {
      alert('No hay códigos QR para exportar');
      return;
    }

    await this.qrService.exportMultipleQRCodes(codesWithData);
  }

  exportToCsv(): void {
    if (this.generatedCodes.length === 0) return;

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
  if (this.generatedCodes.length === 0) return;

  const productId = this.generatorForm.value.productId;
  const product = this.products.find(p => p.id === productId);
  const productName = product ? product.name : 'Producto';

  const doc = new jsPDF();
  const title = `Códigos de Producto - ${productName}`;
  const date = new Date().toLocaleDateString('es-ES');

  // Encabezado
  doc.setFontSize(18);
  doc.text(title, 14, 15);
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generado el: ${date}`, 14, 22);

  // Preparar datos de la tabla
  const tableData = this.generatedCodes.map(code => {
    return ['', code.uuidCode, code.batchNumber || 'N/A',
            new Date(code.generatedAt).toLocaleString('es-ES')];
  });

  // Agregar tabla con autoTable
  autoTable(doc, {
    startY: 30,
    head: [['QR Code', 'UUID', 'Número de Lote', 'Fecha de Generación']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    margin: { top: 30 },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      overflow: 'linebreak',
      minCellHeight: 30 // Altura suficiente para el QR
    },
    columnStyles: {
      0: { cellWidth: 30 }, // Columna para QR
      1: { cellWidth: 60 }, // UUID
      2: { cellWidth: 35 }, // Lote
      3: { cellWidth: 45 }  // Fecha
    },
    // Agregar imágenes QR en la primera columna
    didDrawCell: (data) => {
      if (data.column.index === 0 && data.cell.section === 'body') {
        const code = this.generatedCodes[data.row.index];
        if (code && code.qrDataUrl) {
          // Calcular posición y tamaño para el QR
          const qrSize = 25;
          const centerX = data.cell.x + data.cell.width / 2;
          const centerY = data.cell.y + data.cell.height / 2;

          // Posicionar QR centrado en la celda
          doc.addImage(
            code.qrDataUrl,
            'PNG',
            centerX - qrSize/2,
            centerY - qrSize/2,
            qrSize,
            qrSize
          );
        }
      }
    }
  });

  doc.save(`codigos-${productName.toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`);
}

}
