import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <div class="student-dashboard">
      <div class="welcome-section">
        <h1>👨‍🎓 Welcome, {{ currentUser?.firstName }}!</h1>
        <p>Manage your courses and track your progress</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card enrolled">
          <mat-icon>school</mat-icon>
          <div class="stat-content">
            <h2>{{ myEnrollments.length }}</h2>
            <p>Enrolled Courses</p>
          </div>
        </mat-card>

        <mat-card class="stat-card completed">
          <mat-icon>check_circle</mat-icon>
          <div class="stat-content">
            <h2>{{ completedCount }}</h2>
            <p>Completed</p>
          </div>
        </mat-card>

        <mat-card class="stat-card active">
          <mat-icon>play_circle</mat-icon>
          <div class="stat-content">
            <h2>{{ activeCount }}</h2>
            <p>In Progress</p>
          </div>
        </mat-card>

        <mat-card class="stat-card average">
          <mat-icon>grade</mat-icon>
          <div class="stat-content">
            <h2>{{ averageGrade }}</h2>
            <p>Average Grade</p>
          </div>
        </mat-card>
      </div>

      <!-- My Courses -->
      <mat-card class="section-card">
        <mat-card-header>
          <mat-card-title>📚 My Courses</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="courses-grid" *ngIf="myEnrollments.length > 0; else noCourses">
            <mat-card *ngFor="let enrollment of myEnrollments" class="course-card">
              <div class="course-header">
                <h3>{{ getCourseTitle(enrollment.courseId) }}</h3>
                <mat-chip [class]="enrollment.status.toLowerCase()">
                  {{ enrollment.status }}
                </mat-chip>
              </div>
              <p class="course-description">{{ getCourseDescription(enrollment.courseId) }}</p>
              <div class="course-info">
                <span><mat-icon>calendar_today</mat-icon> Enrolled: {{ enrollment.enrollmentDate | date }}</span>
                <span *ngIf="enrollment.grade"><mat-icon>grade</mat-icon> Grade: {{ enrollment.grade }}</span>
              </div>
              <div class="course-actions">
                <button mat-raised-button color="primary" disabled>
                 <mat-icon>info</mat-icon>
                 Details
                </button>
                <button mat-button color="warn" *ngIf="enrollment.status === 'Enrolled'" 
                        (click)="dropCourse(enrollment.id)">
                  <mat-icon>cancel</mat-icon>
                  Drop Course
                </button>
              </div>
            </mat-card>
          </div>
          <ng-template #noCourses>
            <div class="empty-state">
              <mat-icon>school</mat-icon>
              <p>You haven't enrolled in any courses yet</p>
              <button mat-raised-button color="primary" (click)="showAvailableCourses = true">
                Browse Courses
              </button>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <!-- Available Courses -->
      <mat-card class="section-card" *ngIf="showAvailableCourses || myEnrollments.length === 0">
        <mat-card-header>
          <mat-card-title>🔍 Available Courses</mat-card-title>
          <button mat-icon-button (click)="showAvailableCourses = false" *ngIf="myEnrollments.length > 0">
            <mat-icon>close</mat-icon>
          </button>
        </mat-card-header>
        <mat-card-content>
          <div class="courses-grid" *ngIf="availableCourses.length > 0; else noAvailable">
            <mat-card *ngFor="let course of availableCourses" class="course-card available">
              <div class="course-header">
                <h3>{{ course.title }}</h3>
                <mat-chip class="available-chip">Available</mat-chip>
              </div>
              <p class="course-description">{{ course.description }}</p>
              <div class="course-info">
                <span><mat-icon>schedule</mat-icon> {{ course.duration }} weeks</span>
                <span><mat-icon>person</mat-icon> {{ course.instructor }}</span>
              </div>
              <div class="course-actions">
                <button mat-raised-button color="primary" (click)="enrollInCourse(course.id)">
                  <mat-icon>add</mat-icon>
                  Enroll Now
                </button>
              </div>
            </mat-card>
          </div>
          <ng-template #noAvailable>
            <div class="empty-state">
              <mat-icon>check_circle</mat-icon>
              <p>You're enrolled in all available courses! </p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .student-dashboard {
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

    .stat-card.enrolled { border-left: 4px solid #2196f3; }
    .stat-card.enrolled mat-icon { color: #2196f3; }

    .stat-card.completed { border-left: 4px solid #4caf50; }
    .stat-card.completed mat-icon { color: #4caf50; }

    .stat-card.active { border-left: 4px solid #ff9800; }
    .stat-card.active mat-icon { color: #ff9800; }

    .stat-card.average { border-left: 4px solid #9c27b0; }
    .stat-card.average mat-icon { color: #9c27b0; }

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
      margin-bottom: 20px;
    }

    mat-card-title {
      font-size: 24px ! important;
      margin: 0 ! important;
    }

    .courses-grid {
      display: grid;
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
      margin: 0;
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
      display:  flex;
      align-items:  center;
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

    .course-actions button {
      flex: 1;
    }

    mat-chip {
      font-size: 11px ! important;
      min-height: 24px ! important;
      padding: 4px 10px ! important;
    }

    mat-chip.enrolled {
      background:  #2196f3 !important;
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

    mat-chip.available-chip {
      background: #ff9800 !important;
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
  `]
})
export class StudentDashboardComponent implements OnInit {
  currentUser: any;
  myEnrollments: Enrollment[] = [];
  allCourses: Course[] = [];
  availableCourses:  Course[] = [];
  showAvailableCourses = false;

  completedCount = 0;
  activeCount = 0;
  averageGrade = 'N/A';

  constructor(
    private authService: AuthService,
    private courseService:  CourseService,
    private enrollmentService: EnrollmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadData();
  }

loadData() {
  this.courseService.getCourses().subscribe(courses => {
    this.allCourses = courses;
    this.updateAvailableCourses();
  });

  if (this.currentUser) {
    this.enrollmentService.getEnrollmentsByStudent(this.currentUser.id).subscribe(enrollments => {
      this.myEnrollments = enrollments;
      this.calculateStats();
      this.updateAvailableCourses();
    });
  }
}

  calculateStats() {
    this.completedCount = this.myEnrollments.filter(e => e.status === 'Completed').length;
    this.activeCount = this.myEnrollments.filter(e => e.status === 'Enrolled').length;

    const gradesWithValues = this.myEnrollments
      .filter(e => e.grade && e.grade !== '')
      .map(e => this.gradeToNumber(e.grade! ));

    if (gradesWithValues.length > 0) {
      const avg = gradesWithValues.reduce((a, b) => a + b, 0) / gradesWithValues.length;
      this.averageGrade = this.numberToGrade(avg);
    }
  }

  gradeToNumber(grade: string): number {
    const gradeMap:  any = { 
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-':  2.7, 
      'C+': 2.3, 'C': 2.0, 'C-':  1.7, 'D': 1.0, 'F': 0.0 
    };
    return gradeMap[grade] || 0;
  }

  numberToGrade(num: number): string {
    if (num >= 3.85) return 'A';
    if (num >= 3.5) return 'A-';
    if (num >= 3.15) return 'B+';
    if (num >= 2.85) return 'B';
    if (num >= 2.5) return 'B-';
    if (num >= 2.15) return 'C+';
    if (num >= 1.85) return 'C';
    if (num >= 1.5) return 'C-';
    if (num >= 0.5) return 'D';
    return 'F';
  }

  updateAvailableCourses() {
    const enrolledCourseIds = this.myEnrollments
      .filter(e => e.status !== 'Dropped')
      .map(e => e.courseId);
    this.availableCourses = this.allCourses.filter(c => !enrolledCourseIds.includes(c.id));
  }

  getCourseTitle(courseId: number): string {
    return this.allCourses.find(c => c.id === courseId)?.title || 'Unknown Course';
  }

  getCourseDescription(courseId: number): string {
    return this.allCourses.find(c => c.id === courseId)?.description || '';
  }

  enrollInCourse(courseId: number) {
    if (!this.currentUser) return;

    const enrollment = {
      studentId: this.currentUser.id,
      courseId: courseId,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'Enrolled' as const,
      grade: undefined
    };

    this.enrollmentService.addEnrollment(enrollment).subscribe({
      next: () => {
        this.snackBar.open('✅ Successfully enrolled in course! ', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loadData();
        this.showAvailableCourses = false;
      },
      error:  () => {
        this.snackBar.open('❌ Failed to enroll. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition:  'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  dropCourse(enrollmentId: number) {
    if (confirm('Are you sure you want to drop this course?')) {
      this.enrollmentService.deleteEnrollment(enrollmentId).subscribe({
        next: () => {
          this.snackBar.open('✅ Course dropped successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          this.loadData();
        },
        error: () => {
          this.snackBar.open('❌ Failed to drop course', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      });
    }
  }
}