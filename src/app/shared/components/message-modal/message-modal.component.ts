import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.scss'
})
export class MessageModalComponent {
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Output() closed = new EventEmitter<void>();

  onClose(): void {
    this.visible = false;
    this.closed.emit();
  }
}
