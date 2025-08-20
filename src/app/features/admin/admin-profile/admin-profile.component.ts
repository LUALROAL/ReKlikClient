// admin-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { AdminProfile } from '../../../core/models/users-models/admin-profile.model';
import { UserService } from '../../../core/services/users-services/user.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { UserUpdateData } from '../../../core/models/users-models/User-admin-update.model';
import { MessageModalComponent } from '../../../shared/components/message-modal/message-modal.component';
import { MessageModalService } from '../../../core/services/message-modal.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoadingComponent,
    MessageModalComponent
  ],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  user!: AdminProfile;
  loading = false;
  passwordLoading = false;
  showPasswordForm = false;

   // Propiedades para el modal
  modalVisible = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' | 'info' | 'warning' = 'info';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
      private messageService: MessageModalService
  ) {
    this.createForms();
  }

  ngOnInit(): void {
    this.loadUserData();

    this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.showModal(message.title, message.content, message.type);
      } else {
        this.hideModal();
      }
    });
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
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || ''
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user data:', err);
        this.toastr.error('No se pudo cargar la información del usuario', 'Error');
        this.loading = false;
      }
    });
  }

updateProfile(): void {
    if (this.profileForm.invalid) {
      this.messageService.showWarning('Advertencia', 'Por favor complete todos los campos requeridos');
      return;
    }

    this.loading = true;

    const userData: UserUpdateData = {
      id: this.user.id,
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      userType: this.user.userType,
      createdAt: this.user.createdAt
    };

    this.userService.updateCurrentUser(userData).subscribe({
      next: (response: any) => {
        // Verifica si la respuesta tiene la estructura esperada
        let updatedUser: AdminProfile;

        if (response && response.status && response.message) {
          // Usa el mensaje del backend
          this.messageService.showSuccess(response.status, response.message);
          updatedUser = response.user;
        } else if (response && response.user) {
          // Respuesta alternativa (solo el objeto user)
          updatedUser = response.user;
          this.messageService.showSuccess('Éxito', 'Perfil actualizado correctamente');
        } else {
          // Respuesta inesperada - usar datos del formulario
          updatedUser = {
            ...this.user,
            name: userData.name,
            email: userData.email,
            phone: userData.phone
          };
          this.messageService.showSuccess('Éxito', 'Perfil actualizado correctamente');
        }

        // Actualizar el usuario en el servicio de autenticación
        this.authService.notifyUserUpdated(updatedUser);

        this.user = updatedUser;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error updating profile:', error);

        // Manejo de errores con mensajes del backend
        if (error.error && error.error.message) {
          this.messageService.showError('Error', error.error.message);
        } else {
          this.messageService.showError('Error', 'Error al actualizar el perfil');
        }
        this.loading = false;
      }
    });
  }

updatePassword(): void {
    if (this.passwordForm.invalid) {
      this.messageService.showWarning('Advertencia', 'Por favor complete todos los campos requeridos');
      return;
    }

    this.passwordLoading = true;
    const { currentPassword, newPassword } = this.passwordForm.value;

    this.userService.updatePassword(this.user.id, { currentPassword, newPassword }).subscribe({
      next: (response: any) => {
        // Maneja diferentes formatos de respuesta
        if (response && response.message) {
          this.messageService.showSuccess('Éxito', response.message);
        } else if (response && response.status) {
          this.messageService.showSuccess(response.status, 'Contraseña actualizada correctamente');
        } else {
          this.messageService.showSuccess('Éxito', 'Contraseña actualizada correctamente');
        }

        this.passwordForm.reset();
        this.showPasswordForm = false;
        this.passwordLoading = false;
      },
      error: (err) => {
        // Maneja errores con mensajes del backend
        const errorMessage = err.error?.message || 'Error al actualizar la contraseña';
        this.messageService.showError('Error', errorMessage);
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

  showModal(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = type;
    this.modalVisible = true;
  }

  // Método para ocultar el modal
  hideModal(): void {
    this.modalVisible = false;
  }

}
