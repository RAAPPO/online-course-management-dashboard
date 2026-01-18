import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsSubject = new BehaviorSubject<Student[]>(this.getMockStudents());
  public students$ = this.studentsSubject.asObservable();

  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  getStudentById(id:  number): Observable<Student | undefined> {
    const student = this.studentsSubject.value.find(s => s.id === id);
    return of(student);
  }

  addStudent(student: Student): Observable<Student> {
    const students = this.studentsSubject.value;
    student.id = Math.max(...students.map(s => s.id)) + 1;
    students.push(student);
    this.studentsSubject.next(students);
    return of(student);
  }

  updateStudent(id: number, student: Partial<Student>): Observable<Student | undefined> {
    const students = this.studentsSubject.value;
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
      students[index] = { ...students[index], ...student };
      this.studentsSubject.next(students);
      return of(students[index]);
    }
    return of(undefined);
  }

  deleteStudent(id: number): Observable<boolean> {
    const students = this.studentsSubject.value.filter(s => s.id !== id);
    this.studentsSubject.next(students);
    return of(true);
  }

  private getMockStudents(): Student[] {
    return [
      {
        id: 1,
        firstName: 'Aditya',
        lastName: 'V J',
        email: 'aditya.vj@example.com',
        phone: '+91-9876543210',
        dateOfBirth: '2003-05-15',
        enrollmentDate: '2024-08-01',
        major: 'Computer Science',
        status: 'Active',
        gpa: 3.8,
        address: 'Bangalore, India'
      },
      {
        id: 2,
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91-9876543211',
        dateOfBirth: '2002-08-22',
        enrollmentDate: '2024-08-01',
        major: 'Information Technology',
        status: 'Active',
        gpa: 3.9,
        address: 'Mumbai, India'
      },
      {
        id:  3,
        firstName: 'Rahul',
        lastName: 'Kumar',
        email: 'rahul.kumar@example.com',
        phone: '+91-9876543212',
        dateOfBirth: '2003-02-10',
        enrollmentDate: '2024-08-01',
        major: 'Computer Science',
        status:  'Active',
        gpa: 3.6,
        address: 'Delhi, India'
      },
      {
        id: 4,
        firstName: 'Sneha',
        lastName: 'Patel',
        email:  'sneha.patel@example.com',
        phone: '+91-9876543213',
        dateOfBirth: '2002-11-30',
        enrollmentDate: '2024-08-01',
        major: 'Data Science',
        status: 'Active',
        gpa: 3.7,
        address: 'Pune, India'
      },
      {
        id: 5,
        firstName: 'Arjun',
        lastName: 'Reddy',
        email: 'arjun.reddy@example.com',
        phone: '+91-9876543214',
        dateOfBirth: '2003-07-18',
        enrollmentDate: '2024-08-01',
        major: 'Computer Science',
        status: 'Active',
        gpa: 3.5,
        address: 'Hyderabad, India'
      }
    ];
  }
}