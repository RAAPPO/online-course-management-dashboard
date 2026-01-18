export interface Student {
  id: number;
  firstName: string;
  lastName:  string;
  email: string;
  phone: string;
  dateOfBirth: string;
  enrollmentDate: string;
  major: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  gpa?: number;
  address?: string;
  avatarUrl?: string;
}