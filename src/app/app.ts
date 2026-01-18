import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <div class="app-container">
      <!-- Top Navbar -->
      <mat-toolbar color="primary" class="top-navbar" *ngIf="isAuthenticated">
        <!-- Logo & Brand -->
        <div class="brand" routerLink="/dashboard">
          <mat-icon class="logo-icon">school</mat-icon>
          <span class="brand-name">Course Management System</span>
        </div>

        <!-- Navigation Links -->
<nav class="nav-links">
  <a mat-button [routerLink]="getDashboardRoute()" routerLinkActive="active-link">
    <mat-icon>dashboard</mat-icon>
    <span>Dashboard</span>
  </a>
  <a mat-button routerLink="/courses" routerLinkActive="active-link">
    <mat-icon>school</mat-icon>
    <span>Courses</span>
  </a>
  <a mat-button routerLink="/students" routerLinkActive="active-link" *ngIf="isAdmin() || isTeacher()">
    <mat-icon>people</mat-icon>
    <span>Students</span>
  </a>
  <a mat-button routerLink="/enrollment" routerLinkActive="active-link" *ngIf="isAdmin() || isTeacher()">
    <mat-icon>how_to_reg</mat-icon>
    <span>Enrollment</span>
  </a>
</nav>

        <!-- Spacer -->
        <span class="spacer"></span>

        <!-- User Menu -->
        <div class="user-section">
          <div class="role-badge" [ngClass]="getRoleBadgeClass()">
            {{ getRoleDisplay() }}
          </div>
          <button mat-button [matMenuTriggerFor]="userMenu" class="user-button">
            <mat-icon>account_circle</mat-icon>
            <span class="username">{{ currentUser?.firstName || 'User' }}</span>
            <mat-icon class="dropdown-icon">arrow_drop_down</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <div class="user-menu-header" mat-menu-item disabled>
              <mat-icon>person</mat-icon>
              <span>{{ currentUser?.email }}</span>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Settings</span>
            </button>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </mat-toolbar>

      <!-- Main Content -->
      <main class="main-content" [class.no-navbar]="!isAuthenticated">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    .top-navbar {
      display: flex;
      align-items: center;
      padding: 0 24px;
      height: 64px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-right: 40px;
      cursor: pointer;
    }

    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .brand-name {
      font-size: 20px;
      font-weight: 600;
      white-space: nowrap;
    }

    .nav-links {
      display: flex;
      gap: 8px;
    }

    .nav-links a {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 16px;
      height: 48px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .nav-links a:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .nav-links a.active-link {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }

    .nav-links mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .spacer {
      flex:  1;
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .role-badge {
      padding: 4px 12px;
      border-radius:  12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .role-badge.admin {
      background-color: #ff5722;
      color: white;
    }

    .role-badge.teacher {
      background-color: #2196f3;
      color: white;
    }

    .role-badge.student {
      background-color: #4caf50;
      color: white;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .username {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:  nowrap;
    }

    .dropdown-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .user-menu-header {
      pointer-events: none;
      opacity: 0.7;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
      background-color: #f5f5f5;
    }

    .main-content.no-navbar {
      height: 100vh;
    }

    /* Responsive Design */
    @media (max-width: 960px) {
      .brand-name {
        display: none;
      }

      .nav-links a span {
        display: none;
      }

      .nav-links {
        gap: 4px;
      }

      .nav-links a {
        min-width: 48px;
        padding: 0 12px;
        justify-content: center;
      }

      .username {
        display: none;
      }

      .role-badge {
        display: none;
      }
    }

    @media (max-width: 600px) {
      .top-navbar {
        padding: 0 12px;
      }

      .brand {
        margin-right: 12px;
      }
    }
  `]
})
export class AppComponent {
  title = 'Course Management System';
  isAuthenticated = false;
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated$.subscribe((auth:  boolean) => {
      this.isAuthenticated = auth;
    });

    this.authService.currentUser$.subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isTeacher(): boolean {
    return this.authService.isTeacher();
  }

  isStudent(): boolean {
    return this.authService.isStudent();
  }

  getRoleDisplay(): string {
    if (this.isAdmin()) return 'Admin';
    if (this.isTeacher()) return 'Teacher';
    if (this.isStudent()) return 'Student';
    return 'User';
  }

  getRoleBadgeClass(): string {
    if (this.isAdmin()) return 'admin';
    if (this.isTeacher()) return 'teacher';
    if (this.isStudent()) return 'student';
    return '';
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }

  getDashboardRoute(): string {
  if (this.isAdmin()) return '/dashboard';
  if (this.isTeacher()) return '/teacher-dashboard';
  if (this.isStudent()) return '/student-dashboard';
  return '/login';
}
}