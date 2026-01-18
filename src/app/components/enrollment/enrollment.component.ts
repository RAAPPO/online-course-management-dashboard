import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="enrollment-container">
      <!-- Enrollment Form -->
      <mat-card class="enrollment-form">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>assignment</mat-icon>
            New Enrollment
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="enrollmentForm" (ngSubmit)="onEnroll()">
            <mat-form-field appearance="outline">
              <mat-label>Select Student</mat-label>
              <mat-select formControlName="studentId">
                <mat-option *ngFor="let student of students" [value]="student.id">
                  {{ student.firstName }} {{ student.lastName }} ({{ student.email }})
                </mat-option>
              </mat-select>
              <mat-error *ngIf="enrollmentForm.get('studentId')?.hasError('required')">
                Please select a student
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Select Course</mat-label>
              <mat-select formControlName="courseId">
                <mat-option *ngFor="let course of courses" [value]="course.id">
                  {{ course.title }} ({{ course.code }})
                </mat-option>
              </mat-select>
              <mat-error *ngIf="enrollmentForm.get('courseId')?.hasError('required')">
                Please select a course
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
              [disabled]="!enrollmentForm.valid">
              <mat-icon>add</mat-icon>
              Enroll Student
            </button>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Enrollments List -->
      <mat-card class="enrollments-list">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>list</mat-icon>
            Current Enrollments
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="enrichedEnrollments" class="enrollments-table">
              <!-- Student Column -->
              <ng-container matColumnDef="student">
                <th mat-header-cell *matHeaderCellDef>Student</th>
                <td mat-cell *matCellDef="let enrollment">
                  <div class="student-info">
                    <strong>{{ enrollment.studentName }}</strong>
                    <small>{{ enrollment.studentEmail }}</small>
                  </div>
                </td>
              </ng-container>

              <!-- Course Column -->
              <ng-container matColumnDef="course">
                <th mat-header-cell *matHeaderCellDef>Course</th>
                <td mat-cell *matCellDef="let enrollment">
                  <div class="course-info">
                    <strong>{{ enrollment.courseTitle }}</strong>
                    <small>{{ enrollment.courseCode }}</small>
                  </div>
                </td>
              </ng-container>

              <!-- Enrollment Date Column -->
              <ng-container matColumnDef="enrollmentDate">
                <th mat-header-cell *matHeaderCellDef>Enrolled On</th>
                <td mat-cell *matCellDef="let enrollment">
                  {{ enrollment.enrollmentDate | date:'mediumDate' }}
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let enrollment">
                  <mat-chip [class]="'status-' + enrollment.status.toLowerCase()">
                    {{ enrollment.status }}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Grade Column -->
              <ng-container matColumnDef="grade">
                <th mat-header-cell *matHeaderCellDef>Grade</th>
                <td mat-cell *matCellDef="let enrollment">
                  <span class="grade" *ngIf="enrollment.grade">{{ enrollment.grade }}</span>
                  <span class="no-grade" *ngIf="!enrollment.grade">-</span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let enrollment">
                  <button mat-icon-button color="warn" 
                    (click)="onUnenroll(enrollment.id)"
                    matTooltip="Unenroll">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <div *ngIf="enrichedEnrollments.length === 0" class="no-data">
              <mat-icon>info</mat-icon>
              <p>No enrollments yet.  Enroll a student in a course to get started!</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .enrollment-container {
      padding: 32px;
      max-width:  1400px;
      margin: 0 auto;
      display: grid;
      gap: 24px;
    }

    mat-card {
      padding: 20px;
    }

    mat-card-header {
      margin-bottom: 20px;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 22px ! important;
      color: #333;
    }

    .enrollment-form form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    mat-form-field {
      width: 100%;
    }

    .table-container {
      overflow-x: auto;
    }

    .enrollments-table {
      width: 100%;
    }

    .student-info, .course-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .student-info strong, .course-info strong {
      color: #333;
      font-size: 14px;
    }

    .student-info small, .course-info small {
      color: #666;
      font-size: 12px;
    }

    mat-chip {
      font-size: 12px;
      min-height: 28px;
    }

    .status-enrolled {
      background-color: #4CAF50;
      color:  white;
    }

    .status-completed {
      background-color: #2196F3;
      color: white;
    }

    .status-dropped {
      background-color: #f44336;
      color: white;
    }

    .grade {
      font-weight: bold;
      color: #4CAF50;
      font-size: 16px;
    }

    .no-grade {
      color:  #999;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .no-data mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 10px;
    }

    @media (max-width: 768px) {
      .enrollment-container {
        padding: 10px;
      }
    }
  `]
})
export class EnrollmentComponent implements OnInit {
  enrollmentForm: FormGroup;
  students: Student[] = [];
  courses: Course[] = [];
  enrollments: Enrollment[] = [];
  enrichedEnrollments: any[] = [];
  displayedColumns: string[] = ['student', 'course', 'enrollmentDate', 'status', 'grade', 'actions'];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private snackBar: MatSnackBar
  ) {
    this.enrollmentForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });

    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });

    this.enrollmentService.getEnrollments().subscribe(enrollments => {
      this.enrollments = enrollments;
      this.enrichEnrollments();
    });
  }

  enrichEnrollments() {
    this.enrichedEnrollments = this.enrollments.map(enrollment => {
      const student = this.students.find(s => s.id === enrollment.studentId);
      const course = this.courses.find(c => c.id === enrollment.courseId);

      return {
        ...enrollment,
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown',
        studentEmail: student?.email || '',
        courseTitle: course?.title || 'Unknown',
        courseCode: course?.code || ''
      };
    });
  }

  onEnroll() {
    if (this.enrollmentForm.valid) {
      const { studentId, courseId } = this.enrollmentForm.value;

      // Check if already enrolled
      const alreadyEnrolled = this.enrollments.some(
        e => e.studentId === studentId && e.courseId === courseId
      );

      if (alreadyEnrolled) {
        this.snackBar.open('⚠️ Student is already enrolled in this course! ', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        return;
      }

      const newEnrollment = {
        studentId,
        courseId,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'Enrolled' as const,
        grade: undefined
      };

      this.enrollmentService.addEnrollment(newEnrollment).subscribe(() => {
        this.snackBar.open('✅ Student enrolled successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.enrollmentForm.reset();
        this.loadData();
      });
    }
  }

  onUnenroll(enrollmentId:  number) {
    if (confirm('Are you sure you want to unenroll this student?')) {
      this.enrollmentService.deleteEnrollment(enrollmentId).subscribe(() => {
        this.snackBar.open('✅ Student unenrolled successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loadData();
      });
    }
  }
}
