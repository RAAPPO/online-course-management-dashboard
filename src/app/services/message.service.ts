import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'api/messages';

  constructor(private http: HttpClient) {}

  // Send a new message (Used by Contact Form)
  sendMessage(message: Omit<Message, 'id'>): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }

  // Get all messages (Used by Admin)
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  // Mark as Resolved (Used by Admin)
  markAsResolved(id: number): Observable<Message> {
    return this.http.patch<Message>(`${this.apiUrl}/${id}`, { status: 'Resolved' });
  }

  // Delete message
  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}