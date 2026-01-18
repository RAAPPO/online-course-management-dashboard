import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule
  ],
  template: `
    <div class="course-detail-container" *ngIf="course">
      <button mat-button routerLink="/courses" class="back-button">
        <mat-icon>arrow_back</mat-icon>
        Back to Courses
      </button>

      <div class="course-header">
        <div class="course-image">
          <img [src]="course.imageUrl" [alt]="course.title">
          <span class="status-badge" [class.active]="course.status === 'Active'">
            {{ course.status }}
          </span>
        </div>

        <div class="course-info">
          <h1>{{ course.title }}</h1>
          <p class="course-code">Course Code: {{ course.code }}</p>
          
          <div class="instructor-info">
            <mat-icon>person</mat-icon>
            <span>{{ course.instructor }}</span>
          </div>

          <div class="meta-info">
            <mat-chip-set>
              <mat-chip [class]="'level-' + course.level.toLowerCase()">
                <mat-icon>trending_up</mat-icon>
                {{ course.level }}
              </mat-chip>
              <mat-chip>
                <mat-icon>category</mat-icon>
                {{ course.category }}
              </mat-chip>
              <mat-chip>
                <mat-icon>schedule</mat-icon>
                {{ course.duration }} weeks
              </mat-chip>
              <mat-chip class="price-chip">
                <mat-icon>attach_money</mat-icon>
                {{ course.price }}
              </mat-chip>
            </mat-chip-set>
          </div>

          <div class="enrollment-stats">
            <div class="stat">
              <h3>{{ course.enrolled }}</h3>
              <p>Enrolled</p>
            </div>
            <div class="stat">
              <h3>{{ course.capacity }}</h3>
              <p>Capacity</p>
            </div>
            <div class="stat">
              <h3>{{ course.capacity - course.enrolled }}</h3>
              <p>Available</p>
            </div>
          </div>

          <div class="progress-section">
            <div class="progress-bar">
              <div class="progress" [style.width.%]="(course.enrolled / course.capacity) * 100"></div>
            </div>
            <span class="progress-label">{{ ((course.enrolled / course.capacity) * 100).toFixed(0) }}% Full</span>
          </div>

          <div class="action-buttons">
            <button mat-raised-button color="primary" routerLink="/enrollment">
              <mat-icon>how_to_reg</mat-icon>
              Enroll Student
            </button>
            <button mat-raised-button color="accent">
              <mat-icon>edit</mat-icon>
              Edit Course
            </button>
            <button mat-stroked-button>
              <mat-icon>share</mat-icon>
              Share
            </button>
          </div>
        </div>
      </div>

      <mat-divider></mat-divider>

      <div class="course-content">
        <mat-card class="section-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>description</mat-icon>
            <mat-card-title>Course Description</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{ course.description }}</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="section-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>list</mat-icon>
            <mat-card-title>Course Syllabus</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item *ngFor="let topic of course.syllabus; let i = index">
                <mat-icon matListItemIcon>check_circle</mat-icon>
                <div matListItemTitle>Module {{ i + 1 }}: {{ topic }}</div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>

        <mat-card class="section-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>calendar_today</mat-icon>
            <mat-card-title>Course Schedule</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="schedule-info">
              <div class="schedule-item">
                <mat-icon>event</mat-icon>
                <div>
                  <strong>Start Date</strong>
                  <p>{{ course.startDate }}</p>
                </div>
              </div>
              <div class="schedule-item">
                <mat-icon>event</mat-icon>
                <div>
                  <strong>End Date</strong>
                  <p>{{ course.endDate }}</p>
                </div>
              </div>
              <div class="schedule-item">
                <mat-icon>schedule</mat-icon>
                <div>
                  <strong>Duration</strong>
                  <p>{{ course.duration }} weeks</p>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="section-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>info</mat-icon>
            <mat-card-title>Additional Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item">
                <mat-icon>trending_up</mat-icon>
                <div>
                  <strong>Level</strong>
                  <p>{{ course.level }}</p>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>category</mat-icon>
                <div>
                  <strong>Category</strong>
                  <p>{{ course.category }}</p>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>attach_money</mat-icon>
                <div>
                  <strong>Price</strong>
                  <p>₹{{ course.price }}</p>
                </div>
              </div>
              <div class="info-item">
                <mat-icon>people</mat-icon>
                <div>
                  <strong>Capacity</strong>
                  <p>{{ course.capacity }} students</p>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>

    <div *ngIf="! course" class="loading">
      <mat-icon>hourglass_empty</mat-icon>
      <p>Loading course details...</p>
    </div>
  `,
  styles: [`
    .course-detail-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .back-button {
      margin-bottom: 20px;
    }

    .course-header {
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: 40px;
      margin-bottom:  40px;
    }

    .course-image {
      position: relative;
      width:  100%;
      height: 300px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .course-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .status-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size:  14px;
      font-weight: 600;
      background: #f44336;
      color: white;
    }

    .status-badge.active {
      background: #4caf50;
    }

    .course-info h1 {
      font-size: 32px;
      margin: 0 0 10px 0;
      color:  #333;
    }

    .course-code {
      color: #666;
      font-size: 14px;
      margin-bottom: 15px;
    }

    .instructor-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      font-size: 16px;
      color: #555;
    }

    .meta-info {
      margin-bottom: 25px;
    }

    mat-chip {
      font-size: 13px ! important;
    }

    .level-beginner {
      background:  #e3f2fd !important;
      color: #1976d2 !important;
    }

    .level-intermediate {
      background: #fff3e0 !important;
      color: #f57c00 ! important;
    }

    .level-advanced {
      background:  #fce4ec !important;
      color: #c2185b !important;
    }

    .price-chip {
      background: #e8f5e9 !important;
      color: #2e7d32 !important;
      font-weight: 600 !important;
    }

    .enrollment-stats {
      display: flex;
      gap: 30px;
      margin-bottom:  20px;
    }

    .stat {
      text-align:  center;
    }

    .stat h3 {
      font-size: 28px;
      margin: 0;
      color: #3f51b5;
    }

    .stat p {
      margin: 5px 0 0 0;
      color: #666;
      font-size: 14px;
    }

    .progress-section {
      margin-bottom: 25px;
    }

    .progress-bar {
      width:  100%;
      height: 10px;
      background: #e0e0e0;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress {
      height: 100%;
      background: linear-gradient(90deg, #3f51b5, #2196f3);
      transition: width 0.3s;
    }

    .progress-label {
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }

    .action-buttons {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    mat-divider {
      margin: 40px 0;
    }

    .course-content {
      display: grid;
      gap: 24px;
    }

    .section-card {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .section-card mat-card-header {
      margin-bottom: 16px;
    }

    mat-icon[mat-card-avatar] {
      background: #3f51b5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .schedule-info, .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .schedule-item, .info-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .schedule-item mat-icon, .info-item mat-icon {
      color: #3f51b5;
    }

    .schedule-item strong, .info-item strong {
      display: block;
      margin-bottom: 5px;
      color: #333;
    }

    .schedule-item p, .info-item p {
      margin: 0;
      color:  #666;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 400px;
      color: #999;
    }

    .loading mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 20px;
    }

    @media (max-width: 968px) {
      .course-header {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourseById(id).subscribe(course => {
      this.course = course;
      if (!course) {
        this.router.navigate(['/courses']);
      }
    });
  }
}