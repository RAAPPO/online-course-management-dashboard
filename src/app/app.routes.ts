import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { SettingsComponent } from './components/settings/settings.component';

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
  
  // Courses List - All authenticated users
  { 
    path: 'courses', 
    component: CourseListComponent,
    canActivate: [authGuard]
  },
  
  // Add New Course - Admin & Teacher only
  { 
    path:  'courses/new', 
    component: AddCourseComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  // Course Details - All authenticated users
  { 
    path: 'courses/:id', 
    component: CourseDetailComponent,
    canActivate:  [authGuard]
  },
  
  // Edit Course - Admin & Teacher only
  { 
    path: 'courses/: id/edit', 
    component: EditCourseComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  // Students List - Admin & Teacher
  { 
    path: 'students', 
    component:  StudentListComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  // Add Student - Admin & Teacher
  { 
    path:  'students/new', 
    component: AddStudentComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  // Edit Student - Admin & Teacher
  { 
    path: 'students/:id/edit', 
    component: EditStudentComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  // Enrollment - Admin & Teacher
  { 
    path: 'enrollment', 
    component: EnrollmentComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
    { 
  path: 'settings', 
  component: SettingsComponent,
  canActivate:  [authGuard]
},
  { path: '**', redirectTo: '/login' }
  

];