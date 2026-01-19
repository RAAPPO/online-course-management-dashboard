import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // <--- IMPORT FORMS MODULE
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // <--- REQUIRED for Template-Driven Forms
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
            Contact & Feedback
          </mat-card-title>
          <mat-card-subtitle>We'd love to hear from you!</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
            
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Your Name</mat-label>
                <input matInput name="name" ngModel required minlength="3" #name="ngModel">
                <mat-error *ngIf="name.invalid && name.touched">
                  Name is required (min 3 chars)
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email Address</mat-label>
                <input matInput name="email" ngModel required email #email="ngModel">
                <mat-error *ngIf="email.invalid && email.touched">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Subject</mat-label>
              <mat-select name="subject" ngModel="General Inquiry" required>
                <mat-option value="General Inquiry">General Inquiry</mat-option>
                <mat-option value="Course Support">Course Support</mat-option>
                <mat-option value="Technical Issue">Technical Issue</mat-option>
                <mat-option value="Feedback">Feedback / Suggestion</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Message</mat-label>
              <textarea matInput name="message" ngModel required rows="5" #message="ngModel"></textarea>
              <mat-error *ngIf="message.invalid && message.touched">
                Message is required
              </mat-error>
            </mat-form-field>

            <div class="actions">
              <button mat-button type="button" routerLink="/login">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="contactForm.invalid">
                <mat-icon>send</mat-icon>
                Send Message
              </button>
            </div>
          </form>
          </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .contact-container {
      display: flex;
      justify-content: center;
      padding: 40px 20px;
      background: #f5f5f5;
      min-height: 80vh;
    }

    mat-card {
      max-width: 600px;
      width: 100%;
      padding: 20px;
    }

    mat-card-header {
      margin-bottom: 20px;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 10px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;
    }

    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  constructor(private snackBar: MatSnackBar) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted:', form.value);
      
      // Simulate API call
      this.snackBar.open('✅ Message sent successfully! We will contact you soon.', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });

      // Reset the form
      form.resetForm({
        subject: 'General Inquiry' // Reset with default value
      });
    }
  }
}