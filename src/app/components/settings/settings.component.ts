import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="settings-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>settings</mat-icon>
            Profile Settings
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="settingsForm" (ngSubmit)="onSave()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName">
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone">
            </mat-form-field>

            <h3>Change Password</h3>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Current Password</mat-label>
              <input matInput formControlName="currentPassword" type="password">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>New Password</mat-label>
              <input matInput formControlName="newPassword" type="password">
            </mat-form-field>

            <div class="actions">
              <button mat-raised-button color="primary" type="submit">
                <mat-icon>save</mat-icon>
                Save Changes
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 32px;
      max-width: 800px;
      margin: 0 auto;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px ! important;
    }

    .form-row {
      display:  grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .full-width {
      width: 100%;
    }

    .actions {
      margin-top: 24px;
      display: flex;
      justify-content: flex-end;
    }

    h3 {
      margin-top: 32px;
      margin-bottom:  16px;
      color: #666;
    }
  `]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.settingsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      currentPassword: [''],
      newPassword: ['']
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.settingsForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
        phone: this.currentUser.phone || ''
      });
    }
  }

  onSave() {
    this.snackBar.open('✅ Settings saved successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}