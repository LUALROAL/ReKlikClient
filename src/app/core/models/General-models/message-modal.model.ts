// message-modal.model.ts
export interface Message {
  title: string;
  content: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface ConfirmationMessage {
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}
