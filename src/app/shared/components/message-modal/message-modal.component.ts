import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MessageModalService } from '../../../core/auth/services/message-modal.service';
import { ConfirmationMessage, Message } from '../../../core/models/General-models/message-modal.model';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {
  message$: Observable<Message | null>;
  confirmation$: Observable<ConfirmationMessage | null>;

  constructor(private messageModalService: MessageModalService) {
    this.message$ = this.messageModalService.getMessage();
    this.confirmation$ = this.messageModalService.getConfirmation();
  }

  ngOnInit(): void {}

  onConfirm(confirmation: ConfirmationMessage | null): void {
    if (confirmation && confirmation.onConfirm) {
      confirmation.onConfirm();
    }
  }

  onCancel(confirmation: ConfirmationMessage | null): void {
    if (confirmation && confirmation.onCancel) {
      confirmation.onCancel();
    }
  }

  onCloseMessage(): void {
    this.messageModalService.hideMessage();
  }
}
