// src/app/services/teacher.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private teachersSubject = new BehaviorSubject<Teacher[]>(this.getMockTeachers());
  public teachers$ = this.teachersSubject.asObservable();

  getTeachers(): Observable<Teacher[]> {
    return this.teachers$;
  }

  getTeacherById(id: number): Observable<Teacher | undefined> {
    return of(this.teachersSubject.value.find((t) => t.id === id));
  }

  addTeacher(teacher: Teacher): Observable<Teacher> {
    const teachers = this.teachersSubject.value;
    teacher.id = Math.max(0, ...teachers.map((t) => t.id)) + 1;
    teachers.push(teacher);
    this.teachersSubject.next(teachers);
    return of(teacher);
  }

  updateTeacher(id: number, update: Partial<Teacher>): Observable<Teacher | undefined> {
    const teachers = this.teachersSubject.value;
    const idx = teachers.findIndex((t) => t.id === id);
    if (idx !== -1) {
      teachers[idx] = { ...teachers[idx], ...update };
      this.teachersSubject.next(teachers);
      return of(teachers[idx]);
    }
    return of(undefined);
  }

  deleteTeacher(id: number): Observable<boolean> {
    this.teachersSubject.next(this.teachersSubject.value.filter((t) => t.id !== id));
    return of(true);
  }

  private getMockTeachers(): Teacher[] {
  return [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+91-8000000001',
      dateOfBirth: '1985-02-14',
      qualification: 'Ph.D. Computer Science',
      experience: '12',
      subjectSpecialization: 'Algorithms',
      status: 'Active',
      address: 'Bangalore'
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Teacher',
      email: 'teacher@school.com',
      phone: '+1-555-0002',
      dateOfBirth: '1985-05-15',
      qualification: 'M.Sc. Computer Science',
      experience: '10',
      subjectSpecialization: 'Web Development',
      status: 'Active',
      address: '456 Teacher Ave'
    },
    {
      id: 3,
      firstName: 'Priya',
      lastName: 'Mathur',
      email: 'priya.mathur@example.com',
      phone: '+91-8000000002',
      dateOfBirth: '1982-08-19',
      qualification: 'M.Sc. Mathematics',
      experience: '10',
      subjectSpecialization: 'Data Science',
      status: 'On Leave',
      address: 'Delhi'
    },
    {
      id: 10,
      firstName: 'Emily',
      lastName: 'Chen',
      email: 'emily.chen@school.com',
      phone: '+1-555-0020',
      dateOfBirth: '1990-08-01',
      qualification: 'Ph.D. in Mathematics',
      experience: '7',
      subjectSpecialization: 'Data Science',
      status: 'Active',
      address: '123 Teacher St'
    },
    {
      id: 12,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@school.com',
      phone: '+1-555-0030',
      dateOfBirth: '1982-04-18',
      qualification: 'M.Ed. Science',
      experience: '15',
      subjectSpecialization: 'Physics',
      status: 'Active',
      address: '789 Prof Ave'
    },
    {
      id: 17,
      firstName: 'Lisa',
      lastName: 'Anderson',
      email: 'lisa.anderson@school.com',
      phone: '+1-555-0040',
      dateOfBirth: '1988-11-11',
      qualification: 'MA English',
      experience: '9',
      subjectSpecialization: 'Literature',
      status: 'On Leave',
      address: '456 Lecturer Rd'
    },
    {
      id: 4,
      firstName: 'Arvind',
      lastName: 'Rao',
      email: 'arvind.rao@example.com',
      phone: '+91-8000000003',
      dateOfBirth: '1979-11-11',
      qualification: 'M.Tech Software Engineering',
      experience: '15',
      subjectSpecialization: 'Software Engineering',
      status: 'Active',
      address: 'Hyderabad'
    }
  ];
}
}