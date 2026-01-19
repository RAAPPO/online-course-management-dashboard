import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone:  true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterLink
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <div class="header-content">
            <mat-icon class="login-icon">school</mat-icon>
            <mat-card-title>Course Management System</mat-card-title>
            <mat-card-subtitle>Sign in to continue</mat-card-subtitle>
          </div>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Enter your email">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' :  'text'" 
                     formControlName="password" placeholder="Enter your password">
              <button mat-icon-button matSuffix type="button" 
                      (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ?  'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
                    class="login-button" [disabled]="loginForm.invalid || isLoading">
              <mat-icon *ngIf="! isLoading">login</mat-icon>
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>

          <div class="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <div class="credential-row">
              <span class="role-label admin">👨‍💼 Admin: </span>
              <code>admin@school.com</code> / <code>admin123</code>
            </div>
            <div class="credential-row">
              <span class="role-label teacher">👨‍🏫 Teacher:</span>
              <code>teacher@school.com</code> / <code>teacher123</code>
            </div>
            <div class="credential-row">
              <span class="role-label student">👨‍🎓 Student:</span>
              <code>student@school.com</code> / <code>student123</code>
            </div>
          </div>
        </mat-card-content>

          <div class="footer-content">
            <a mat-button color="primary" routerLink="/contact">Need Help? Contact Us</a>
            <p class="footer-text">© 2026 Course Management System</p>
          </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      width: 100%;
      max-width: 480px;
      box-shadow:  0 10px 40px rgba(0,0,0,0.3);
    }

    .header-content {
      text-align: center;
      width: 100%;
      padding: 20px 0;
    }

    .login-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #3f51b5;
      margin-bottom: 15px;
    }

    mat-card-title {
      font-size: 28px ! important;
      margin-bottom:  10px !important;
      color: #333 !important;
    }

    mat-card-subtitle {
      font-size: 16px !important;
      color: #666 !important;
    }

    mat-card-content {
      padding:  30px !important;
    }

    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }

    .login-button {
      width: 100%;
      height: 48px;
      font-size:  16px;
      margin-top: 10px;
    }

    .demo-credentials {
      margin-top: 30px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      border-left: 4px solid #3f51b5;
    }

    .demo-credentials p {
      margin:  0 0 15px 0;
      color:  #333;
      font-size: 15px;
      font-weight: 600;
    }

    .credential-row {
      margin:  10px 0;
      padding:  8px 0;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .role-label {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 12px;
      min-width: 90px;
    }

    .role-label.admin {
      background: #ff5722;
      color: white;
    }

    .role-label.teacher {
      background: #2196f3;
      color:  white;
    }

    .role-label.student {
      background: #4caf50;
      color: white;
    }

    .demo-credentials code {
      background:  #e0e0e0;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: monospace;
      color: #c62828;
      font-size: 12px;
    }

    mat-card-footer {
      padding: 20px;
      background: #fafafa;
    }

    .footer-content {
     display: flex;
     flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 10px;
    }

    .footer-text {
      text-align: center;
      margin: 0;
      color: #999;
      font-size: 14px;
    }

    @media (max-width:  600px) {
      .login-container {
        padding: 10px;
      }

      .credential-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
  if (this.loginForm.valid) {
    this.isLoading = true;
    const { email, password } = this. loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (result) => {
        if (result.success && result.user) {
          this.snackBar.open(`Welcome ${result.user.firstName}! `, 'Close', {
            duration: 3000,
            horizontalPosition:  'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          
          // Redirect based on role
          if (result.user.role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else if (result.user.role === 'teacher') {
            this.router. navigate(['/teacher-dashboard']);
          } else if (result.user.role === 'student') {
            this. router.navigate(['/student-dashboard']);
          }
        } else {
          this.snackBar.open(result.message || 'Login failed! ', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass:  ['error-snackbar']
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Login failed!  Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition:  'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }
}
}