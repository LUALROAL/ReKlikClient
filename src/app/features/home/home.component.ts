import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  template: `
  <app-loading *ngIf="loading()"></app-loading>
    <section class="bg-secondary overflow-hidden pb-9 px-4 md:px-8">
    <header class="flex mx-auto justify-between items-center max-w-[1300px] py-4">
        <div class="flex items-center gap-3">
          <img src="assets/images/LOGO.png" alt="" class="w-10 md:w-16 lg:w-24 h-10 md:h-16 lg:h-24" viewBox="0 0 102 103" fill="none">

        </div>
        <nav class="hidden sm:inline-block">
            <ul class="flex gap-3 md:gap-5 lg:gap-10">
                <li class="uppercase font-bold text-xs text-warm-white"><a href="#">INICIO</a></li>
                <li class="uppercase font-bold text-xs text-warm-white"><a href="#">NOSOTROS</a></li>
                <li class="uppercase font-bold text-xs text-warm-white"><a href="#">ALIADOS</a></li>
                <li class="uppercase font-bold text-xs text-warm-white"><a href="#">CÓMO FUNCIONA</a></li>
            </ul>
        </nav>
        <div class="hidden sm:flex gap-3 md:gap-5 lg:gap-9">
            <button (click)="goToLogin()" class="uppercase font-bold text-xs text-warm-white border-2 border-warm-white rounded-[40px] py-1 px-3 md:py-2 lg:py-4 md:px-4 lg:px-9 hover:bg-primary transition-colors duration-300">Iniciar Sesión</button>
            <button (click)="goToRegister()" class="uppercase font-bold text-xs rounded-[40px] py-1 px-3 md:py-2 lg:py-4 md:px-4 lg:px-9 text-secondary bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-colors duration-300">Registrarse</button>
        </div>
        <!-- <button *ngIf="isMenuOpen" class="sm:hidden inline-block">
            <svg width="33" height="26" viewBox="0 0 33 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="33" height="3.71429" rx="1.85714" fill="url(#paint0_linear_13_83)"></rect>
                <rect y="22.2857" width="33" height="3.71429" rx="1.85714" fill="url(#paint1_linear_13_83)"></rect>
                <rect x="9" y="11.1429" width="24" height="3.71429" rx="1.85714" fill="url(#paint2_linear_13_83)"></rect>
                <defs>
                    <linearGradient id="paint0_linear_13_83" x1="-8.62252e-09" y1="3.46667" x2="36.0395" y2="3.46666" gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                    <linearGradient id="paint1_linear_13_83" x1="-3.90789" y1="26" x2="33" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                    <linearGradient id="paint2_linear_13_83" x1="5.21062" y1="13" x2="33.0001" y2="13" gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                </defs>
            </svg>
        </button> -->

        <button class="sm:hidden inline-block" (click)="toggleMenu()">
            <svg width="33" height="26" viewBox="0 0 33 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="33" height="3.71429" rx="1.85714" fill="url(#paint0_linear_13_83)"></rect>
                <rect y="22.2857" width="33" height="3.71429" rx="1.85714" fill="url(#paint1_linear_13_83)"></rect>
                <rect x="9" y="11.1429" width="24" height="3.71429" rx="1.85714" fill="url(#paint2_linear_13_83)"></rect>
                <defs>
                    <linearGradient id="paint0_linear_13_83" x1="-8.62252e-09" y1="3.46667" x2="36.0395" y2="3.46666" gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                    <linearGradient id="paint1_linear_13_83" x1="-3.90789" y1="26" x2="33" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                    <linearGradient id="paint2_linear_13_83" x1="5.21062" y1="13" x2="33.0001" y2="13" gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                </defs>
            </svg>
        </button>
      </header>

       <!-- Menú móvil -->
    <div *ngIf="isMenuOpen" class="sm:hidden fixed inset-0 bg-secondary z-50 pt-20 px-4">
        <div class="flex flex-col items-center gap-8">
            <ul class="flex flex-col items-center gap-8 w-full">
                <li class="uppercase font-bold text-lg text-warm-white w-full text-center py-2 border-b border-primary"><a href="#">INICIO</a></li>
                <li class="uppercase font-bold text-lg text-warm-white w-full text-center py-2 border-b border-primary"><a href="#">SERVICIOS</a></li>
                <li class="uppercase font-bold text-lg text-warm-white w-full text-center py-2 border-b border-primary"><a href="#">TECNOLOGÍAS</a></li>
                <li class="uppercase font-bold text-lg text-warm-white w-full text-center py-2 border-b border-primary"><a href="#">CÓMO FUNCIONA</a></li>
            </ul>
            <div class="flex flex-col gap-4 w-full max-w-xs">
                <button (click)="goToLogin()" class="uppercase font-bold text-sm text-warm-white border-2 border-warm-white rounded-[40px] py-3 px-6 hover:bg-primary transition-colors duration-300 w-full">Iniciar Sesión</button>
                <button (click)="goToRegister()" class="uppercase font-bold text-sm rounded-[40px] py-3 px-6 text-secondary bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-colors duration-300 w-full">Registrarse</button>
            </div>
        </div>
        <button (click)="toggleMenu()" class="absolute top-4 right-4 text-warm-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>

    <section class="relative flex flex-col-reverse md:flex-row mx-auto justify-between items-center gap-9 md:gap-4 max-w-[1300px] py-4 my-12">
        <svg width="736" height="423" class="absolute top-[50px] sm:top-[200px] sm:right-[-150px]" viewBox="0 0 736 423" fill="none">
            <path d="M738.5 4.5C491.667 -7.66666 -0.900015 58.9 3.49999 422.5" stroke="url(#paint0_linear_16_172)" stroke-width="6"></path>
            <defs>
                <linearGradient id="paint0_linear_16_172" x1="700.5" y1="-3.99998" x2="14.5" y2="361" gradientUnits="userSpaceOnUse">
                    <stop stop-color="var(--color-secondary-dark)"></stop>
                    <stop offset="0.213542" stop-color="var(--color-primary)"></stop>
                    <stop offset="0.71875" stop-color="var(--color-primary-dark)"></stop>
                    <stop offset="1" stop-color="var(--color-secondary-dark)"></stop>
                </linearGradient>
            </defs>
        </svg>
        <svg class="absolute -top-14 sm:right-7" width="416" height="675" viewBox="0 0 416 675" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M415 3C325.774 17.8434 155.913 102.224 190.271 320.998C224.63 539.772 78.4065 646.155 1 672" stroke="url(#paint0_linear_16_171)" stroke-width="6"></path>
            <defs>
                <linearGradient id="paint0_linear_16_171" x1="365.5" y1="28" x2="110" y2="594" gradientUnits="userSpaceOnUse">
                    <stop stop-color="var(--color-secondary-dark)"></stop>
                    <stop offset="0.276042" stop-color="var(--color-primary-dark)"></stop>
                    <stop offset="0.739583" stop-color="var(--color-primary)"></stop>
                    <stop offset="1" stop-color="var(--color-secondary-dark)"></stop>
                </linearGradient>
            </defs>
        </svg>

        <div class="md:w-[520px] z-20">
            <h1 class="text-3xl md:text-[36px] lg:text-[46px] leading-[56px] text-warm-white font-bold italic">
              El<span class="text-primary"> Cambio </span>Comienza Con Un
                <span class="text-accent"> Clic</span></h1>
            <p class="text-base text-warm-white mt-4 md:mt-9 mb-10 md:mb-16">Transforma tus residuos en oportunidades con nuestra plataforma inteligente.</p>
            <div (click)="goToLogin()" class="flex gap-6 sm:gap-10">
                <button class="uppercase font-bold text-xs rounded-[40px] py-2 lg:py-4 px-4 lg:px-9 text-secondary bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-colors duration-300">EMPEZAR AHORA</button>
                <svg class="w-8 h-6 sm:w-12 sm:h-9" viewBox="0 0 46 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43.8334 19L2.16669 19M43.8334 19L27.1667 35.6667M43.8334 19L27.1667 2.33333" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        </div>

        <div class="p-4 z-20 bg-black rounded-[100px] md:rounded-bl-[200px] lg:rounded-bl-[250px] bg-opacity-20">
            <img class="max-w-[490px] w-full rounded-lg" src="assets/images/IMGModerna .png" alt="Imagen de realidad virtual">
        </div>
    </section>

    <div class="flex sm:hidden relative z-30 justify-center gap-5 items-center mt-6 mx-auto max-w-[1300px] rounded-[90px] py-3 px-3 sm:p-8 lg:p-14 bg-gradient-to-r from-secondary via-secondary-light to-secondary">

  <!-- Flecha izquierda -->
  <svg (click)="prevSlide()" width="24" height="24" viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg" class="sm:hidden flex-none cursor-pointer">
    <path d="M14.5 18.25L8.25 12L14.5 5.75M0.75 12C0.75 18.2132 5.7868 23.25 12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12Z"
          stroke="var(--color-warm-white)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  <!-- Contenedor de slides -->
  <div class="overflow-hidden flex-1">
    <div class="flex transition-transform duration-500"
         [style.transform]="'translateX(-' + (currentSlide * 100) + '%)'">

      <!-- Slide 1: Visítanos -->
      <div class="flex flex-none w-full sm:flex-1 gap-4 lg:gap-6 justify-center sm:justify-start">
        <svg width="42" height="63" viewBox="0 0 42 63" fill="none"
             xmlns="http://www.w3.org/2000/svg" class="flex-none">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M21 0.833344C32.2758 0.833344 41.4166 9.9742 41.4166 21.25C41.4166 24.6593 40.5834 27.8717 39.1039 30.6983L21 62.0833L3.31538 31.4595C1.57498 28.4542 0.583313 24.9693 0.583313 21.25C0.583313 9.9742 9.72416 0.833344 21 0.833344ZM21 6.66668C12.9458 6.66668 6.41665 13.1959 6.41665 21.25C6.41665 23.566 6.95093 25.7882 7.96198 27.7943L8.45197 28.6893L21 50.4167L33.6366 28.5362C34.9071 26.3423 35.5833 23.8555 35.5833 21.25C35.5833 13.1959 29.0541 6.66668 21 6.66668ZM21 12.5C25.8325 12.5 29.75 16.4175 29.75 21.25C29.75 26.0825 25.8325 30 21 30C16.1675 30 12.25 26.0825 12.25 21.25C12.25 16.4175 16.1675 12.5 21 12.5ZM21 18.3333C19.3891 18.3333 18.0833 19.6392 18.0833 21.25C18.0833 22.8608 19.3891 24.1667 21 24.1667C22.6108 24.1667 23.9166 22.8608 23.9166 21.25C23.9166 19.6392 22.6108 18.3333 21 18.3333Z"
                fill="var(--color-primary)"/>
        </svg>
        <div class="text-warm-white">
          <h2 class="hidden sm:inline-block text-2xl font-bold">Visítanos</h2>
          <p class="text-sm mt-3">Calle Ejemplo 123, Ciudad, País</p>
        </div>
      </div>

      <!-- Slide 2: Llámanos -->
      <div class="flex flex-none w-full sm:flex-1 gap-4 lg:gap-6 justify-center sm:justify-start">
        <svg width="51" height="51" viewBox="0 0 51 51" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M31.6458 11.9792C33.458 12.3327 35.2569 13.1319 36.5625 14.4375C37.8681 15.7431 38.6673 17.542 39.0208 19.3542M32.875 3.375C36.64 3.79326 40.028 5.61471 42.7083 8.29167C45.3887 10.9686 47.202 14.3605 47.625 18.125M47.6237 36.5051V43.1666C47.634 45.7131 45.3443 47.8395 42.7734 47.6077C20.5835 47.625 3.37515 30.2568 3.39252 8.21591C3.16097 5.65866 5.27686 3.37761 7.82008 3.37522H14.4948C15.5746 3.36461 16.6214 3.74621 17.4401 4.4489C19.7676 6.44667 21.2648 13.2274 20.6887 15.923C20.239 18.0276 18.1175 19.4999 16.6752 20.9394C19.8425 26.4985 24.4545 31.1014 30.0247 34.2624C31.467 32.823 32.9423 30.7057 35.051 30.2568C37.7561 29.6811 44.5805 31.1803 46.5702 33.5241C47.2758 34.3552 47.6507 35.4161 47.6237 36.5051Z"
                stroke="var(--color-primary)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="text-warm-white">
          <h2 class="text-2xl font-bold">Llámanos</h2>
          <p class="text-sm mt-3">+123 456 7890</p>
        </div>
      </div>

      <!-- Slide 3: Escríbenos -->
      <div class="flex flex-none w-full sm:flex-1 gap-4 lg:gap-6 justify-center sm:justify-start">
        <svg width="55" height="45" viewBox="0 0 55 45" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M3.91825 4.33491C4.40836 3.8448 5.08545 3.54166 5.83333 3.54166H49.1667C49.9146 3.54166 50.5916 3.8448 51.0817 4.33491M3.91825 4.33491C3.42814 4.82502 3.125 5.50211 3.125 6.24999V38.75C3.125 40.2458 4.33756 41.4583 5.83333 41.4583H49.1667C50.6624 41.4583 51.875 40.2458 51.875 38.75V6.24999C51.875 5.5021 51.5719 4.82502 51.0817 4.33491M3.91825 4.33491L23.6698 24.0864C25.7852 26.2017 29.2148 26.2017 31.3302 24.0864L51.0817 4.33491"
                stroke="var(--color-primary)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="text-warm-white">
          <h2 class="text-2xl font-bold">Escríbenos</h2>
          <p class="text-sm mt-3">contacto&#64;reklik.com</p>
        </div>
      </div>

    </div>
  </div>

  <!-- Flecha derecha -->
  <svg (click)="nextSlide()" width="24" height="24" viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg" class="sm:hidden flex-none cursor-pointer">
    <path d="M9.5 18.25L15.75 12L9.5 5.75M23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12Z"
          stroke="var(--color-warm-white)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

</div>

<!-- Indicadores de slide (solo móvil) -->
     <div class="sm:hidden flex justify-center gap-2 mt-4">
       <button *ngFor="let _ of [0,1,2]; let i = index"
               (click)="goToSlide(i)"
               class="w-2 h-2 rounded-full"
               [class.bg-primary]="currentSlide === i"
               [class.bg-warm-white]="currentSlide !== i"></button>
     </div>

     <!-- _________________________________ -->


    <div class="hidden sm:flex relative z-30 justify-center sm:justify-between gap-5 items-center mt-6 mx-auto max-w-[1300px] rounded-[90px] py-3 px-3 sm:p-8 lg:p-14 bg-gradient-to-r from-secondary via-secondary-light to-secondary">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sm:hidden flex-none">
            <path d="M14.5 18.25L8.25 12L14.5 5.75M0.75 12C0.75 18.2132 5.7868 23.25 12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12Z" stroke="var(--color-warm-white)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <div class="flex sm:flex-1 gap-4 lg:gap-6">
            <svg width="42" height="63" viewBox="0 0 42 63" fill="none" xmlns="http://www.w3.org/2000/svg" class="flex-none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M21 0.833344C32.2758 0.833344 41.4166 9.9742 41.4166 21.25C41.4166 24.6593 40.5834 27.8717 39.1039 30.6983L21 62.0833L3.31538 31.4595C1.57498 28.4542 0.583313 24.9693 0.583313 21.25C0.583313 9.9742 9.72416 0.833344 21 0.833344ZM21 6.66668C12.9458 6.66668 6.41665 13.1959 6.41665 21.25C6.41665 23.566 6.95093 25.7882 7.96198 27.7943L8.45197 28.6893L21 50.4167L33.6366 28.5362C34.9071 26.3423 35.5833 23.8555 35.5833 21.25C35.5833 13.1959 29.0541 6.66668 21 6.66668ZM21 12.5C25.8325 12.5 29.75 16.4175 29.75 21.25C29.75 26.0825 25.8325 30 21 30C16.1675 30 12.25 26.0825 12.25 21.25C12.25 16.4175 16.1675 12.5 21 12.5ZM21 18.3333C19.3891 18.3333 18.0833 19.6392 18.0833 21.25C18.0833 22.8608 19.3891 24.1667 21 24.1667C22.6108 24.1667 23.9166 22.8608 23.9166 21.25C23.9166 19.6392 22.6108 18.3333 21 18.3333Z" fill="var(--color-primary)"></path>
            </svg>
            <div class="text-warm-white">
                <h2 class="hidden sm:inline-block text-2xl font-bold">Visítanos</h2>
                <p class="text-sm mt-3">Calle Ejemplo 123, Ciudad, País</p>
            </div>
        </div>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="sm:hidden flex-none">
            <path d="M9.5 18.25L15.75 12L9.5 5.75M23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12Z" stroke="var(--color-warm-white)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>

        <span class="h-28 w-[1px] hidden sm:inline-block bg-primary"></span>

        <div class="hidden sm:flex flex-1 gap-4 lg:gap-6">
            <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.6458 11.9792C33.458 12.3327 35.2569 13.1319 36.5625 14.4375C37.8681 15.7431 38.6673 17.542 39.0208 19.3542M32.875 3.375C36.64 3.79326 40.028 5.61471 42.7083 8.29167C45.3887 10.9686 47.202 14.3605 47.625 18.125M47.6237 36.5051V43.1666C47.634 45.7131 45.3443 47.8395 42.7734 47.6077C20.5835 47.625 3.37515 30.2568 3.39252 8.21591C3.16097 5.65866 5.27686 3.37761 7.82008 3.37522H14.4948C15.5746 3.36461 16.6214 3.74621 17.4401 4.4489C19.7676 6.44667 21.2648 13.2274 20.6887 15.923C20.239 18.0276 18.1175 19.4999 16.6752 20.9394C19.8425 26.4985 24.4545 31.1014 30.0247 34.2624C31.467 32.823 32.9423 30.7057 35.051 30.2568C37.7561 29.6811 44.5805 31.1803 46.5702 33.5241C47.2758 34.3552 47.6507 35.4161 47.6237 36.5051Z" stroke="var(--color-primary)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="text-warm-white">
                <h2 class="text-2xl font-bold">Llámamos</h2>
                <p class="text-sm mt-3">+123 456 7890</p>
            </div>
        </div>

        <span class="hidden lg:inline-block h-28 w-[1px] bg-primary"></span>

        <div class="hidden lg:flex flex-1 gap-4 lg:gap-6">
            <svg width="55" height="45" viewBox="0 0 55 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.91825 4.33491C4.40836 3.8448 5.08545 3.54166 5.83333 3.54166H49.1667C49.9146 3.54166 50.5916 3.8448 51.0817 4.33491M3.91825 4.33491C3.42814 4.82502 3.125 5.50211 3.125 6.24999V38.75C3.125 40.2458 4.33756 41.4583 5.83333 41.4583H49.1667C50.6624 41.4583 51.875 40.2458 51.875 38.75V6.24999C51.875 5.5021 51.5719 4.82502 51.0817 4.33491M3.91825 4.33491L23.6698 24.0864C25.7852 26.2017 29.2148 26.2017 31.3302 24.0864L51.0817 4.33491" stroke="var(--color-primary)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="text-warm-white">
                <h2 class="text-2xl font-bold">Escríbenos</h2>
                <p class="text-sm mt-3">contacto&#64;reklik.com</p>
            </div>
        </div>
    </div>

</section>
  `
})
export class HomeComponent {
  isMenuOpen = false;
  currentSlide = 0;
  totalSlides = 3;
  loading = signal(true);
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Simulamos un "delay" de 3 segundos antes de mostrar el contenido
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
