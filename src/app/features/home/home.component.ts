import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="welcome-container">
      <h1>Bienvenido a Reklik</h1>
      <p>La plataforma que estabas buscando</p>

      <div class="auth-actions">
        <a routerLink="/auth/login" class="btn">Iniciar Sesión</a>
        <a routerLink="/auth/register" class="btn">Registrarse</a>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      text-align: center;
      padding: 2rem;
    }

    .auth-actions {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 0.5rem 1rem;
      background: #3f51b5;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  `]
})
export class HomeComponent {}
