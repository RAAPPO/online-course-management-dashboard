import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
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
    <div class="add-student-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>person_add</mat-icon>
            Add New Student
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" placeholder="e.g., John">
                <mat-error *ngIf="studentForm.get('firstName')?.hasError('required')">
                  First name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" placeholder="e.g., Doe">
                <mat-error *ngIf="studentForm.get('lastName')?.hasError('required')">
                  Last name is required
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="john.doe@example.com">
              <mat-error *ngIf="studentForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="studentForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Phone</mat-label>
                <input matInput formControlName="phone" placeholder="e.g., +1-555-0123">
                <mat-error *ngIf="studentForm.get('phone')?.hasError('required')">
                  Phone is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Date of Birth</mat-label>
                <input matInput [matDatepicker]="dobPicker" formControlName="dateOfBirth">
                <mat-datepicker-toggle matSuffix [for]="dobPicker"></mat-datepicker-toggle>
                <mat-datepicker #dobPicker></mat-datepicker>
                <mat-error *ngIf="studentForm.get('dateOfBirth')?.hasError('required')">
                  Date of birth is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Major</mat-label>
                <mat-select formControlName="major">
                  <mat-option value="Computer Science">Computer Science</mat-option>
                  <mat-option value="Information Technology">Information Technology</mat-option>
                  <mat-option value="Data Science">Data Science</mat-option>
                  <mat-option value="Software Engineering">Software Engineering</mat-option>
                  <mat-option value="Cybersecurity">Cybersecurity</mat-option>
                </mat-select>
                <mat-error *ngIf="studentForm.get('major')?.hasError('required')">
                  Major is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>GPA</mat-label>
                <input matInput type="number" step="0.01" formControlName="gpa" placeholder="e. g., 3.75">
                <mat-error *ngIf="studentForm.get('gpa')?.hasError('min')">
                  GPA must be at least 0.0
                </mat-error>
                <mat-error *ngIf="studentForm.get('gpa')?.hasError('max')">
                  GPA cannot exceed 4.0
                </mat-error>
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
              <button mat-raised-button color="primary" type="submit" 
                [disabled]="!studentForm.valid">
                <mat-icon>save</mat-icon>
                Save Student
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .add-student-container {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }

    mat-card {
      padding: 20px;
    }

    mat-card-header {
      margin-bottom: 30px;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px ! important;
      color: #333;
    }

    .form-row {
      display:  grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .full-width {
      width: 100%;
    }

    mat-form-field {
      width: 100%;
    }

    .form-actions {
      display:  flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 30px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AddStudentComponent {
  studentForm: FormGroup;

  constructor(
    private fb:  FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      major: ['', Validators.required],
      gpa: ['', [Validators.min(0), Validators.max(4)]],
      address: ['']
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;
      const newStudent = {
        ...formValue,
        dateOfBirth:  this.formatDate(formValue.dateOfBirth),
        enrollmentDate: this.formatDate(new Date()),
        status: 'Active' as const
      };

      this.studentService.addStudent(newStudent).subscribe(() => {
        this.snackBar.open('✅ Student added successfully!', 'Close', {
          duration:  3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/students']);
      });
    }
  }

  onCancel() {
    if (confirm('Are you sure you want to cancel?  All changes will be lost.')) {
      this.router.navigate(['/students']);
    }
  }

  private formatDate(date:  Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
