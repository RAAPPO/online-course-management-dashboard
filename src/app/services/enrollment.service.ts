import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn:  'root'
})
export class EnrollmentService {
  private enrollmentsSubject = new BehaviorSubject<Enrollment[]>([]);
  public enrollments$ = this.enrollmentsSubject.asObservable();

  constructor() {
    this.initializeEnrollments();
  }

  private initializeEnrollments() {
    const mockEnrollments: Enrollment[] = [
      {
        id:  1,
        studentId:  1,
        courseId:  1,
        enrollmentDate: '2024-01-15',
        status: 'Enrolled',
        grade: undefined
      },
      {
        id: 2,
        studentId: 2,
        courseId: 1,
        enrollmentDate: '2024-01-16',
        status: 'Enrolled',
        grade: 'A'
      },
      {
        id: 3,
        studentId: 1,
        courseId: 2,
        enrollmentDate: '2024-01-10',
        status: 'Completed',
        grade: 'B+'
      },
      {
        id: 4,
        studentId: 3,
        courseId: 3,
        enrollmentDate: '2024-02-01',
        status: 'Enrolled',
        grade: undefined
      },
      {
        id: 5,
        studentId: 2,
        courseId: 4,
        enrollmentDate: '2024-01-20',
        status: 'Completed',
        grade:  'A-'
      }
    ];
    this.enrollmentsSubject.next(mockEnrollments);
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.enrollments$;
  }

  getEnrollmentById(id: number): Observable<Enrollment | undefined> {
    return new Observable(observer => {
      const enrollment = this.enrollmentsSubject.value.find(e => e.id === id);
      observer.next(enrollment);
      observer.complete();
    });
  }

  getEnrollmentStats(): Observable<{
    totalCourses: number;
    totalStudents: number;
    activeEnrollments: number;
    completedEnrollments:  number;
  }> {
    return new Observable(observer => {
      const enrollments = this. enrollmentsSubject.value;
      
      const uniqueCourseIds = new Set(enrollments.map(e => e.courseId));
      const uniqueStudentIds = new Set(enrollments.map(e => e.studentId));
      
      const stats = {
        totalCourses: uniqueCourseIds.size,
        totalStudents: uniqueStudentIds.size,
        activeEnrollments:  enrollments.filter(e => e.status === 'Enrolled').length,
        completedEnrollments: enrollments.filter(e => e.status === 'Completed').length
      };
      observer.next(stats);
      observer.complete();
    });
  }

  addEnrollment(enrollment: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return new Observable(observer => {
      const enrollments = this.enrollmentsSubject.value;
      const newEnrollment = {
        ...enrollment,
        id: Math.max(0, ...enrollments.map(e => e. id)) + 1
      };
      this.enrollmentsSubject.next([...enrollments, newEnrollment]);
      observer.next(newEnrollment);
      observer.complete();
    });
  }

  updateEnrollment(id: number, enrollment: Partial<Enrollment>): Observable<void> {
    return new Observable(observer => {
      const enrollments = this.enrollmentsSubject.value;
      const index = enrollments.findIndex(e => e.id === id);
      if (index !== -1) {
        enrollments[index] = { ...enrollments[index], ...enrollment };
        this.enrollmentsSubject.next([...enrollments]);
      }
      observer.next();
      observer.complete();
    });
  }

  deleteEnrollment(id: number): Observable<void> {
    return new Observable(observer => {
      const enrollments = this.enrollmentsSubject.value.filter(e => e.id !== id);
      this.enrollmentsSubject.next(enrollments);
      observer.next();
      observer.complete();
    });
  }

  dropEnrollment(id: number): Observable<void> {
    return this.updateEnrollment(id, { status: 'Dropped' });
  }

  getEnrollmentsByStudent(studentId: number): Observable<Enrollment[]> {
    return new Observable(observer => {
      const enrollments = this.enrollmentsSubject.value.filter(e => e.studentId === studentId);
      observer.next(enrollments);
      observer.complete();
    });
  }

  getEnrollmentsByCourse(courseId: number): Observable<Enrollment[]> {
    return new Observable(observer => {
      const enrollments = this.enrollmentsSubject.value.filter(e => e.courseId === courseId);
      observer.next(enrollments);
      observer.complete();
    });
  }
}
