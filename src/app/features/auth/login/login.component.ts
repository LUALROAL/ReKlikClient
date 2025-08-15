import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <h2>Iniciar Sesión</h2>

      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            [class.invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
          @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
            <div class="error">Email es requerido y debe ser válido</div>
          }
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            [class.invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
          @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
            <div class="error">Contraseña es requerida (mínimo 6 caracteres)</div>
          }
        </div>

        <button type="submit" [disabled]="loginForm.invalid || loading()">
          @if (loading()) {
            <span>Procesando...</span>
          } @else {
            <span>Ingresar</span>
          }
        </button>
      </form>

      <p>¿No tienes cuenta? <a routerLink="/auth/register">Regístrate aquí</a></p>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    input.invalid {
      border-color: #f44336;
    }

    .error {
      color: #f44336;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }

    button {
      background: #3f51b5;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class LoginComponent {
  loading = signal(false);

  loginForm: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading.set(true);

    try {
      // Aquí iría la llamada al servicio de autenticación
      // await this.authService.login(this.loginForm.value);
      // this.router.navigate(['/dashboard']);

      // Simulamos una llamada asíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Login exitoso', this.loginForm.value);
    } catch (error) {
      console.error('Error en login', error);
    } finally {
      this.loading.set(false);
    }
  }
}
