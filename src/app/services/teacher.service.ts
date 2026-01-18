import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private teachersSubject = new BehaviorSubject<User[]>(this.getMockTeachers());
  public teachers$ = this.teachersSubject.asObservable();

  getTeachers(): Observable<User[]> {
    return this.teachers$;
  }

  getTeacherById(id: number): Observable<User | undefined> {
    return of(this.teachersSubject.value.find(t => t.id === id));
  }

  addTeacher(teacher: User): Observable<User> {
    const teachers = this.teachersSubject.value;
    teacher.id = Math.max(0, ...teachers.map(t => t.id)) + 1;
    teachers.push(teacher);
    this.teachersSubject.next(teachers);
    return of(teacher);
  }

  updateTeacher(id: number, patch: Partial<User>): Observable<User | undefined> {
    const teachers = this.teachersSubject.value;
    const idx = teachers.findIndex(t => t.id === id);
    if (idx !== -1) {
      teachers[idx] = { ...teachers[idx], ...patch };
      this.teachersSubject.next(teachers);
      return of(teachers[idx]);
    }
    return of(undefined);
  }

  deleteTeacher(id: number): Observable<boolean> {
    this.teachersSubject.next(this.teachersSubject.value.filter(t => t.id !== id));
    return of(true);
  }

  private getMockTeachers(): User[] {
// Sample data: replicate structure or update as you need!
    return [
      {
        id: 2,
        firstName: 'John',
        lastName: 'Teacher',
        email: 'teacher@school.com',
        password: 'teacher123',
        role: 'teacher',
        phone: '+1-555-0002',
        dateOfBirth: '1985-05-15',
        address: '456 Teacher Ave'
      }
    ];
  }
}