// services/qr-service.service.ts
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as QRCode from 'qrcode'
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private sanitizer: DomSanitizer) { }

// En qr-service.service.ts

async generateHummingbirdQR(uuid: string): Promise<{ safeUrl: SafeUrl; dataUrl: string }> {
  try {
    // Generar QR básico
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, uuid, {
      width: 300,
      margin: 1,
      color: {
        dark: '#1E40AF', // Azul oscuro
        light: '#FFFFFF' // Fondo blanco
      }
    });

    // Aplicar forma de colibrí
    const shapedCanvas = this.applyHummingbirdShape(canvas);

    // Convertir a URL
    const dataUrl = shapedCanvas.toDataURL('image/png');
    const safeUrl = this.sanitizer.bypassSecurityTrustUrl(dataUrl);

    return { safeUrl, dataUrl };
  } catch (error) {
    console.error('Error generating QR:', error);
    throw error;
  }
}

  private applyHummingbirdShape(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const width = canvas.width;
    const height = canvas.height;
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = width;
    outputCanvas.height = height;
    const outputCtx = outputCanvas.getContext('2d');

    if (!outputCtx) return canvas;

    // Crear máscara de colibrí
    outputCtx.fillStyle = '#FFFFFF';
    outputCtx.fillRect(0, 0, width, height);

    // Dibujar forma de colibrí (puedes usar una imagen SVG o dibujar la forma)
    this.drawHummingbirdSilhouette(outputCtx, width, height);

    // Aplicar máscara al QR
    outputCtx.globalCompositeOperation = 'source-in';
    outputCtx.drawImage(canvas, 0, 0);

    return outputCanvas;
  }

  private drawHummingbirdSilhouette(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    // Coordenadas aproximadas para la silueta de colibrí
    ctx.fillStyle = '#000000';

    // Cuerpo
    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2, width * 0.15, height * 0.25, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Cabeza
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.3, width * 0.1, 0, 2 * Math.PI);
    ctx.fill();

    // Pico
    ctx.beginPath();
    ctx.moveTo(width / 2, height * 0.25);
    ctx.lineTo(width * 0.6, height * 0.2);
    ctx.lineTo(width / 2, height * 0.3);
    ctx.fill();

    // Alas
    ctx.beginPath();
    ctx.ellipse(width * 0.35, height * 0.4, width * 0.2, height * 0.15, -Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(width * 0.65, height * 0.4, width * 0.2, height * 0.15, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Método alternativo usando imagen SVG
  async generateHummingbirdQRWithSVG(uuid: string): Promise<SafeUrl> {
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, uuid, {
      width: 300,
      margin: 1
    });

    // Cargar SVG de colibrí (debes tener este archivo en assets)
    const hummingbirdSVG = await this.loadHummingbirdSVG();
    const finalCanvas = await this.applySVGMask(canvas, hummingbirdSVG);

    const dataUrl = finalCanvas.toDataURL('image/png');
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
  }

  private async loadHummingbirdSVG(): Promise<string> {
    // Cargar SVG desde assets
    const response = await fetch('/assets/images/hummingbird.svg');
    return await response.text();
  }

  private async applySVGMask(qrCanvas: HTMLCanvasElement, svgContent: string): Promise<HTMLCanvasElement> {
    // Implementar aplicación de máscara SVG
    // Esto es más complejo y requiere manipulación de SVG
    return qrCanvas;
  }

  async exportMultipleQRCodes(codes: { uuid: string, qrCode: SafeUrl }[]): Promise<void> {
  const zip = new JSZip();

  for (const code of codes) {
    const response = await fetch(code.qrCode.toString());
    const blob = await response.blob();
    zip.file(`qr-${code.uuid}.png`, blob);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'qr-codes.zip');
}
}
