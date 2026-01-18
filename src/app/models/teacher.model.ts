// src/app/models/teacher.model.ts
export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  qualification: string;
  experience: string;
  subjectSpecialization: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  address?: string;
  avatarUrl?: string;
}