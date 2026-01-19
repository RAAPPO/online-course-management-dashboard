export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Resolved'; // Tracks if admin has fixed it
}