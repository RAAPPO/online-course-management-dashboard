import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private mockUsers: User[] = [
    {
      id: 1,
      email: 'admin@school.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      phone: '+1-555-0001',
      dateOfBirth: '1980-01-01',
      address: '123 Admin St'
    },
    {
      id: 2,
      email: 'teacher@school.com',
      password: 'teacher123',
      firstName: 'John',
      lastName: 'Teacher',
      role: 'teacher',
      phone: '+1-555-0002',
      dateOfBirth: '1985-05-15',
      address: '456 Teacher Ave'
    },
    {
      id: 3,
      email: 'student@school.com',
      password: 'student123',
      firstName: 'Alice',
      lastName: 'Student',
      role: 'student',
      phone: '+1-555-0003',
      dateOfBirth: '2000-09-20',
      address: '789 Student Rd'
    }
  ];

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<{ success: boolean; message?: string; user?: User }> {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userWithoutPassword = { ...user };
      delete (userWithoutPassword as any).password;
      
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      this.currentUserSubject.next(userWithoutPassword);
      this.isAuthenticatedSubject.next(true);
      
      return of({ success: true, user: userWithoutPassword }).pipe(delay(500));
    } else {
      return of({ success: false, message: 'Invalid email or password' }).pipe(delay(500));
    }
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
      observer.next();
      observer.complete();
    });
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // ✅ NEW:  Update user profile
  updateUserProfile(userId: number, updates: Partial<User>): Observable<boolean> {
    return new Observable(observer => {
      const userIndex = this.mockUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        // Update mock user
        this.mockUsers[userIndex] = { ...this.mockUsers[userIndex], ...updates };
        
        // Update current user if it's the same
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.id === userId) {
          const updatedUser = { ...currentUser, ...updates };
          delete (updatedUser as any).password;
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        }
        
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }

  // ✅ NEW: Change password
  changePassword(userId:  number, currentPassword: string, newPassword: string): Observable<{ success: boolean; message:  string }> {
    return new Observable(observer => {
      const user = this.mockUsers.find(u => u.id === userId);
      
      if (! user) {
        observer.next({ success: false, message: 'User not found' });
        observer.complete();
        return;
      }

      if (user.password !== currentPassword) {
        observer.next({ success: false, message:  'Current password is incorrect' });
        observer.complete();
        return;
      }

      // Update password
      user.password = newPassword;
      observer.next({ success: true, message: 'Password changed successfully' });
      observer.complete();
    });
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isTeacher(): boolean {
    return this.currentUserSubject.value?.role === 'teacher';
  }

  isStudent(): boolean {
    return this.currentUserSubject.value?.role === 'student';
  }

  hasRole(roles: string[]): boolean {
    const currentRole = this.currentUserSubject.value?.role;
    return currentRole ?  roles.includes(currentRole) : false;
  }
}