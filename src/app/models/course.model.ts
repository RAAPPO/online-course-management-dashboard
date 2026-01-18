export interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  instructor: string;
  teacherId?:  number;  // Add this line if missing
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  startDate: string;
  endDate: string;
  price: string;
  capacity: number;
  enrolled: number;
  status: 'Active' | 'Inactive';
  imageUrl:  string;
  syllabus?: string[];
  prerequisites?: string[];
}