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
import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { TeacherDetailComponent } from './components/teacher-detail/teacher-detail.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { SupportRequestsComponent } from './components/support-requests/support-requests.component';

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
    path: 'courses/:id', 
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
  path: 'students/:id',
  component: StudentDetailComponent,
  canActivate: [authGuard, roleGuard],
  data: { roles: ['admin', 'teacher'] }
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
    path: 'teachers',
    component: TeacherListComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'teachers/new',
    component: AddTeacherComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'teachers/:id',
    component: TeacherDetailComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'teachers/:id/edit',
    component: EditTeacherComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },

  { 
  path: 'support-requests', 
  component: SupportRequestsComponent,
  canActivate: [authGuard, roleGuard],
  data: { roles: ['admin'] } 
  },
  
  { 
    path: 'settings', 
    component: SettingsComponent,
    canActivate: [authGuard]
  },
  { path: 'contact', component: ContactComponent },
  
  { path: '**', redirectTo: '/login' }
];