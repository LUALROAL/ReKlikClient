import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

declare const google: any;


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section  class="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-warm-white rounded-xl shadow-lg overflow-hidden">
        <!-- Logo y título -->
        <div class="bg-warm p-3 text-center">
  <img [src]="logoPath" alt="ReKlik Logo" class="w-32 mx-auto mb-2">
  <!-- <h1 class="text-xl font-bold text-warm-white">Bienvenido a ReKlik</h1> -->
</div>

        <!-- Tarjeta del formulario -->
        <div class="card p-6 md:p-8 bg-warm">
          <h2 class="text-xl font-semibold text-secondary mb-6">Iniciar sesión</h2>

          <!-- Botón de Google -->
           <div  id="googleBtn">
             </div>

             <!-- <button class="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg border border-gray-300 text-secondary hover:bg-gray-50 mb-6 transition-colors">
               <svg class="w-5 h-5" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"> -->
                 <!-- Icono de Google -->
                 <!-- <g clip-path="url(#clip0_13183_10121)">
                   <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"></path>
                   <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"></path>
                   <path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"></path>
                   <path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"></path>
                 </g>
               </svg>
               Continuar con Google
             </button> -->

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
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Campo de email -->
            <div>
              <label for="email" class="block text-sm font-medium text-secondary mb-1">Correo electrónico</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                placeholder="tu@email.com"
                class="input-field"
                [class.input-error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
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
                [class.input-error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                <p class="mt-1 text-sm text-red-600">La contraseña debe tener al menos 6 caracteres</p>
              }
            </div>

            <!-- Recordar y olvidé contraseña -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary">
                <label for="remember" class="ml-2 text-sm text-gray-600">Recordar sesión</label>
              </div>
              <a href="#" class="text-sm text-primary hover:underline">¿Olvidaste tu contraseña?</a>
            </div>

            <!-- Botón de submit -->
            <button type="submit" class="w-full py-3 mt-4 uppercase font-bold text-xs rounded-[40px] text-secondary bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-colors duration-300">
  @if (loading()) {
    <span>Iniciando sesión...</span>
  } @else {
    <span>Iniciar sesión</span>
  }
</button>
          </form>

          <!-- Enlace a registro -->
          <p class="text-sm text-gray-500 mt-6 text-center">
            ¿No tienes una cuenta?
            <a routerLink="/auth/register" class="font-medium text-primary hover:underline">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class LoginComponent {
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  logoPath = 'assets/images/LOGO.png';

  loginForm: ReturnType<FormBuilder['group']>;
  google: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit() {

    google.accounts.id.initialize({
      client_id: '1039061657987-tqdli0gkper6a2rtq7sd1i73pmelqn0c.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleLogin(response.credential),
    });

  google.accounts.id.renderButton(
  document.getElementById("googleBtn"),
  {
      theme: "outline",   // outline | filled_blue | filled_black
    size: "large",      // small | medium | large
    shape: "pill",      // rect | pill | circle | square
    text: "continue_with", // o "signin_with"
    logo_alignment: "left", // o "center"
    width: 380    // ancho en px
  }
);

  }
  onSubmit() {
    if (this.loginForm.invalid) return;

    this.errorMessage.set(null);
    this.loading.set(true);

    const credentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.authService.login(credentials).pipe(
      catchError(error => {
        this.errorMessage.set(error.message || 'Error al iniciar sesión');
        return of(null);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe(response => {
      if (response) {
        console.log('Login exitoso', response);
      }
    });
  }

  private handleGoogleLogin(idToken: string) {
  this.authService.googleLogin(idToken).subscribe({
    next: () => this.router.navigate(['/dashboard']),
    error: () => this.errorMessage.set('Error al autenticar con Google')
  });
}
}
