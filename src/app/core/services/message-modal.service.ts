import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/General-models/message-modal.model';

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {
 private messageSubject = new BehaviorSubject<Message | null>(null);

  showMessage(message: Message): void {
    this.messageSubject.next(message);

    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      this.hideMessage();
    }, 5000);
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
}
