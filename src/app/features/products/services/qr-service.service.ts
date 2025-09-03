// services/qr-service.service.ts
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  constructor(private sanitizer: DomSanitizer) { }

  async generateHummingbirdQR(uuid: string): Promise<{ safeUrl: SafeUrl; dataUrl: string }> {
    try {
      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, uuid, {
        width: 300,
        margin: 1,
        color: {
          dark: '#1E40AF',
          light: '#FFFFFF'
        }
      });

      const shapedCanvas = this.applyHummingbirdShape(canvas);
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

    outputCtx.fillStyle = '#FFFFFF';
    outputCtx.fillRect(0, 0, width, height);
    this.drawHummingbirdSilhouette(outputCtx, width, height);
    outputCtx.globalCompositeOperation = 'source-in';
    outputCtx.drawImage(canvas, 0, 0);

    return outputCanvas;
  }

  private drawHummingbirdSilhouette(ctx: CanvasRenderingContext2D, width: number, height: number): void {
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

  async exportMultipleQRCodes(codes: { uuid: string, dataUrl: string }[]): Promise<void> {
    const zip = new JSZip();

    for (const code of codes) {
      try {
        // Convertir data URL a blob
        const response = await fetch(code.dataUrl);
        const blob = await response.blob();
        zip.file(`qr-${code.uuid}.png`, blob);
      } catch (error) {
        console.error('Error processing QR code:', error);
      }
    }

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'qr-codes.zip');
    } catch (error) {
      console.error('Error creating ZIP file:', error);
    }
  }
}
