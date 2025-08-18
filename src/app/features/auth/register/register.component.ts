// register.component.ts
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-warm-white rounded-xl shadow-lg overflow-hidden">
        <!-- Logo y título -->
        <div class="bg-warm p-3 text-center">
          <img [src]="logoPath" alt="ReKlik Logo" class="w-32 mx-auto mb-2">
          <h1 class="text-xl font-bold text-secondary">Crear una cuenta</h1>
        </div>

        <!-- Tarjeta del formulario -->
        <div class="card p-6 md:p-8 bg-warm">
          <!-- Botón de Google -->
          <div id="googleRegisterBtn"></div>

          <!-- Separador -->
          <div class="flex items-center my-6">
            <div class="flex-1 h-px bg-gray-200"></div>
            <span class="px-4 text-sm text-gray-500">o</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <!-- Mensaje de error -->
          @if (errorMessage()) {
            <div class="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm border border-red-200">
              {{ errorMessage() }}
            </div>
          }

          <!-- Formulario -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Campo de nombre -->
            <div>
              <label for="name" class="block text-sm font-medium text-secondary mb-1">Nombre completo</label>
              <input
                id="name"
                type="text"
                formControlName="name"
                placeholder="Tu nombre"
                class="input-field"
                [class.input-error]="registerForm.get('name')?.invalid && registerForm.get('name')?.touched">
              @if (registerForm.get('name')?.invalid && registerForm.get('name')?.touched) {
                <p class="mt-1 text-sm text-red-600">Por favor ingresa tu nombre</p>
              }
            </div>

            <!-- Campo de email -->
            <div>
              <label for="email" class="block text-sm font-medium text-secondary mb-1">Correo electrónico</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="tu@email.com"
                class="input-field"
                [class.input-error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
              @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
                <p class="mt-1 text-sm text-red-600">Por favor ingresa un email válido</p>
              }
            </div>

            <!-- Campo de contraseña -->
            <div>
              <label for="password" class="block text-sm font-medium text-secondary mb-1">Contraseña</label>
              <input
                id="password"
                type="password"
                formControlName="password"
                placeholder="••••••••"
                class="input-field"
                [class.input-error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
              @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
                <p class="mt-1 text-sm text-red-600">La contraseña debe tener al menos 8 caracteres</p>
              }
            </div>

            <!-- Campo de tipo de usuario -->
            <div>
              <label for="userType" class="block text-sm font-medium text-secondary mb-1">Tipo de usuario</label>
              <select
                id="userType"
                formControlName="userType"
                class="input-field"
                [class.input-error]="registerForm.get('userType')?.invalid && registerForm.get('userType')?.touched">
                <option value="" disabled selected>Selecciona tu tipo</option>
                <option value="ciudadano">Ciudadano</option>
                <option value="reciclador">Reciclador</option>
                <option value="punto_acopio">Punto de acopio</option>
              </select>
              @if (registerForm.get('userType')?.invalid && registerForm.get('userType')?.touched) {
                <p class="mt-1 text-sm text-red-600">Por favor selecciona un tipo de usuario</p>
              }
            </div>

            <!-- Campo de teléfono -->
            <div>
              <label for="phone" class="block text-sm font-medium text-secondary mb-1">Teléfono (opcional)</label>
              <input
                id="phone"
                type="tel"
                formControlName="phone"
                placeholder="+51 123 456 789"
                class="input-field">
            </div>

            <!-- Botón de submit -->
            <button type="submit" class="w-full py-3 mt-4 uppercase font-bold text-xs rounded-[40px] text-secondary bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-colors duration-300">
              @if (loading()) {
                <span>Registrando...</span>
              } @else {
                <span>Registrarse</span>
              }
            </button>
          </form>

          <!-- Enlace a login -->
          <p class="text-sm text-gray-500 mt-6 text-center">
            ¿Ya tienes una cuenta?
            <a routerLink="/auth/login" class="font-medium text-primary hover:underline">Inicia sesión aquí</a>
          </p>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class RegisterComponent {
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  logoPath = 'assets/images/LOGO.png';

  registerForm: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      userType: ['', [Validators.required]],
      phone: ['']
    });
  }

  ngOnInit() {
    google.accounts.id.initialize({
      client_id: '1039061657987-tqdli0gkper6a2rtq7sd1i73pmelqn0c.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleRegister(response.credential),
    });

    google.accounts.id.renderButton(
      document.getElementById("googleRegisterBtn"),
      {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "signup_with",
        logo_alignment: "left",
        width: 380
      }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.errorMessage.set(null);
    this.loading.set(true);

    const userData = this.registerForm.value;

    this.authService.register(userData).pipe(
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err: Error) => {
        this.errorMessage.set(err.message);
      }
    });
  }

  private async handleGoogleRegister(idToken: string) {
  this.loading.set(true);
  this.errorMessage.set(null);

  try {
    const response = await firstValueFrom(
      this.authService.googleLogin(idToken)
    );

    // Si todo salió bien
    this.router.navigate(['/dashboard']);
  } catch (err: any) {
    this.errorMessage.set(err.message);
  } finally {
    this.loading.set(false);
  }
}
}
