import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './admin-sidenav.component.html',
  styleUrl: './admin-sidenav.component.scss'
})
export class AdminSidenavComponent {
  @Input() isOpen = true;
}
