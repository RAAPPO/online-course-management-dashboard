import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule
  ],
  template: `
  <div class="add-teacher-container">
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <mat-icon>person_add</mat-icon>
          Add New Teacher
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="teacherForm" (ngSubmit)="onSubmit()">
          <div class="form-grid">
            <mat-form-field appearance="outline"><mat-label>First Name</mat-label>
              <input matInput formControlName="firstName"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Last Name</mat-label>
              <input matInput formControlName="lastName"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Phone</mat-label>
              <input matInput formControlName="phone"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Date of Birth</mat-label>
              <input matInput formControlName="dateOfBirth" type="date"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Address</mat-label>
              <input matInput formControlName="address"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Qualification</mat-label>
              <input matInput formControlName="qualification"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Experience (years)</mat-label>
              <input matInput formControlName="experience" type="number"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Subject Specialization</mat-label>
              <input matInput formControlName="subjectSpecialization"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Status</mat-label>
              <input matInput formControlName="status"></mat-form-field>
          </div>
          <div style="margin-top:2em;text-align:right;">
            <button mat-raised-button color="primary" type="submit" [disabled]="!teacherForm.valid">
              <mat-icon>save</mat-icon> Add Teacher
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styles: [`
    .add-teacher-container { max-width:700px; margin:32px auto; }
    .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
    @media (max-width:600px) { .form-grid { grid-template-columns:1fr; } }
  `]
})
export class AddTeacherComponent {
  teacherForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      phone: [''],
      dateOfBirth: [''],
      address: [''],
      qualification: [''],
      experience: [''],
      subjectSpecialization: [''],
      status: ['Active']
    });
  }
  onSubmit() {
    if (this.teacherForm.valid) {
      this.teacherService.addTeacher({ ...this.teacherForm.value, role: 'teacher', id: 0 }).subscribe(() => {
        this.snackBar.open('Teacher added', 'Close', { duration:2000 });
        this.router.navigate(['/teachers']);
      });
    }
  }
}