import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-support-requests',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule,
    MatSnackBarModule,
    RouterLink
  ],
  template: `
    <div class="support-container">
      <div class="header">
        <h1>🎧 Support Requests</h1>
        <button mat-button routerLink="/dashboard">
          <mat-icon>arrow_back</mat-icon> Back to Dashboard
        </button>
      </div>

      <mat-card>
        <mat-card-content>
          <table mat-table [dataSource]="messages" class="messages-table">
            
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef> Status </th>
              <td mat-cell *matCellDef="let msg">
                <mat-chip [class.resolved]="msg.status === 'Resolved'" [class.new]="msg.status === 'New'">
                  {{ msg.status }}
                </mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="sender">
              <th mat-header-cell *matHeaderCellDef> Sender </th>
              <td mat-cell *matCellDef="let msg">
                <strong>{{ msg.name }}</strong><br>
                <small>{{ msg.email }}</small>
              </td>
            </ng-container>

            <ng-container matColumnDef="subject">
              <th mat-header-cell *matHeaderCellDef> Subject </th>
              <td mat-cell *matCellDef="let msg"> {{ msg.subject }} </td>
            </ng-container>

            <ng-container matColumnDef="message">
              <th mat-header-cell *matHeaderCellDef> Message </th>
              <td mat-cell *matCellDef="let msg" class="message-cell"> {{ msg.message }} </td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef> Date </th>
              <td mat-cell *matCellDef="let msg"> {{ msg.date | date:'shortDate' }} </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let msg">
                <button mat-stroked-button color="primary" 
                  *ngIf="msg.status === 'New'" 
                  (click)="resolveMessage(msg)">
                  <mat-icon>check</mat-icon> Resolve
                </button>
                <span *ngIf="msg.status === 'Resolved'" class="done-text">
                  <mat-icon>done_all</mat-icon> Done
                </span>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <div *ngIf="messages.length === 0" class="no-data">
            <mat-icon>inbox</mat-icon>
            <p>No support requests found.</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .support-container { padding: 32px; max-width: 1200px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .messages-table { width: 100%; }
    .message-cell { max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .new { background-color: #ffebee !important; color: #c62828 !important; }
    .resolved { background-color: #e8f5e9 !important; color: #2e7d32 !important; }
    .done-text { color: #2e7d32; display: flex; align-items: center; gap: 5px; }
    .no-data { text-align: center; padding: 40px; color: #999; }
  `]
})
export class SupportRequestsComponent implements OnInit {
  messages: Message[] = [];
  displayedColumns = ['status', 'sender', 'subject', 'message', 'date', 'actions'];

  constructor(private messageService: MessageService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe(msgs => {
      // Sort: Newest first
      this.messages = msgs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }

  resolveMessage(msg: Message) {
    if (confirm('Mark this request as resolved?')) {
      this.messageService.markAsResolved(msg.id).subscribe(() => {
        this.snackBar.open('✅ Request marked as resolved', 'Close', { duration: 2000 });
        this.loadMessages();
      });
    }
  }
}