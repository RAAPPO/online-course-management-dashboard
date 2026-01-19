import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service'; // <-- Import Service

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <div class="contact-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>mail</mat-icon>
            Contact Support
          </mat-card-title>
          <mat-card-subtitle>How can we help you today?</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
            
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Your Name</mat-label>
                <input matInput name="name" [ngModel]="currentUser?.firstName + ' ' + currentUser?.lastName" required #name="ngModel">
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email Address</mat-label>
                <input matInput name="email" [ngModel]="currentUser?.email" required email #email="ngModel">
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Subject</mat-label>
              <mat-select name="subject" ngModel="General Inquiry" required>
                <mat-option value="General Inquiry">General Inquiry</mat-option>
                <mat-option value="Course Support">Course Support</mat-option>
                <mat-option value="Technical Issue">Technical Issue</mat-option>
                <mat-option value="Feedback">Feedback</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Message</mat-label>
              <textarea matInput name="message" ngModel required rows="5" #message="ngModel"></textarea>
            </mat-form-field>

            <div class="actions">
              <button mat-button type="button" (click)="goBack()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="contactForm.invalid || isSubmitting">
                <mat-icon>send</mat-icon>
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .contact-container { padding: 40px 20px; display: flex; justify-content: center; background: #f5f5f5; min-height: 80vh; }
    mat-card { max-width: 600px; width: 100%; padding: 20px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .full-width { width: 100%; margin-bottom: 10px; }
    .actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
  `]
})
export class ContactComponent implements OnInit {
  currentUser: any;
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService, // <-- Inject Service
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    // Auto-fill form if user is logged in
    this.currentUser = this.authService.getCurrentUser();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isSubmitting = true;
      const formData = form.value;

      const newMessage = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toISOString(),
        status: 'New' as const
      };

      this.messageService.sendMessage(newMessage).subscribe({
        next: () => {
          this.snackBar.open('✅ Message sent! We will reply shortly.', 'Close', { duration: 3000, verticalPosition: 'top' });
          this.isSubmitting = false;
          this.goBack();
        },
        error: () => {
          this.snackBar.open('❌ Error sending message.', 'Close', { duration: 3000 });
          this.isSubmitting = false;
        }
      });
    }
  }

  goBack() {
    if (this.authService.isStudent()) this.router.navigate(['/student-dashboard']);
    else if (this.authService.isTeacher()) this.router.navigate(['/teacher-dashboard']);
    else if (this.authService.isAdmin()) this.router.navigate(['/dashboard']);
    else this.router.navigate(['/login']);
  }
}