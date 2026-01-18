export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher' | 'admin';
  phone?: string;
  dateOfBirth?:  string;
  address?: string;
}