import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, ConfirmationMessage } from '../../models/General-models/message-modal.model';

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {
  private messageSubject = new BehaviorSubject<Message | null>(null);
  private confirmationSubject = new BehaviorSubject<ConfirmationMessage | null>(null);

  // Métodos existentes...
  showMessage(message: Message): void {
    this.messageSubject.next(message);
    setTimeout(() => this.hideMessage(), 5000);
  }

  showSuccess(title: string, content: string): void {
    this.showMessage({ title, content, type: 'success' });
  }

  showError(title: string, content: string): void {
    this.showMessage({ title, content, type: 'error' });
  }

  showInfo(title: string, content: string): void {
    this.showMessage({ title, content, type: 'info' });
  }

  showWarning(title: string, content: string): void {
    this.showMessage({ title, content, type: 'warning' });
  }

  hideMessage(): void {
    this.messageSubject.next(null);
  }

  getMessage(): Observable<Message | null> {
    return this.messageSubject.asObservable();
  }

  // Nuevo método de confirmación con callback
  showConfirmation(
    title: string,
    content: string,
    onConfirm: () => void,
    confirmText: string = 'Confirmar',
    cancelText: string = 'Cancelar'
  ): void {
    const confirmationMessage: ConfirmationMessage = {
      title,
      content,
      confirmText,
      cancelText,
      onConfirm: () => {
        onConfirm();
        this.hideConfirmation();
      },
      onCancel: () => {
        this.hideConfirmation();
      }
    };

    this.confirmationSubject.next(confirmationMessage);
  }

  hideConfirmation(): void {
    this.confirmationSubject.next(null);
  }

  getConfirmation(): Observable<ConfirmationMessage | null> {
    return this.confirmationSubject.asObservable();
  }
}
