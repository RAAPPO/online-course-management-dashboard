import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template:  `
    <div class="student-list-container">
      <div class="header">
        <h1>👥 Students</h1>
        <button mat-raised-button color="primary" routerLink="/students/new">
          <mat-icon>person_add</mat-icon>
          Add New Student
        </button>
      </div>

      <mat-card class="filter-card">
        <mat-card-content>
          <div class="filters">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search students... </mat-label>
              <input matInput [(ngModel)]="searchTerm" placeholder="Search by name or email">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Major</mat-label>
              <mat-select [(ngModel)]="selectedMajor">
                <mat-option value="All">All Majors</mat-option>
                <mat-option value="Computer Science">Computer Science</mat-option>
                <mat-option value="Information Technology">Information Technology</mat-option>
                <mat-option value="Data Science">Data Science</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="selectedStatus">
                <mat-option value="All">All Status</mat-option>
                <mat-option value="Active">Active</mat-option>
                <mat-option value="Inactive">Inactive</mat-option>
                <mat-option value="Graduated">Graduated</mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <div class="student-count">
            <p>Showing {{ filteredStudents.length }} of {{ students.length }} students</p>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="students-grid">
        <mat-card *ngFor="let student of filteredStudents" class="student-card">
          <mat-card-header>
            <div mat-card-avatar class="student-avatar">
              {{ student.firstName.charAt(0) }}{{ student.lastName.charAt(0) }}
            </div>
            <mat-card-title>{{ student.firstName }} {{ student.lastName }}</mat-card-title>
            <mat-card-subtitle>{{ student.email }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="student-info">
              <div class="info-row">
                <mat-icon>school</mat-icon>
                <span>{{ student.major }}</span>
              </div>
              <div class="info-row">
                <mat-icon>phone</mat-icon>
                <span>{{ student.phone }}</span>
              </div>
              <div class="info-row">
                <mat-icon>location_on</mat-icon>
                <span>{{ student.address }}</span>
              </div>
              <div class="info-row">
                <mat-icon>calendar_today</mat-icon>
                <span>Enrolled: {{ student.enrollmentDate }}</span>
              </div>
            </div>

            <div class="student-meta">
              <mat-chip-set>
                <mat-chip [class]="'status-' + student.status.toLowerCase()">
                  {{ student.status }}
                </mat-chip>
                <mat-chip *ngIf="student.gpa" class="gpa-chip">
                  <mat-icon>star</mat-icon>
                  GPA: {{ student.gpa }}
                </mat-chip>
              </mat-chip-set>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/students', student.id]">
              <mat-icon>visibility </mat-icon>
              View Profile
            </button>
            <button mat-button color="accent" [routerLink]="['/students', student.id, 'edit']">
              <mat-icon>edit</mat-icon>
              Edit
            </button>
            <button mat-icon-button color="warn" (click)="deleteStudent(student)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div *ngIf="filteredStudents.length === 0" class="no-results">
        <mat-icon>person_off</mat-icon>
        <h2>No students found</h2>
        <p>Try adjusting your filters</p>
      </div>
    </div>
  `,
  styles: [`
    .student-list-container {
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
      grid-template-columns:  2fr 1fr 1fr;
      gap: 20px;
    }

    .search-field {
      width: 100%;
    }

    .student-count {
      margin-top: 15px;
      color: #666;
    }

    .students-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .student-card {
      transition: all 0.3s;
    }

    .student-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    .student-avatar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px ! important;
      height: 50px !important;
      border-radius: 50%;
    }

    mat-card-title {
      font-size: 18px ! important;
      font-weight:  600 !important;
    }

    mat-card-subtitle {
      color: #666 !important;
      font-size: 14px !important;
    }

    .student-info {
      margin:  15px 0;
    }

    .info-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom:  10px;
      color: #555;
      font-size: 14px;
    }

    .info-row mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #999;
    }

    .student-meta {
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

    .status-graduated {
      background: #e3f2fd !important;
      color: #1565c0 !important;
    }

    .gpa-chip {
      background: #fff3e0 !important;
      color: #e65100 !important;
      font-weight: 600 !important;
    }

    mat-card-actions {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px !important;
    }

    .no-results {
      text-align:  center;
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

      .students-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm = '';
  selectedMajor = 'All';
  selectedStatus = 'All';

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.filterStudents();
    });
  }

  ngDoCheck() {
    this.filterStudents();
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = ! this.searchTerm || 
        student.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesMajor = this.selectedMajor === 'All' || student.major === this.selectedMajor;
      const matchesStatus = this.selectedStatus === 'All' || student.status === this.selectedStatus;

      return matchesSearch && matchesMajor && matchesStatus;
    });
  }

deleteStudent(student: Student) {
  // 1. Open the dialog
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Delete Student',
      message: `Are you sure you want to delete ${student.firstName} ${student.lastName}? This action cannot be undone.`
    }
  });

  // 2. Wait for the result
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      // 3. User clicked "Delete" - Proceed with deletion
      this.studentService.deleteStudent(student.id).subscribe(() => {
        this.snackBar.open('✅ Student deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loadStudents();
      });
    }
  });
}
}