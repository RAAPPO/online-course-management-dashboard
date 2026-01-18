import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <div class="teacher-list-container">
      <div class="header">
        <h1>👨‍🏫 Teachers</h1>
        <button mat-raised-button color="primary" routerLink="/teachers/new">
          <mat-icon>person_add</mat-icon>
          Add New Teacher
        </button>
      </div>

      <mat-card class="filter-card">
        <mat-card-content>
          <div class="filters">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search teachers... </mat-label>
              <input matInput [(ngModel)]="searchTerm" placeholder="Search by name or email">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Specialization</mat-label>
              <mat-select [(ngModel)]="selectedSubject">
                <mat-option value="All">All Subjects</mat-option>
                <mat-option *ngFor="let subj of allSubjects" [value]="subj">{{ subj }}</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="selectedStatus">
                <mat-option value="All">All Status</mat-option>
                <mat-option value="Active">Active</mat-option>
                <mat-option value="Inactive">Inactive</mat-option>
                <mat-option value="On Leave">On Leave</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="teacher-count">
            <p>Showing {{ filteredTeachers.length }} of {{ teachers.length }} teachers</p>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="teachers-grid">
        <mat-card *ngFor="let teacher of filteredTeachers" class="teacher-card">
          <mat-card-header>
            <div mat-card-avatar class="teacher-avatar">
              {{ teacher.firstName.charAt(0) }}{{ teacher.lastName.charAt(0) }}
            </div>
            <mat-card-title>{{ teacher.firstName }} {{ teacher.lastName }}</mat-card-title>
            <mat-card-subtitle>{{ teacher.email }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="teacher-info">
              <div class="info-row">
                <mat-icon>school</mat-icon>
                <span>{{ teacher.subjectSpecialization }}</span>
              </div>
              <div class="info-row">
                <mat-icon>badge</mat-icon>
                <span>{{ teacher.qualification }}</span>
              </div>
              <div class="info-row">
                <mat-icon>history_edu</mat-icon>
                <span>{{ teacher.experience }} yrs</span>
              </div>
              <div class="info-row">
                <mat-icon>call</mat-icon>
                <span>{{ teacher.phone }}</span>
              </div>
              <div class="info-row">
                <mat-icon>location_on</mat-icon>
                <span>{{ teacher.address }}</span>
              </div>
              <div class="info-row">
                <mat-icon>cake</mat-icon>
                <span>{{ teacher.dateOfBirth }}</span>
              </div>
            </div>

            <div class="teacher-meta">
              <mat-chip-set>
                <mat-chip [class]="'status-' + teacher.status.toLowerCase()">
                  {{ teacher.status }}
                </mat-chip>
              </mat-chip-set>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <a mat-button color="primary" [routerLink]="['/teachers', teacher.id]">
              <mat-icon>visibility</mat-icon>
              View Details
            </a>
            <a mat-button color="accent" [routerLink]="['/teachers', teacher.id, 'edit']">
              <mat-icon>edit</mat-icon>
              Edit
            </a>
            <button mat-icon-button color="warn" (click)="deleteTeacher(teacher)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div *ngIf="filteredTeachers.length === 0" class="no-results">
        <mat-icon>person_off</mat-icon>
        <h2>No teachers found</h2>
        <p>Try adjusting your filters</p>
      </div>
    </div>
  `,
  styles: [`
    .teacher-list-container {
      padding: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 32px;
      color: #333;
      margin: 0;
    }
    .filter-card {
      margin-bottom: 30px;
    }
    .filters {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 20px;
    }
    .search-field {
      width: 100%;
    }
    .teacher-count {
      margin-top: 15px;
      color: #666;
    }
    .teachers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }
    .teacher-card {
      transition: all 0.3s;
    }
    .teacher-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    .teacher-avatar {
      background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
      color: white;
      font-size: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px !important;
      height: 50px !important;
      border-radius: 50%;
    }
    mat-card-title {
      font-size: 18px !important;
      font-weight: 600 !important;
    }
    mat-card-subtitle {
      color: #666 !important;
      font-size: 14px !important;
    }
    .teacher-info {
      margin: 15px 0;
    }
    .info-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      color: #555;
      font-size: 14px;
    }
    .info-row mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #999;
    }
    .teacher-meta {
      margin-top: 15px;
    }
    .status-active {
      background: #e8f5e9 !important;
      color: #2e7d32 !important;
    }
    .status-inactive {
      background: #ffebee !important;
      color: #c62828 !important;
    }
    .status-on\ leave {
      background: #ffe0b2 !important;
      color: #ef6c00 !important;
    }
    mat-card-actions {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px !important;
    }
    .no-results {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }
    .no-results mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 20px;
    }
    @media (max-width: 768px) {
      .filters {
        grid-template-columns: 1fr;
      }
      .teachers-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TeacherListComponent implements OnInit {
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  searchTerm = '';
  selectedSubject = 'All';
  selectedStatus = 'All';
  allSubjects: string[] = [];

  constructor(
    private teacherService: TeacherService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers;
      this.allSubjects = Array.from(new Set(teachers.map(t => t.subjectSpecialization).filter(Boolean)));
      this.filterTeachers();
    });
  }

  ngDoCheck() {
    this.filterTeachers();
  }

  filterTeachers() {
    this.filteredTeachers = this.teachers.filter(teacher => {
      const s = this.searchTerm.toLowerCase();
      const matchesSearch = !this.searchTerm || 
        teacher.firstName.toLowerCase().includes(s) ||
        teacher.lastName.toLowerCase().includes(s) ||
        teacher.email.toLowerCase().includes(s) ||
        teacher.subjectSpecialization.toLowerCase().includes(s);

      const matchesSubject = this.selectedSubject === 'All' || teacher.subjectSpecialization === this.selectedSubject;
      const matchesStatus = this.selectedStatus === 'All' || teacher.status === this.selectedStatus;

      return matchesSearch && matchesSubject && matchesStatus;
    });
  }

  deleteTeacher(teacher: Teacher) {
    const confirmMessage = `⚠️ DELETE TEACHER\n\n` +
      `Teacher: ${teacher.firstName} ${teacher.lastName}\n` +
      `Email: ${teacher.email}\n` +
      `Subject: ${teacher.subjectSpecialization}\n` +
      `Status: ${teacher.status}\n\n` +
      `Are you sure you want to continue? `;

    if (confirm(confirmMessage)) {
      this.teacherService.deleteTeacher(teacher.id).subscribe(() => {
        this.snackBar.open(`✅ Teacher "${teacher.firstName} ${teacher.lastName}" deleted successfully! `, 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });

        this.loadTeachers();
      });
    }
  }
}