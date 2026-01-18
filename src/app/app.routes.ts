import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  // Admin Dashboard
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  
  // Student Dashboard
  { 
    path: 'student-dashboard', 
    component:  StudentDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['student'] }
  },
  
  // Teacher Dashboard
  { 
    path: 'teacher-dashboard', 
    component: TeacherDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data:  { roles: ['teacher'] }
  },
  
  // Courses - ALL AUTHENTICATED USERS CAN VIEW
  { 
    path:  'courses', 
    component: CourseListComponent,
    canActivate: [authGuard]  // Only auth required, no role restriction
  },
  
  // Course Details - ALL AUTHENTICATED USERS CAN VIEW
  { 
    path: 'courses/:id', 
    component:  CourseListComponent,  // For now, redirect to course list
    canActivate: [authGuard]
  },
  
  // Course Create/Edit - Only admin & teacher
  { 
    path: 'courses/new', 
    component: CourseListComponent,  // For now, redirect to course list
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  { 
    path: 'courses/: id/edit', 
    component: CourseListComponent,  // For now, redirect to course list
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  // Students (Only admin & teacher)
  { 
    path: 'students', 
    component: StudentListComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  // Enrollment (Only admin & teacher)
  { 
    path: 'enrollment', 
    component: EnrollmentComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  { path: '**', redirectTo: '/login' }
];