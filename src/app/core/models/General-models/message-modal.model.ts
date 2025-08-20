export interface Message {
  title: string;
  content: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
