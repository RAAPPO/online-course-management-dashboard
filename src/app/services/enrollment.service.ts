import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  getEnrollmentById(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`);
  }

  // json-server allows filtering via query params: ?studentId=1
  getEnrollmentsByStudent(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?studentId=${studentId}`);
  }

  getEnrollmentsByCourse(courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiUrl}?courseId=${courseId}`);
  }

  addEnrollment(enrollment: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  updateEnrollment(id: number, enrollment: Partial<Enrollment>): Observable<Enrollment> {
    return this.http.patch<Enrollment>(`${this.apiUrl}/${id}`, enrollment);
  }

  deleteEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  dropEnrollment(id: number): Observable<Enrollment> {
    return this.updateEnrollment(id, { status: 'Dropped' });
  }

  // Complex logic: Fetch all and calculate manually since backend is mock
  getEnrollmentStats(): Observable<{
    totalCourses: number;
    totalStudents: number;
    activeEnrollments: number;
    completedEnrollments: number;
  }> {
    return this.getEnrollments().pipe(
      map(enrollments => {
        const uniqueCourseIds = new Set(enrollments.map(e => e.courseId));
        const uniqueStudentIds = new Set(enrollments.map(e => e.studentId));
        
        return {
          totalCourses: uniqueCourseIds.size,
          totalStudents: uniqueStudentIds.size,
          activeEnrollments: enrollments.filter(e => e.status === 'Enrolled').length,
          completedEnrollments: enrollments.filter(e => e.status === 'Completed').length
        };
      })
    );
  }
}