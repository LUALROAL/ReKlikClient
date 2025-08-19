import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminProfile } from '../../../core/models/users-models/admin-profile.model';
import { UserService } from '../../../core/services/users-services/user.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  user!: AdminProfile;
  loading = false;
  passwordLoading = false;
  showPasswordForm = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.createForms();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  createForms(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('newPassword')!.value;
    const confirmPass = group.get('confirmPassword')!.value;
    return pass === confirmPass ? null : { notSame: true };
  }

loadUserData(): void {
    this.loading = true;
    this.userService.getCurrentUser().subscribe({
        next: (user) => {
            this.user = user;
            this.profileForm.patchValue({
                name: user.name,
                email: user.email,
                phone: user.phone
            });
            this.loading = false;
        },
        error: (err) => {
            this.toastr.error('No se pudo cargar la información del usuario', 'Error');
            this.loading = false;
        }
    });
  }

updateProfile(): void {
    if (this.profileForm.invalid) {
        this.toastr.warning('Por favor complete todos los campos requeridos', 'Advertencia');
        return;
    }

    this.loading = true;
    this.userService.updateCurrentUser(this.profileForm.value).subscribe({
        next: (updatedUser) => {
            this.user = updatedUser;
            this.toastr.success('Perfil actualizado correctamente', 'Éxito');
            this.loading = false;
        },
        error: (err) => {
            this.toastr.error('Error al actualizar el perfil', 'Error');
            this.loading = false;
        }
    });
}

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      this.toastr.warning('Por favor complete todos los campos requeridos', 'Advertencia');
      return;
    }

    this.passwordLoading = true;
    const { currentPassword, newPassword } = this.passwordForm.value;

    this.userService.updatePassword(this.user.id, { currentPassword, newPassword }).subscribe({
      next: () => {
        this.toastr.success('Contraseña actualizada correctamente', 'Éxito');
        this.passwordForm.reset();
        this.showPasswordForm = false;
        this.passwordLoading = false;
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Error al actualizar la contraseña', 'Error');
        this.passwordLoading = false;
      }
    });
  }

  togglePasswordForm(): void {
    this.showPasswordForm = !this.showPasswordForm;
    if (!this.showPasswordForm) {
      this.passwordForm.reset();
    }
  }
}
