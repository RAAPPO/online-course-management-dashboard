import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
            <h3>Personal Information</h3>
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName">
                <mat-error *ngIf="settingsForm.get('firstName')?.hasError('required')">
                  First name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName">
                <mat-error *ngIf="settingsForm.get('lastName')?.hasError('required')">
                  Last name is required
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
              <mat-error *ngIf="settingsForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="settingsForm.get('email')?.hasError('email')">
                Invalid email format
              </mat-error>
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
              <mat-error *ngIf="settingsForm.get('newPassword')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Confirm New Password</mat-label>
              <input matInput formControlName="confirmPassword" type="password">
              <mat-error *ngIf="settingsForm.hasError('passwordMismatch')">
                Passwords do not match
              </mat-error>
            </mat-form-field>

            <div class="actions">
              <button mat-button type="button" (click)="onCancel()">
                <mat-icon>cancel</mat-icon>
                Cancel
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="! settingsForm.valid">
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
      gap: 12px;
    }

    h3 {
      margin-top: 32px;
      margin-bottom: 16px;
      color: #666;
      font-size: 18px;
    }

    h3:first-of-type {
      margin-top: 0;
    }
  `]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.settingsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      currentPassword: [''],
      newPassword: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
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

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSave() {
    if (!this.settingsForm.valid || ! this.currentUser) return;

    const formValue = this.settingsForm.value;
    const currentPassword = formValue.currentPassword;
    const newPassword = formValue.newPassword;

    // Update profile information
    const profileUpdates:  Partial<User> = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone
    };

    this.authService.updateUserProfile(this.currentUser.id, profileUpdates).subscribe(success => {
      if (success) {
        // Check if password change is requested
        if (currentPassword && newPassword) {
          this.authService.changePassword(this.currentUser! .id, currentPassword, newPassword).subscribe(result => {
            if (result.success) {
              this.snackBar.open('✅ Profile and password updated!  Please login again.', 'Close', {
                duration: 4000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
              });
              
              // Logout and redirect to login
              setTimeout(() => {
                this.authService.logout().subscribe(() => {
                  this.router.navigate(['/login']);
                });
              }, 2000);
            } else {
              this.snackBar.open(`❌ ${result.message}`, 'Close', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
              });
            }
          });
        } else {
          this.snackBar.open('✅ Profile updated successfully!', 'Close', {
            duration:  3000,
            horizontalPosition:  'end',
            verticalPosition: 'top'
          });
          
          // Reset password fields
          this.settingsForm.patchValue({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }
      } else {
        this.snackBar.open('❌ Failed to update profile', 'Close', {
          duration: 3000
        });
      }
    });
  }

  onCancel() {
    this.router.navigate([this.getDashboardRoute()]);
  }

  getDashboardRoute(): string {
    if (this.authService.isAdmin()) return '/dashboard';
    if (this.authService.isTeacher()) return '/teacher-dashboard';
    if (this.authService.isStudent()) return '/student-dashboard';
    return '/login';
  }
}