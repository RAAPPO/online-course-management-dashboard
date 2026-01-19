import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { FilterCoursePipe } from '../../pipes/filter-course.pipe';
import { AuthService } from '../../services/auth.service';
import { HighlightPopularDirective } from '../../directives/highlight-popular'; 

@Component({
  selector: 'app-course-list',
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
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    FilterCoursePipe,
    // 2. ADD TO IMPORTS ARRAY
    HighlightPopularDirective 
  ],
  template: `
    <div class="course-list-container">
      <div class="header">
        <h1>📚 All Courses</h1>
        <button mat-raised-button color="primary" routerLink="/courses/new" *ngIf="canEditCourses()">
          <mat-icon>add</mat-icon>
          Add New Course
        </button>
      </div>

      <div class="filters">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search courses...</mat-label>
          <input matInput [(ngModel)]="searchTerm" placeholder="Search by title, code, or instructor">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Category</mat-label>
          <mat-select [(ngModel)]="selectedCategory">
            <mat-option value="All">All Categories</mat-option>
            <mat-option value="Web Development">Web Development</mat-option>
            <mat-option value="Database">Database</mat-option>
            <mat-option value="Programming">Programming</mat-option>
            <mat-option value="AI & ML">AI & ML</mat-option>
            <mat-option value="Cloud">Cloud</mat-option>
            <mat-option value="Mobile Development">Mobile Development</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Level</mat-label>
          <mat-select [(ngModel)]="selectedLevel">
            <mat-option value="All">All Levels</mat-option>
            <mat-option value="Beginner">Beginner</mat-option>
            <mat-option value="Intermediate">Intermediate</mat-option>
            <mat-option value="Advanced">Advanced</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="course-count">
        <p>Showing {{ (courses | filterCourse: searchTerm:  selectedCategory: selectedLevel).length }} of {{ courses.length }} courses</p>
      </div>

      <div class="courses-grid">
        <mat-card *ngFor="let course of courses | filterCourse: searchTerm: selectedCategory: selectedLevel" 
                  class="course-card"
                  [appHighlightPopular]="course.enrolled">
                  
          <div class="course-image">
            <img [src]="course.imageUrl" [alt]="course.title">
            <span class="status-badge" [class.active]="course.status === 'Active'">
              {{ course.status }}
            </span>
          </div>

          <mat-card-header>
            <mat-card-title>{{ course.title }}</mat-card-title>
            <mat-card-subtitle>
              <mat-icon>person</mat-icon>
              {{ course.instructor }}
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p class="description">{{ course.description }}</p>
            
            <div class="course-meta">
              <mat-chip-set>
                <mat-chip [class]="'level-' + course.level.toLowerCase()">
                  {{ course.level }}
                </mat-chip>
                <mat-chip>
                  <mat-icon>schedule</mat-icon>
                  {{ course.duration }} weeks
                </mat-chip>
              </mat-chip-set>
            </div>

            <div class="enrollment-info">
              <div class="info-item">
                <mat-icon>people</mat-icon>
                <span>{{ course.enrolled }}/{{ course.capacity }}</span>
              </div>
              <div class="info-item price">
                <mat-icon>attach_money</mat-icon>
                <span>{{ course.price }}</span>
              </div>
            </div>

            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress" [style.width.%]="(course.enrolled / course.capacity) * 100"></div>
              </div>
              <span class="progress-text">{{ ((course.enrolled / course.capacity) * 100).toFixed(0) }}% Full</span>
            </div>

            <div class="dates">
              <small>
                <mat-icon>calendar_today</mat-icon>
                {{ course.startDate }} to {{ course.endDate }}
              </small>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/courses', course.id]">
              <mat-icon>visibility</mat-icon>
              View Details
            </button>
            <button mat-button color="accent" [routerLink]="['/courses', course.id, 'edit']" 
                    *ngIf="canEditCourse(course)">
              <mat-icon>edit</mat-icon>
              Edit
            </button>
            <button mat-button color="warn" (click)="deleteCourse(course)" 
                    *ngIf="canDeleteCourse(course)">
              <mat-icon>delete</mat-icon>
              Delete
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div *ngIf="(courses | filterCourse: searchTerm: selectedCategory: selectedLevel).length === 0" class="no-results">
        <mat-icon>search_off</mat-icon>
        <h2>No courses found</h2>
        <p>Try adjusting your filters</p>
      </div>
    </div>
  `,
  styles: [`
    .course-list-container {
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

    .filters {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .search-field {
      width: 100%;
    }

    .course-count {
      margin-bottom: 20px;
      color: #666;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .course-card {
      transition: all 0.3s;
      overflow: visible !important; /* Changed to visible for badge */
    }

    .course-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    .course-image {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .course-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .status-badge {
      position: absolute;
      top:  10px;
      right:  10px;
      padding: 6px 12px;
      border-radius: 20px;
      font-size:  12px;
      font-weight: 600;
      background:  #f44336;
      color: white;
    }

    .status-badge.active {
      background: #4caf50;
    }

    mat-card-header {
      margin:  16px 0;
    }

    mat-card-title {
      font-size: 20px ! important;
      font-weight: 600 !important;
      margin-bottom: 8px ! important;
    }

    mat-card-subtitle {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #666 !important;
    }

    mat-card-subtitle mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .description {
      color: #555;
      line-height: 1.6;
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp:  2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .course-meta {
      margin:  15px 0;
    }

    mat-chip {
      font-size: 12px ! important;
    }

    .level-beginner {
      background: #e3f2fd ! important;
      color: #1976d2 !important;
    }

    .level-intermediate {
      background: #fff3e0 !important;
      color: #f57c00 !important;
    }

    .level-advanced {
      background: #fce4ec !important;
      color: #c2185b !important;
    }

    .enrollment-info {
      display: flex;
      justify-content: space-between;
      margin:  15px 0;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #666;
    }

    .info-item.price {
      font-size:  18px;
      font-weight:  600;
      color: #4caf50;
    }

    .info-item mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .progress-container {
      margin:  15px 0;
    }

    .progress-bar {
      width: 100%;
      height:  8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 5px;
    }

    .progress {
      height: 100%;
      background: linear-gradient(90deg, #3f51b5, #2196f3);
      transition: width 0.3s;
    }

    .progress-text {
      font-size: 12px;
      color: #666;
    }

    .dates {
      margin-top: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .dates small {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #999;
      font-size: 12px;
    }

    .dates mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    mat-card-actions {
      display: flex;
      justify-content: space-between;
      padding: 8px 16px ! important;
    }

    .no-results {
      text-align: center;
      padding:  60px 20px;
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

      .courses-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  searchTerm = '';
  selectedCategory = 'All';
  selectedLevel = 'All';

  constructor(
    private courseService:  CourseService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isTeacher(): boolean {
    return this.authService.isTeacher();
  }

  isStudent(): boolean {
    return this.authService.isStudent();
  }

  canEditCourses(): boolean {
    return this.isAdmin() || this.isTeacher();
  }

  canDeleteCourse(course: Course): boolean {
    if (this.isAdmin()) {
      return true;  // Admin can delete any course
    }
    
    if (this.isTeacher() && course.teacherId === this.authService.getCurrentUser()?.id) {
      return true;  // Teacher can delete only their own courses
    }
    
    return false;  // Students and teachers can't delete others' courses
  }

  canEditCourse(course: Course): boolean {
    if (this.isAdmin()) {
      return true;  // Admin can edit any course
    }
    
    if (this.isTeacher() && course.teacherId === this.authService.getCurrentUser()?.id) {
      return true;  // Teacher can edit only their own courses
    }
    
    return false;  // Students and teachers can't edit others' courses
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  deleteCourse(course: Course) {
    if (! this.canDeleteCourse(course)) {
      this.snackBar.open('❌ You don\'t have permission to delete this course', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
      return;
    }

    const confirmMessage = `⚠️ DELETE COURSE\n\n` +
      `Course: ${course.title}\n` +
      `Code: ${course.code}\n` +
      `Instructor: ${course.instructor}\n` +
      `Enrolled Students: ${course.enrolled}\n\n` +
      `This will affect ${course.enrolled} students and cannot be undone!\n\n` +
      `Are you sure you want to continue? `;
    
    if (confirm(confirmMessage)) {
      this.courseService.deleteCourse(course.id).subscribe(() => {
        this.snackBar.open(`✅ Course "${course.title}" deleted successfully! `, 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        
        // Reload courses
        this.courseService.getCourses().subscribe(courses => {
          this.courses = courses;
        });
      });
    }
  }
}