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
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-edit-course',
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
    <div class="edit-course-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>edit</mat-icon>
            Edit Course
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="courseForm" (ngSubmit)="onSubmit()" *ngIf="course">
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
                <input matInput formControlName="code" placeholder="e. g., CS401">
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
                <input matInput formControlName="instructor" placeholder="e.g., Dr. John Smith">
                <mat-error *ngIf="courseForm.get('instructor')?.hasError('required')">
                  Instructor is required
                </mat-error>
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
                <mat-label>Enrolled Students</mat-label>
                <input matInput type="number" formControlName="enrolled" placeholder="e.g., 25">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select formControlName="status">
                  <mat-option value="Active">Active</mat-option>
                  <mat-option value="Inactive">Inactive</mat-option>
                  <mat-option value="Completed">Completed</mat-option>
                </mat-select>
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
                Update Course
              </button>
            </div>
          </form>

          <div *ngIf="! course" class="loading">
            <p>Loading course data...</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .edit-course-container {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }

    mat-card {
      padding:  20px;
    }

    mat-card-header {
      margin-bottom: 30px;
    }

    mat-card-title {
      display:  flex;
      align-items:  center;
      gap: 10px;
      font-size:  24px ! important;
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
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 30px;
    }

    .loading {
      text-align:  center;
      padding: 40px;
      color: #999;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class EditCourseComponent implements OnInit {
  courseForm: FormGroup;
  course: Course | undefined;
  courseId: number = 0;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
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
      enrolled: [0],
      price: ['', [Validators.required, Validators.min(0)]],
      status: ['Active'],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
  }

  loadCourse() {
    this.courseService.getCourseById(this.courseId).subscribe(course => {
      if (course) {
        this.course = course;
        this.courseForm.patchValue({
          ... course,
          startDate: new Date(course.startDate),
          endDate: new Date(course.endDate)
        });
      } else {
        this.snackBar.open('❌ Course not found! ', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/courses']);
      }
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formValue = this.courseForm.value;
      const updatedCourse = {
        ...formValue,
        startDate: this.formatDate(formValue.startDate),
        endDate: this.formatDate(formValue.endDate)
      };

      this.courseService.updateCourse(this.courseId, updatedCourse).subscribe(() => {
        this.snackBar.open('✅ Course updated successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/courses']);
      });
    }
  }

  onCancel() {
    if (confirm('Are you sure you want to cancel?  All changes will be lost.')) {
      this.router.navigate(['/courses']);
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
