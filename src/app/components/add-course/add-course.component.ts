import { Component, OnInit } from '@angular/core';
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
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-course',
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
    <div class="add-course-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>add_circle</mat-icon>
            Add New Course
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="courseForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Course Title</mat-label>
                <input matInput formControlName="title" placeholder="e.g., Advanced JavaScript">
                <mat-error *ngIf="courseForm.get('title')?.hasError('required')">
                  Title is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Course Code</mat-label>
                <input matInput formControlName="code" placeholder="e.g., CS401">
                <mat-error *ngIf="courseForm.get('code')?.hasError('required')">
                  Code is required
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="3" 
                placeholder="Enter course description"></textarea>
              <mat-error *ngIf="courseForm.get('description')?.hasError('required')">
                Description is required
              </mat-error>
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Instructor</mat-label>
                <mat-select formControlName="instructor" [disabled]="isTeacher()">
                  <mat-option value="John Teacher">John Teacher</mat-option>
                  <mat-option value="Dr. Emily Chen">Dr. Emily Chen</mat-option>
                  <mat-option value="Prof. David Wilson">Prof. David Wilson</mat-option>
                  <mat-option value="Dr. Lisa Anderson">Dr. Lisa Anderson</mat-option>
                </mat-select>
                <mat-error *ngIf="courseForm.get('instructor')?.hasError('required')">
                  Instructor is required
                </mat-error>
                <mat-hint *ngIf="isTeacher()">Auto-filled with your name</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Category</mat-label>
                <mat-select formControlName="category">
                  <mat-option value="Web Development">Web Development</mat-option>
                  <mat-option value="Database">Database</mat-option>
                  <mat-option value="Programming">Programming</mat-option>
                  <mat-option value="AI & ML">AI & ML</mat-option>
                  <mat-option value="Cloud">Cloud</mat-option>
                  <mat-option value="Mobile Development">Mobile Development</mat-option>
                </mat-select>
                <mat-error *ngIf="courseForm.get('category')?.hasError('required')">
                  Category is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Level</mat-label>
                <mat-select formControlName="level">
                  <mat-option value="Beginner">Beginner</mat-option>
                  <mat-option value="Intermediate">Intermediate</mat-option>
                  <mat-option value="Advanced">Advanced</mat-option>
                </mat-select>
                <mat-error *ngIf="courseForm.get('level')?.hasError('required')">
                  Level is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Duration (weeks)</mat-label>
                <input matInput type="number" formControlName="duration" placeholder="e.g., 12">
                <mat-error *ngIf="courseForm.get('duration')?.hasError('required')">
                  Duration is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Capacity</mat-label>
                <input matInput type="number" formControlName="capacity" placeholder="e.g., 30">
                <mat-error *ngIf="courseForm.get('capacity')?.hasError('required')">
                  Capacity is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Price ($)</mat-label>
                <input matInput type="number" formControlName="price" placeholder="e.g., 1200">
                <mat-error *ngIf="courseForm.get('price')?.hasError('required')">
                  Price is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Start Date</mat-label>
                <input matInput [matDatepicker]="startPicker" formControlName="startDate">
                <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                <mat-datepicker #startPicker></mat-datepicker>
                <mat-error *ngIf="courseForm.get('startDate')?.hasError('required')">
                  Start date is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>End Date</mat-label>
                <input matInput [matDatepicker]="endPicker" formControlName="endDate">
                <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                <mat-datepicker #endPicker></mat-datepicker>
                <mat-error *ngIf="courseForm.get('endDate')?.hasError('required')">
                  End date is required
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Image URL</mat-label>
              <input matInput formControlName="imageUrl" 
                placeholder="https://images.unsplash.com/photo-... ">
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button type="button" (click)="onCancel()">
                <mat-icon>cancel</mat-icon>
                Cancel
              </button>
              <button mat-raised-button color="primary" type="submit" 
                [disabled]="! courseForm.valid">
                <mat-icon>save</mat-icon>
                Save Course
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .add-course-container {
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
      font-size: 24px !  important;
      color: #333;
    }

    .form-row {
      display:   grid;
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
      display:   flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top:  30px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AddCourseComponent implements OnInit {
  courseForm:   FormGroup;
  currentUser: any;

  constructor(
    private fb:   FormBuilder,
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      instructor: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      imageUrl: ['https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop']
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    
    // If teacher, auto-fill their name and set teacherId
    if (this.isTeacher() && this.currentUser) {
      const teacherName = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
      this.courseForm.patchValue({
        instructor: teacherName
      });
    }
  }

  isTeacher(): boolean {
    return this.authService.isTeacher();
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formValue = this.courseForm.value;
      const newCourse = {
        ...formValue,
        enrolled: 0,
        status: 'Active',
        teacherId: this.isTeacher() ? this.currentUser?.id : undefined,
        startDate: this.formatDate(formValue.startDate),
        endDate: this.formatDate(formValue.endDate),
        syllabus: []
      };

      this.courseService.addCourse(newCourse).subscribe(() => {
        this.snackBar.open('✅ Course added successfully!', 'Close', {
          duration:   3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/courses']);
      });
    }
  }

  onCancel() {
    if (confirm('Are you sure you want to cancel?   All changes will be lost.')) {
      this.router.navigate(['/courses']);
    }
  }

  private formatDate(date:   Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}