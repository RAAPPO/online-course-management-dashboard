import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatIconModule,
    MatButtonModule, MatChipsModule, MatSnackBarModule
  ],
  template: `
    <div class="teacher-detail-container" *ngIf="teacher">
      <mat-card class="teacher-card">
        <mat-card-header>
          <div mat-card-avatar class="teacher-avatar">
            {{ teacher.firstName.charAt(0) }}{{ teacher.lastName.charAt(0) }}
          </div>
          <mat-card-title>
            {{ teacher.firstName }} {{ teacher.lastName }}
          </mat-card-title>
          <mat-card-subtitle>{{ teacher.email }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="teacher-info">
            <div class="info-row"><mat-icon>school</mat-icon> <span>{{ teacher.subjectSpecialization }}</span></div>
            <div class="info-row"><mat-icon>badge</mat-icon> <span>{{ teacher.qualification }}</span></div>
            <div class="info-row"><mat-icon>history_edu</mat-icon> <span>{{ teacher.experience }} yrs</span></div>
            <div class="info-row"><mat-icon>call</mat-icon> <span>{{ teacher.phone }}</span></div>
            <div class="info-row"><mat-icon>location_on</mat-icon> <span>{{ teacher.address }}</span></div>
            <div class="info-row"><mat-icon>cake</mat-icon> <span>{{ teacher.dateOfBirth }}</span></div>
          </div>
          <div class="teacher-meta">
            <mat-chip color="primary" [ngClass]="teacher.status.toLowerCase()">{{ teacher.status }}</mat-chip>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-button color="accent" [routerLink]="['/teachers', teacher.id, 'edit']">
            <mat-icon>edit</mat-icon> Edit Details
          </button>
          <button mat-stroked-button color="primary" routerLink="/teachers">
            <mat-icon>arrow_back</mat-icon> Back to Teachers
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
    <div *ngIf="!teacher" class="loading">
      <mat-icon>hourglass_empty</mat-icon>
      <p>Loading teacher details...</p>
    </div>
  `,
  styles: [`
    .teacher-detail-container {
      padding: 32px;
      max-width: 700px;
      margin: 0 auto;
    }
    .teacher-card { padding:24px; }
    .teacher-avatar {
      background: linear-gradient(135deg,#43cea2 0%,#185a9d 100%);
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
    .teacher-info { margin:17px 0 14px 0; }
    .info-row { display: flex; align-items: center; gap: 12px; margin-bottom:12px; color:#333; font-size:15px;}
    .info-row mat-icon {color:#999;font-size:20px;width:20px;}
    .teacher-meta { margin-top: 18px; }
    .mat-mdc-chip { font-size:15px; font-weight:600;}
    .active { background: #e8f5e9 !important; color: #2e7d32 !important;}
    .inactive { background: #ffebee !important; color: #c62828 !important;}
    .on\ leave { background: #ffe0b2 !important; color: #ef6c00 !important;}
    .loading { text-align:center; margin:3.5em;color:#aaa;}
    .loading mat-icon {font-size:48px;}
    mat-card-actions { display: flex; gap:16px; margin-top:18px;}
  `]
})
export class TeacherDetailComponent implements OnInit {
  teacher: Teacher | undefined;
  private teacherId: number = 0;

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.teacherId) {
      this.router.navigate(['/teachers']);
      return;
    }
    this.teacherService.getTeacherById(this.teacherId).subscribe(teacher => {
      this.teacher = teacher;
      if (!teacher) {
        this.snackBar.open('❌ Teacher not found!', 'Close', { duration:2500 });
        this.router.navigate(['/teachers']);
      }
    });
  }
}