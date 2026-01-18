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
import { SettingsComponent } from './components/settings/settings.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo:  '/login', pathMatch: 'full' },
  { path:  'login', component: LoginComponent },
  
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate:  [authGuard, roleGuard],
    data: { roles:  ['admin'] }
  },
  
  { 
    path: 'student-dashboard', 
    component:  StudentDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['student'] }
  },
  
  { 
    path: 'teacher-dashboard', 
    component:  TeacherDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data:  { roles: ['teacher'] }
  },
  
  { 
    path: 'courses', 
    component: CourseListComponent,
    canActivate:  [authGuard]
  },
  
  { 
    path: 'courses/new', 
    component: AddCourseComponent,
    canActivate: [authGuard, roleGuard],
    data:  { roles: ['admin', 'teacher'] }
  },
  
  { 
    path:  'courses/:id/edit',  // ✅ FIXED:  Removed space before : id
    component: EditCourseComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  { 
    path: 'courses/: id', 
    component: CourseDetailComponent,
    canActivate:  [authGuard]
  },
  
  { 
    path: 'students', 
    component: StudentListComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  { 
    path: 'students/new', 
    component: AddStudentComponent,
    canActivate:  [authGuard, roleGuard],
    data: { roles:  ['admin', 'teacher'] }
  },
  
  { 
    path: 'students/:id/edit', 
    component: EditStudentComponent,
    canActivate:  [authGuard, roleGuard],
    data: { roles:  ['admin', 'teacher'] }
  },
  
  { 
    path: 'enrollment', 
    component: EnrollmentComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'teacher'] }
  },
  
  { 
    path: 'settings', 
    component: SettingsComponent,
    canActivate: [authGuard]
  },
  
  { path: '**', redirectTo: '/login' }
];