import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <div class="dashboard-container">
      <h1 class="page-title">📊 Dashboard</h1>
      
      <div class="stats-grid">
        <mat-card class="stat-card courses">
          <mat-card-content>
            <mat-icon class="stat-icon">school</mat-icon>
            <div class="stat-info">
              <h2>{{ stats.totalCourses }}</h2>
              <p>Total Courses</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card students">
          <mat-card-content>
            <mat-icon class="stat-icon">people</mat-icon>
            <div class="stat-info">
              <h2>{{ stats.totalStudents }}</h2>
              <p>Total Students</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card enrollments">
          <mat-card-content>
            <mat-icon class="stat-icon">how_to_reg</mat-icon>
            <div class="stat-info">
              <h2>{{ stats.activeEnrollments }}</h2>
              <p>Active Enrollments</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card completed">
          <mat-card-content>
            <mat-icon class="stat-icon">check_circle</mat-icon>
            <div class="stat-info">
              <h2>{{ stats.completedEnrollments }}</h2>
              <p>Completed</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <mat-card class="action-card" routerLink="/courses">
            <mat-card-content>
              <mat-icon color="primary">add_circle</mat-icon>
              <h3>Manage Courses</h3>
              <p>View and manage all courses</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="action-card" routerLink="/students">
            <mat-card-content>
              <mat-icon color="accent">person_add</mat-icon>
              <h3>Manage Students</h3>
              <p>View and manage students</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="action-card" routerLink="/enrollment">
            <mat-card-content>
              <mat-icon color="warn">assignment</mat-icon>
              <h3>Enroll Students</h3>
              <p>Enroll students in courses</p>
            </mat-card-content>
          </mat-card>

          <mat-card class="action-card" routerLink="/support-requests">
           <mat-card-content>
              <mat-icon color="warn">support_agent</mat-icon>
               <h3>Support Requests</h3>
              <p>View & resolve user messages</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div class="recent-courses">
        <h2>Popular Courses</h2>
        <div class="courses-grid">
          <mat-card *ngFor="let course of popularCourses" class="course-card">
            <mat-card-header>
              <mat-card-title>{{ course.title }}</mat-card-title>
              <mat-card-subtitle>{{ course.instructor }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <div class="course-info">
                <span class="badge level-{{ course.level.toLowerCase() }}">{{ course.level }}</span>
                <span class="enrollment-info">
                  {{ course.enrolled }}/{{ course.capacity }} enrolled
                </span>
              </div>
              <div class="progress-bar">
                <div class="progress" [style.width.%]="(course.enrolled / course.capacity) * 100"></div>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary" [routerLink]="['/courses', course.id]">View Details</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-title {
      font-size: 32px;
      margin-bottom: 30px;
      color: #333;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      cursor: pointer;
      transition: transform 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      padding: 20px ! important;
    }

    .stat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-right:  20px;
    }

    .stat-info h2 {
      font-size: 36px;
      margin: 0;
      font-weight: 600;
    }

    .stat-info p {
      margin: 5px 0 0 0;
      color: #666;
      font-size: 14px;
    }

    .courses { border-left: 4px solid #3f51b5; }
    .students { border-left: 4px solid #4caf50; }
    .enrollments { border-left: 4px solid #ff9800; }
    .completed { border-left: 4px solid #9c27b0; }

    .quick-actions, .recent-courses {
      margin-top: 40px;
    }

    .quick-actions h2, .recent-courses h2 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .action-card {
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
    }

    .action-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }

    .action-card mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 10px;
    }

    .action-card h3 {
      margin: 10px 0;
      font-size: 18px;
    }

    .action-card p {
      color: #666;
      font-size: 14px;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .course-card {
      transition: transform 0.2s;
    }

    .course-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .course-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin:  10px 0;
    }

    .badge {
      padding: 4px 12px;
      border-radius:  12px;
      font-size:  12px;
      font-weight: 600;
    }

    .level-beginner { background:  #e3f2fd; color: #1976d2; }
    .level-intermediate { background: #fff3e0; color: #f57c00; }
    .level-advanced { background: #fce4ec; color: #c2185b; }

    .enrollment-info {
      font-size: 14px;
      color: #666;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 10px;
    }

    .progress {
      height: 100%;
      background: linear-gradient(90deg, #3f51b5, #2196f3);
      transition: width 0.3s;
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    totalCourses: 0,
    totalStudents: 0,
    activeEnrollments: 0,
    completedEnrollments: 0
  };
  
  popularCourses:  any[] = [];

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    this.loadStats();
    this.loadPopularCourses();
  }

  loadStats() {
    this.enrollmentService.getEnrollmentStats().subscribe(stats => {
      this.stats = stats;
    });
  }

  loadPopularCourses() {
    this.courseService.getCourses().subscribe(courses => {
      this.popularCourses = courses
        .sort((a, b) => b.enrolled - a.enrolled)
        .slice(0, 3);
    });
  }
}