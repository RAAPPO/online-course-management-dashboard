import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TeacherService } from '../../services/teacher.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatSnackBarModule],
  template: `
  <div class="teacher-list-container">
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          <mat-icon>groups</mat-icon>
          All Teachers
        </mat-card-title>
        <button mat-raised-button color="primary" routerLink="/teachers/new">
          <mat-icon>add</mat-icon> Add Teacher
        </button>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="teachers" class="mat-elevation-z1" *ngIf="teachers && teachers.length">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let t">{{ t.firstName }} {{ t.lastName }}</td>
          </ng-container>
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let t">{{ t.email }}</td>
          </ng-container>
          <ng-container matColumnDef="phone">
            <th mat-header-cell *matHeaderCellDef>Phone</th>
            <td mat-cell *matCellDef="let t">{{ t.phone || '-' }}</td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let t">
              <button mat-icon-button color="warn" (click)="deleteTeacher(t)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="['name','email','phone','actions']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['name','email','phone','actions'];"></tr>
        </table>
        <div *ngIf="!teachers || teachers.length===0" style="padding:2em;text-align:center;color:#888;">
          <mat-icon style="font-size: 60px;">group_off</mat-icon>
          <div>No teachers found. Add a new teacher.</div>
        </div>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styles: [`
    .teacher-list-container { max-width:1000px; margin:32px auto; }
    mat-card-header { display:flex; align-items:center; justify-content:space-between; }
    mat-card-title { font-size:2em; }
    table { width:100%; }
    button[mat-icon-button] { margin: 0 4px; }
  `]
})
export class TeacherListComponent implements OnInit {
  teachers: User[] = [];
  constructor(private teacherService: TeacherService, private snackBar: MatSnackBar) {}
  ngOnInit() { this.teacherService.getTeachers().subscribe(t => this.teachers = t); }
  deleteTeacher(t: User) {
    if (confirm(`Delete teacher "${t.firstName} ${t.lastName}"?`)) {
      this.teacherService.deleteTeacher(t.id).subscribe(() => {
        this.snackBar.open('Teacher deleted', 'Close', { duration:2000 });
        this.teacherService.getTeachers().subscribe(tt => this.teachers = tt);
      });
    }
  }
}