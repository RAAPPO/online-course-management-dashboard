import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatIconModule,
    MatButtonModule, MatChipsModule, MatSnackBarModule
  ],
  template: `
    <div class="student-detail-container" *ngIf="student">
      <mat-card class="student-card">
        <mat-card-header>
          <div mat-card-avatar class="student-avatar">
            {{ student.firstName.charAt(0) }}{{ student.lastName.charAt(0) }}
          </div>
          <mat-card-title>
            {{ student.firstName }} {{ student.lastName }}
          </mat-card-title>
          <mat-card-subtitle>{{ student.email }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="student-info">
            <div class="info-row"><mat-icon>school</mat-icon> <span>{{ student.major }}</span></div>
            <div class="info-row"><mat-icon>phone</mat-icon> <span>{{ student.phone }}</span></div>
            <div class="info-row"><mat-icon>location_on</mat-icon> <span>{{ student.address }}</span></div>
            <div class="info-row"><mat-icon>calendar_today</mat-icon> <span>Enrolled: {{ student.enrollmentDate }}</span></div>
            <div class="info-row"><mat-icon>cake</mat-icon> <span>{{ student.dateOfBirth }}</span></div>
          </div>
          <div class="student-meta">
            <mat-chip color="primary" [ngClass]="student.status.toLowerCase()">{{ student.status }}</mat-chip>
            <mat-chip *ngIf="student.gpa" class="gpa-chip">
              <mat-icon>star</mat-icon>
              GPA: {{ student.gpa }}
            </mat-chip>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-button color="accent" [routerLink]="['/students', student.id, 'edit']">
            <mat-icon>edit</mat-icon> Edit Details
          </button>
          <button mat-stroked-button color="primary" routerLink="/students">
            <mat-icon>arrow_back</mat-icon> Back to Students
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
    <div *ngIf="!student" class="loading">
      <mat-icon>hourglass_empty</mat-icon>
      <p>Loading student details...</p>
    </div>
  `,
  styles: [`
    .student-detail-container {
      padding: 32px;
      max-width: 700px;
      margin: 0 auto;
    }
    .student-card { padding:24px; }
    .student-avatar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      font-size: 24px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 54px !important;
      height: 54px !important;
      border-radius: 50%;
    }
    mat-card-title { font-size: 22px !important; font-weight: 700 !important; }
    mat-card-subtitle { font-size: 15px !important; color: #666 !important; }
    .student-info { margin:17px 0 14px 0; }
    .info-row { display: flex; align-items: center; gap: 12px; margin-bottom:12px; color:#333; font-size:15px;}
    .info-row mat-icon {color:#999;font-size:20px;width:20px;}
    .student-meta { margin-top: 18px; }
    .mat-mdc-chip { font-size:15px; font-weight:600;}
    .active { background: #e8f5e9 !important; color: #2e7d32 !important;}
    .inactive { background: #ffebee !important; color: #c62828 !important;}
    .graduated { background: #e3f2fd !important; color: #1565c0 !important;}
    .gpa-chip { background: #fff3e0 !important; color: #e65100 !important; font-weight: 600 !important;}
    .loading { text-align:center; margin:3.5em;color:#aaa;}
    .loading mat-icon {font-size:48px;}
    mat-card-actions { display: flex; gap:16px; margin-top:18px;}
  `]
})
export class StudentDetailComponent implements OnInit {
  student: Student | undefined;
  private studentId: number = 0;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.studentId) {
      this.router.navigate(['/students']);
      return;
    }
    this.studentService.getStudentById(this.studentId).subscribe(student => {
      this.student = student;
      if (!student) {
        this.snackBar.open('❌ Student not found!', 'Close', { duration:2500 });
        this.router.navigate(['/students']);
      }
    });
  }
}