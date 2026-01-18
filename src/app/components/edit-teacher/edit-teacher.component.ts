import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-edit-teacher',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="edit-teacher-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>edit</mat-icon>
            Edit Teacher
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="teacherForm" (ngSubmit)="onSubmit()" *ngIf="teacher">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" placeholder="e.g., John">
                <mat-error *ngIf="teacherForm.get('firstName')?.hasError('required')">
                  First name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" placeholder="e.g., Doe">
                <mat-error *ngIf="teacherForm.get('lastName')?.hasError('required')">
                  Last name is required
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="john.doe@example.com">
              <mat-error *ngIf="teacherForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="teacherForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Phone</mat-label>
                <input matInput formControlName="phone" placeholder="e.g., +1-555-5555">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Date of Birth</mat-label>
                <input matInput [matDatepicker]="dobPicker" formControlName="dateOfBirth">
                <mat-datepicker-toggle matSuffix [for]="dobPicker"></mat-datepicker-toggle>
                <mat-datepicker #dobPicker></mat-datepicker>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Qualification</mat-label>
                <input matInput formControlName="qualification" placeholder="e.g., Ph.D. Computer Science">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Experience (years)</mat-label>
                <input matInput formControlName="experience" type="number" placeholder="e.g., 10">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Subject Specialization</mat-label>
                <input matInput formControlName="subjectSpecialization" placeholder="e.g., Algorithms">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select formControlName="status">
                  <mat-option value="Active">Active</mat-option>
                  <mat-option value="Inactive">Inactive</mat-option>
                  <mat-option value="On Leave">On Leave</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Address</mat-label>
              <textarea matInput formControlName="address" rows="2"
                placeholder="Enter full address"></textarea>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button type="button" (click)="onCancel()">
                <mat-icon>cancel</mat-icon>
                Cancel
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="!teacherForm.valid">
                <mat-icon>save</mat-icon>
                Update Teacher
              </button>
            </div>
          </form>
          <div *ngIf="!teacher" class="loading">
            <p>Loading teacher data...</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .edit-teacher-container {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }
    mat-card { padding: 20px; }
    mat-card-header { margin-bottom: 30px; }
    mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px !important;
      color: #333;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .full-width { width: 100%; }
    mat-form-field { width: 100%; }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 30px;
    }
    .loading {
      text-align: center;
      padding: 40px;
      color: #999;
    }
    @media (max-width: 768px) {
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class EditTeacherComponent implements OnInit {
  teacherForm: FormGroup;
  teacher: Teacher | undefined;
  teacherId: number = 0;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      dateOfBirth: [''],
      qualification: [''],
      experience: [''],
      subjectSpecialization: [''],
      status: ['Active', Validators.required],
      address: ['']
    });
  }

  ngOnInit() {
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTeacher();
  }

  loadTeacher() {
    this.teacherService.getTeacherById(this.teacherId).subscribe(teacher => {
      if (teacher) {
        this.teacher = teacher;
        this.teacherForm.patchValue({
          ...teacher,
          dateOfBirth: teacher.dateOfBirth ? new Date(teacher.dateOfBirth) : ''
        });
      } else {
        this.snackBar.open('❌ Teacher not found!', 'Close', { duration: 3000 });
        this.router.navigate(['/teachers']);
      }
    });
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      const formValue = this.teacherForm.value;
      const updatedTeacher = {
        ...formValue,
        dateOfBirth: this.formatDate(formValue.dateOfBirth)
      };
      this.teacherService.updateTeacher(this.teacherId, updatedTeacher).subscribe(() => {
        this.snackBar.open('✅ Teacher updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/teachers']);
      });
    }
  }

  onCancel() {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      this.router.navigate(['/teachers']);
    }
  }

  private formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}