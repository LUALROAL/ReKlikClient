import { Component, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './admin-sidenav.component.html',
  styleUrl: './admin-sidenav.component.scss'
})
export class AdminSidenavComponent {
  @Input() isOpen = true;
  currentUser: any = null;

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
  }

 ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = this.authService.getCurrentUser();
    }

  }
}
