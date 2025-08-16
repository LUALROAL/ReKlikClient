import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="bg-secondary overflow-hidden pb-9 px-4 md:px-8">
    <header class="flex mx-auto justify-between items-center max-w-[1300px] py-4">
        <div class="flex items-center gap-3">
            <svg class="w-10 md:w-16 lg:w-24 h-10 md:h-16 lg:h-24" viewBox="0 0 102 103" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100.772 41.2578C102.108 48.9756 93.9123 46.9199 93.9123 46.9199C90.4822 37.2546 84.9941 38.1563 84.9941 38.1563C89.2907 41.2939 89.6157 43.9626 89.6157 43.9626C78.17 35.8481 62.6082 42.3758 56.6868 45.4413C53.365 40.7529 46.6493 30.2581 49.0323 25.4976C52.1735 19.2585 58.5643 22.8289 58.5643 22.8289C71.4904 22.6125 70.7682 17.9962 70.7682 17.9962C67.3382 20.665 57.2284 17.9962 57.2284 17.9962C66.0022 17.9962 69.7212 14.4259 69.7212 14.4259C63.1859 16.0488 55.8925 9.08833 55.8925 9.08833C53.2206 -4.58009 40.8723 1.22629 40.8723 1.22629C48.599 -0.108098 46.541 8.07853 46.541 8.07853C36.8645 11.5046 37.7672 16.9864 37.7672 16.9864C40.9084 12.6948 43.5803 12.3702 43.5803 12.3702C34.7343 24.8124 43.2553 42.1233 45.7828 46.6314C41.1612 49.8411 30.3293 56.9098 25.455 54.4574C19.2086 51.3198 22.7831 44.9364 22.7831 44.9364C22.6387 32.0253 18.0171 32.7466 18.0171 32.7466C20.6889 36.1727 18.0171 46.2708 18.0171 46.2708C18.0171 37.5071 14.4426 33.7925 14.4426 33.7925C16.0674 40.3201 9.09886 47.6051 9.09886 47.6051C-4.58539 50.2739 1.2277 62.6079 1.2277 62.6079C-0.108225 54.8901 8.08788 56.9458 8.08788 56.9458C11.518 66.6111 17.0061 65.7095 17.0061 65.7095C12.7095 62.5719 12.3845 59.9031 12.3845 59.9031C24.4801 68.4864 41.1973 60.6965 46.2521 57.9556C49.6461 62.8243 55.9647 72.8502 53.6178 77.5025C50.4766 83.7417 44.0858 80.1713 44.0858 80.1713C31.1597 80.3156 31.8819 84.9318 31.8819 84.9318C35.312 82.263 45.4217 84.9318 45.4217 84.9318C36.6479 84.9318 32.9289 88.5022 32.9289 88.5022C39.4642 86.8793 46.7576 93.8397 46.7576 93.8397C49.4295 107.508 61.7778 101.702 61.7778 101.702C54.0511 103.036 56.1091 94.8495 56.1091 94.8495C65.7856 91.4234 64.8829 85.9416 64.8829 85.9416C61.7417 90.2333 59.0698 90.5579 59.0698 90.5579C67.7353 78.4042 59.7558 61.5621 57.0479 56.6212C61.9583 53.1951 71.8875 47.0642 76.473 49.3723C82.7194 52.5099 79.1449 58.8933 79.1449 58.8933C79.2893 71.8044 83.9109 71.0831 83.9109 71.0831C81.239 67.657 83.9109 57.5589 83.9109 57.5589C83.9109 66.3226 87.4854 70.0372 87.4854 70.0372C85.8606 63.5095 92.8291 56.2245 92.8291 56.2245C106.586 53.5918 100.772 41.2578 100.772 41.2578Z"
                    fill="url(#paint0_linear_1_6)"></path>
                <defs>
                    <linearGradient id="paint0_linear_1_6" x1="50.9966" y1="0.00115967" x2="50.9966" y2="102.927"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                </defs>
            </svg>
            <svg class="w-8 md:w-12 lg:w-20 leading-5 md:h-7 lg:h-12" viewBox="0 0 76 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H2.32086V27.4049H9.25075V0H11.5716V46H9.25075V29.7131H2.32086V46H0V0Z"
                    fill="url(#paint0_linear_1_10)"></path>
                <path
                    d="M28.7329 0L22.9798 29.7131V46H20.6589V29.7131L14.8731 0H16.9978L21.8357 24.7717L26.6408 0H28.7329Z"
                    fill="url(#paint1_linear_1_10)"></path>
                <path
                    d="M38.997 46H32.0344V0H38.9643C41.5467 0 43.5733 2.04806 43.5733 4.58375V41.3837C43.606 43.8869 41.5467 46 38.997 46ZM34.3553 2.30813V43.6919H38.9643C40.2065 43.6919 41.2852 42.6516 41.2852 41.3837V4.58375C41.2852 3.34841 40.2392 2.27562 38.9643 2.27562H34.3553V2.30813Z"
                    fill="url(#paint2_linear_1_10)"></path>
                <path
                    d="M58.806 46H56.4198L52.3338 29.7131H49.5553V46H47.2344V0H54.1643C56.7467 0 58.7733 2.04806 58.7733 4.58375V25.0968C58.7733 27.4049 56.9755 29.3555 54.6873 29.6155L58.806 46ZM49.5553 27.4049H54.1643C55.4064 27.4049 56.4852 26.3647 56.4852 25.0968V4.58375C56.4852 3.34841 55.4391 2.27562 54.1643 2.27562H49.5553V27.4049Z"
                    fill="url(#paint3_linear_1_10)"></path>
                <path
                    d="M65.8013 29.7131L64.1996 46H62.1075L66.7492 0H71.3583L75.9673 46H73.8753L72.2735 29.7131H65.8013ZM69.495 2.30813H68.5798L66.0628 27.4049H72.012L69.495 2.30813Z"
                    fill="url(#paint4_linear_1_10)"></path>
                <defs>
                    <linearGradient id="paint0_linear_1_10" x1="5.78581" y1="0" x2="5.78581" y2="46"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                    <linearGradient id="paint1_linear_1_10" x1="21.803" y1="0" x2="21.803" y2="46"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                    <linearGradient id="paint2_linear_1_10" x1="37.8041" y1="0" x2="37.8041" y2="46"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                    <linearGradient id="paint3_linear_1_10" x1="53.0202" y1="0" x2="53.0202" y2="46"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                    <linearGradient id="paint4_linear_1_10" x1="69.0374" y1="0" x2="69.0374" y2="46"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="var(--color-primary)"></stop>
                        <stop offset="1" stop-color="var(--color-primary-dark)"></stop>
                    </linearGradient>
                </defs>
            </svg>
        </div>
        <nav class="hidden sm:inline-block">
            <ul class="flex gap-3 md:gap-5 lg:gap-10">
                <li class="uppercase font-bold text-xs text-warm-white"><a href="#">INICIO</a></li>
                <li class="uppercase font-bold text-xs text-warm-white"><a href="#">SERVICIOS</a></li>
                <li class="uppercase font-bold text-xs text-warm-white"><a href="#">TECNOLOGÍAS</a></li>
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
        <!-- <svg class="absolute sm:right-28 md:right-6" width="383" height="846" viewBox="0 0 383 846" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.19293 0C-0.0879101 140.127 37.2087 433.314 212.642 485.053C388.075 536.792 391.776 746.576 371.697 845" stroke="url(#paint0_linear_16_173)" stroke-width="6"></path>
            <defs>
                <linearGradient id="paint0_linear_16_173" x1="16.5" y1="39.5" x2="363" y2="814" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0104167" stop-color="var(--color-secondary-dark)"></stop>
                    <stop offset="0.229167" stop-color="var(--color-primary)"></stop>
                    <stop offset="0.776042" stop-color="var(--color-primary-dark)"></stop>
                    <stop offset="1" stop-color="var(--color-secondary-dark)"></stop>
                </linearGradient>
            </defs>
        </svg> -->
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
            <h1 class="text-3xl md:text-[36px] lg:text-[46px] leading-[56px] text-warm-white font-bold">
                <span class="text-primary">Sumérgete </span>en las profundidades
                de<span class="text-primary"> Reklik</span></h1>
            <p class="text-base text-warm-white mt-4 md:mt-9 mb-10 md:mb-16">Descubre la plataforma que estabas buscando para potenciar tu negocio con soluciones tecnológicas innovadoras y personalizadas.</p>
            <div class="flex gap-6 sm:gap-10">
                <button class="uppercase font-bold text-xs rounded-[40px] py-2 lg:py-4 px-4 lg:px-9 text-secondary bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-colors duration-300">EMPEZAR AHORA</button>
                <svg class="w-8 h-6 sm:w-12 sm:h-9" viewBox="0 0 46 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43.8334 19L2.16669 19M43.8334 19L27.1667 35.6667M43.8334 19L27.1667 2.33333" stroke="var(--color-primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        </div>

        <div class="p-4 z-20 bg-black rounded-[100px] md:rounded-bl-[200px] lg:rounded-bl-[250px] bg-opacity-20">
            <img class="max-w-[490px] w-full" src="https://iili.io/39E0tiQ.png" alt="Imagen de realidad virtual">
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

  constructor(private router: Router) {}

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
