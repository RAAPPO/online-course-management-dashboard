import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <div class="teacher-dashboard">
      <div class="welcome-section">
        <h1>👨‍🏫 Welcome, {{ currentUser?.firstName }}!</h1>
        <p>Manage your courses and students</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card courses">
          <mat-icon>school</mat-icon>
          <div class="stat-content">
            <h2>{{ myCourses.length }}</h2>
            <p>My Courses</p>
          </div>
        </mat-card>

        <mat-card class="stat-card students">
          <mat-icon>people</mat-icon>
          <div class="stat-content">
            <h2>{{ totalStudents }}</h2>
            <p>Total Students</p>
          </div>
        </mat-card>

        <mat-card class="stat-card enrollments">
          <mat-icon>how_to_reg</mat-icon>
          <div class="stat-content">
            <h2>{{ totalEnrollments }}</h2>
            <p>Total Enrollments</p>
          </div>
        </mat-card>

        <mat-card class="stat-card active">
          <mat-icon>play_circle</mat-icon>
          <div class="stat-content">
            <h2>{{ activeEnrollments }}</h2>
            <p>Active Enrollments</p>
          </div>
        </mat-card>
      </div>

      <!-- My Courses -->
      <mat-card class="section-card">
        <mat-card-header>
          <mat-card-title>📚 My Courses</mat-card-title>
          <button mat-raised-button color="primary" (click)="createNewCourse()">
            <mat-icon>add</mat-icon>
            Create Course
          </button>
        </mat-card-header>
        <mat-card-content>
          <div class="courses-grid" *ngIf="myCourses.length > 0; else noCourses">
            <mat-card *ngFor="let course of myCourses" class="course-card">
              <div class="course-header">
                <h3>{{ course.title }}</h3>
                <mat-chip class="active-chip">Active</mat-chip>
              </div>
              <p class="course-description">{{ course.description }}</p>
              <div class="course-info">
                <span><mat-icon>schedule</mat-icon> {{ course.duration }} weeks</span>
                <span><mat-icon>people</mat-icon> {{ getEnrolledCount(course.id) }} Students</span>
              </div>
              <div class="course-actions">
                <button mat-raised-button color="primary" (click)="viewCourseDetails(course)">
                  <mat-icon>visibility</mat-icon>
                  View Students
                </button>
                <button mat-button (click)="editCourse(course)">
                  <mat-icon>edit</mat-icon>
                  Edit
                </button>
              </div>
            </mat-card>
          </div>
          <ng-template #noCourses>
            <div class="empty-state">
              <mat-icon>school</mat-icon>
              <p>You haven't created any courses yet</p>
              <button mat-raised-button color="primary" (click)="createNewCourse()">
                Create Your First Course
              </button>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <!-- Course Details (when selected) -->
      <mat-card class="section-card" *ngIf="selectedCourse">
        <mat-card-header>
          <mat-card-title>
            👥 Students in {{ selectedCourse.title }}
          </mat-card-title>
          <button mat-icon-button (click)="selectedCourse = null">
            <mat-icon>close</mat-icon>
          </button>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="courseEnrollments.length > 0; else noStudents">
            <table mat-table [dataSource]="courseEnrollments" class="students-table">
              <ng-container matColumnDef="student">
                <th mat-header-cell *matHeaderCellDef>Student</th>
                <td mat-data-cell *matCellDef="let enrollment">
                  {{ getStudentName(enrollment.studentId) }}
                </td>
              </ng-container>

              <ng-container matColumnDef="enrollmentDate">
                <th mat-header-cell *matHeaderCellDef>Enrolled Date</th>
                <td mat-data-cell *matCellDef="let enrollment">
                  {{ enrollment.enrollmentDate | date }}
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-data-cell *matCellDef="let enrollment">
                  <mat-chip [class]="enrollment.status.toLowerCase()">
                    {{ enrollment.status }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="grade">
                <th mat-header-cell *matHeaderCellDef>Grade</th>
                <td mat-data-cell *matCellDef="let enrollment">
                  <mat-form-field appearance="outline" class="grade-field">
                    <mat-select [(value)]="enrollment.grade" 
                                (selectionChange)="updateGrade(enrollment)"
                                [disabled]="enrollment.status !== 'Enrolled'">
                      <mat-option value="">Not Graded</mat-option>
                      <mat-option value="A">A</mat-option>
                      <mat-option value="A-">A-</mat-option>
                      <mat-option value="B+">B+</mat-option>
                      <mat-option value="B">B</mat-option>
                      <mat-option value="B-">B-</mat-option>
                      <mat-option value="C+">C+</mat-option>
                      <mat-option value="C">C</mat-option>
                      <mat-option value="C-">C-</mat-option>
                      <mat-option value="D">D</mat-option>
                      <mat-option value="F">F</mat-option>
                    </mat-select>
                  </mat-form-field>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-data-cell *matCellDef="let enrollment">
                  <button mat-icon-button color="warn" 
                          (click)="removeStudent(enrollment)"
                          *ngIf="enrollment.status === 'Enrolled'"
                          matTooltip="Remove student from course">
                    <mat-icon>person_remove</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
          <ng-template #noStudents>
            <div class="empty-state-small">
              <p>No students enrolled in this course yet</p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .teacher-dashboard {
      padding: 32px;
      max-width:  1400px;
      margin: 0 auto;
    }

    .welcome-section {
      margin-bottom: 32px;
    }

    .welcome-section h1 {
      font-size: 32px;
      margin:  0 0 8px 0;
      color:  #333;
    }

    .welcome-section p {
      font-size: 16px;
      color: #666;
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px ! important;
    }

    .stat-card mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .stat-card.courses { border-left: 4px solid #2196f3; }
    .stat-card.courses mat-icon { color: #2196f3; }

    .stat-card.students { border-left: 4px solid #4caf50; }
    .stat-card.students mat-icon { color: #4caf50; }

    .stat-card.enrollments { border-left: 4px solid #ff9800; }
    .stat-card.enrollments mat-icon { color: #ff9800; }

    .stat-card.active { border-left: 4px solid #9c27b0; }
    .stat-card.active mat-icon { color: #9c27b0; }

    .stat-content h2 {
      margin: 0;
      font-size: 32px;
      color: #333;
    }

    .stat-content p {
      margin:  0;
      font-size: 14px;
      color: #666;
    }

    .section-card {
      margin-bottom: 24px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items:  center;
      margin-bottom:  20px;
    }

    mat-card-title {
      font-size: 24px ! important;
      margin: 0 ! important;
    }

    .courses-grid {
      display:  grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .course-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .course-header {
      display:  flex;
      justify-content:  space-between;
      align-items: start;
      gap: 12px;
    }

    .course-header h3 {
      margin: 0;
      font-size: 18px;
      color: #333;
      flex:  1;
    }

    .course-description {
      color: #666;
      font-size: 14px;
      margin:  0;
      line-height: 1.5;
    }

    .course-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 13px;
      color: #666;
    }

    .course-info span {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .course-info mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .course-actions {
      display: flex;
      gap: 12px;
      margin-top:  8px;
    }

    mat-chip {
      font-size: 11px ! important;
      min-height: 24px ! important;
      padding: 4px 10px ! important;
    }

    mat-chip.active-chip {
      background:  #4caf50 !important;
      color: white !important;
    }

    mat-chip.enrolled {
      background: #2196f3 !important;
      color: white !important;
    }

    mat-chip.completed {
      background: #4caf50 !important;
      color: white !important;
    }

    mat-chip.dropped {
      background: #f44336 !important;
      color: white !important;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-state mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #ccc;
      margin-bottom: 20px;
    }

    .empty-state p {
      font-size: 18px;
      color: #666;
      margin-bottom: 24px;
    }

    .empty-state-small {
      text-align: center;
      padding: 40px 20px;
      color: #999;
    }

    .students-table {
      width: 100%;
      margin-top: 20px;
    }

    .grade-field {
      width: 100px;
      margin:  0;
    }

    .grade-field::ng-deep.mat-mdc-form-field-subscript-wrapper {
      display: none;
    }
  `]
})
export class TeacherDashboardComponent implements OnInit {
  currentUser: any;
  myCourses:  Course[] = [];
  allStudents: Student[] = [];
  allEnrollments: Enrollment[] = [];
  courseEnrollments: Enrollment[] = [];
  selectedCourse: Course | null = null;
  
  totalStudents = 0;
  totalEnrollments = 0;
  activeEnrollments = 0;

  displayedColumns = ['student', 'enrollmentDate', 'status', 'grade', 'actions'];

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadData();
  }

  loadData() {
    // Load courses taught by this teacher
    this.courseService.getCourses().subscribe(courses => {
      // Filter by teacherId
      if (this.currentUser) {
        this.myCourses = courses.filter(c => c.teacherId === this.currentUser.id);
      }
    });

    // Load all students
    this.studentService.getStudents().subscribe(students => {
      this.allStudents = students;
    });

    // Load enrollments
    this.enrollmentService.getEnrollments().subscribe(enrollments => {
      this.allEnrollments = enrollments;
      this.calculateStats();
    });
  }

  calculateStats() {
    const myCourseIds = this.myCourses.map(c => c.id);
    const myEnrollments = this.allEnrollments.filter(e => myCourseIds.includes(e.courseId));
    
    this.totalEnrollments = myEnrollments.length;
    this.activeEnrollments = myEnrollments.filter(e => e.status === 'Enrolled').length;
    
    const uniqueStudents = new Set(myEnrollments.map(e => e.studentId));
    this.totalStudents = uniqueStudents.size;
  }

  getEnrolledCount(courseId:  number): number {
    return this.allEnrollments.filter(e => e.courseId === courseId && e.status === 'Enrolled').length;
  }

  getStudentName(studentId: number): string {
    const student = this.allStudents.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown';
  }

  viewCourseDetails(course: Course) {
    this.selectedCourse = course;
    this.courseEnrollments = this.allEnrollments.filter(e => e.courseId === course.id);
  }

  updateGrade(enrollment: Enrollment) {
    this.enrollmentService.updateEnrollment(enrollment.id, { grade: enrollment.grade }).subscribe({
      next: () => {
        this.snackBar.open('✅ Grade updated successfully', 'Close', {
          duration:  2000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      error: () => {
        this.snackBar.open('❌ Failed to update grade', 'Close', {
          duration: 3000
        });
      }
    });
  }

removeStudent(enrollment: Enrollment) {
  if (confirm('Remove this student from the course?')) {
    this.enrollmentService.deleteEnrollment(enrollment.id).subscribe({
      next: () => {
        this.snackBar.open('✅ Student removed successfully', 'Close', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loadData();
        if (this.selectedCourse) {
          this.viewCourseDetails(this.selectedCourse);
        }
      },
      error: () => {
        this.snackBar.open('❌ Failed to remove student', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
createNewCourse() {
  this.snackBar. open('ℹ️ Use Courses page → Add Course button', 'Close', {
    duration: 3000,
    horizontalPosition:  'end',
    verticalPosition: 'top'
  });
}

editCourse(course: Course) {
  this.snackBar.open('ℹ️ Use Courses page → Edit button', 'Close', {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'top'
  });
}
}