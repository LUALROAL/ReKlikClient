// admin-profile.model.ts
export interface AdminProfile {
  id: number;
  name: string;
  email: string;
  userType: string;
  phone: string;
  createdAt?: string;
  // Campos para el formulario de contraseña (no vienen del API)
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
