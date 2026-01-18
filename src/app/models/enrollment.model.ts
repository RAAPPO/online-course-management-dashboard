export interface Enrollment {
  id: number;
  studentId: number;
  courseId:  number;
  enrollmentDate:  string;
  status: 'Enrolled' | 'Completed' | 'Dropped';
  grade?: string;
  progress?: number;
}