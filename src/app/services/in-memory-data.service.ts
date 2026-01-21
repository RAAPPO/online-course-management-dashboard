import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Course } from '../models/course.model';
import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { Enrollment } from '../models/enrollment.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const courses: Course[] = [
      {
        id: 1,
        title: 'Advanced JavaScript Frameworks',
        code: 'CS401',
        description: 'Deep dive into modern JavaScript frameworks including Angular, React, and Vue',
        instructor: 'John Teacher',
        teacherId: 2,
        category: 'Web Development',
        level: 'Advanced',
        duration: 12,
        capacity: 30,
        enrolled: 25,
        price: '1200',
        status: 'Active',
        startDate: '2026-01-15',
        endDate: '2026-04-15',
        syllabus: ['Angular Fundamentals', 'Component Architecture', 'Services & DI', 'Routing', 'Forms', 'HTTP & Observables'],
        imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop'
      },
      {
        id: 2,
        title: 'Database Management Systems',
        code: 'CS301',
        description: 'Comprehensive course on relational and NoSQL databases',
        instructor: 'John Teacher',
        teacherId: 2,
        category: 'Database',
        level: 'Intermediate',
        duration: 10,
        capacity: 40,
        enrolled: 35,
        price: '1000',
        status: 'Active',
        startDate: '2026-02-01',
        endDate: '2026-04-15',
        syllabus: ['SQL Basics', 'Database Design', 'Normalization', 'Transactions', 'NoSQL', 'MongoDB'],
        imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop'
      },
      {
        id: 3,
        title: 'Introduction to Python Programming',
        code: 'CS101',
        description: 'Learn Python from scratch with hands-on projects',
        instructor: 'John Teacher',
        teacherId: 2,
        category: 'Programming',
        level: 'Beginner',
        duration: 8,
        capacity: 50,
        enrolled: 48,
        price: '800',
        status: 'Active',
        startDate: '2026-01-20',
        endDate: '2026-03-20',
        syllabus: ['Python Basics', 'Data Types', 'Functions', 'OOP', 'File Handling', 'Libraries'],
        imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop'
      },
      {
        id: 4,
        title: 'Machine Learning Fundamentals',
        code: 'CS501',
        description: 'Introduction to ML algorithms and practical applications',
        instructor: 'Dr. Emily Chen',
        teacherId: 10,
        category: 'AI & ML',
        level: 'Advanced',
        duration: 14,
        capacity: 25,
        enrolled: 20,
        price: '1500',
        status: 'Active',
        startDate: '2026-02-10',
        endDate: '2026-05-20',
        syllabus: ['ML Overview', 'Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Deep Learning', 'Projects'],
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop'
      },
      {
        id: 5,
        title: 'Cloud Computing with AWS',
        code: 'CS402',
        description: 'Master cloud infrastructure and services on AWS',
        instructor: 'Prof. David Wilson',
        teacherId: 12,
        category: 'Cloud',
        level: 'Intermediate',
        duration: 10,
        capacity: 30,
        enrolled: 22,
        price: '1100',
        status: 'Active',
        startDate: '2026-01-25',
        endDate: '2026-04-05',
        syllabus: ['AWS Basics', 'EC2', 'S3', 'Lambda', 'RDS', 'DevOps on AWS'],
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop'
      },
      {
        id: 6,
        title: 'Mobile App Development',
        code: 'CS403',
        description: 'Build native mobile apps for iOS and Android',
        instructor: 'Dr. Lisa Anderson',
        teacherId: 17,
        category: 'Mobile Development',
        level: 'Intermediate',
        duration: 12,
        capacity: 35,
        enrolled: 30,
        price: '1250',
        status: 'Active',
        startDate: '2026-02-05',
        endDate: '2026-05-05',
        syllabus: ['Mobile Basics', 'React Native', 'UI/UX', 'APIs', 'State Management', 'Publishing'],
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop'
      }
    ];

    const students: Student[] = [
      {
        id: 1,
        firstName: 'Aditya',
        lastName: 'V J',
        email: 'aditya.vj@example.com',
        phone: '+91-9876543210',
        dateOfBirth: '2003-05-15',
        enrollmentDate: '2024-08-01',
        major: 'Computer Science',
        status: 'Active',
        gpa: 3.8,
        address: 'Bangalore, India'
      },
      {
        id: 2,
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91-9876543211',
        dateOfBirth: '2002-08-22',
        enrollmentDate: '2024-08-01',
        major: 'Information Technology',
        status: 'Active',
        gpa: 3.9,
        address: 'Mumbai, India'
      },
      {
        id: 3,
        firstName: 'Rahul',
        lastName: 'Kumar',
        email: 'rahul.kumar@example.com',
        phone: '+91-9876543212',
        dateOfBirth: '2003-02-10',
        enrollmentDate: '2024-08-01',
        major: 'Computer Science',
        status: 'Active',
        gpa: 3.6,
        address: 'Delhi, India'
      },
      {
        id: 4,
        firstName: 'Sneha',
        lastName: 'Patel',
        email: 'sneha.patel@example.com',
        phone: '+91-9876543213',
        dateOfBirth: '2002-11-30',
        enrollmentDate: '2024-08-01',
        major: 'Data Science',
        status: 'Active',
        gpa: 3.7,
        address: 'Pune, India'
      },
      {
        id: 5,
        firstName: 'Arjun',
        lastName: 'Reddy',
        email: 'arjun.reddy@example.com',
        phone: '+91-9876543214',
        dateOfBirth: '2003-07-18',
        enrollmentDate: '2024-08-01',
        major: 'Computer Science',
        status: 'Active',
        gpa: 3.5,
        address: 'Hyderabad, India'
      }
    ];

    const teachers: Teacher[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+91-8000000001',
        dateOfBirth: '1985-02-14',
        qualification: 'Ph.D. Computer Science',
        experience: '12',
        subjectSpecialization: 'Algorithms',
        status: 'Active',
        address: 'Bangalore'
      },
      {
        id: 2,
        firstName: 'John',
        lastName: 'Teacher',
        email: 'teacher@school.com',
        phone: '+1-555-0002',
        dateOfBirth: '1985-05-15',
        qualification: 'M.Sc. Computer Science',
        experience: '10',
        subjectSpecialization: 'Web Development',
        status: 'Active',
        address: '456 Teacher Ave'
      },
      {
        id: 3,
        firstName: 'Priya',
        lastName: 'Mathur',
        email: 'priya.mathur@example.com',
        phone: '+91-8000000002',
        dateOfBirth: '1982-08-19',
        qualification: 'M.Sc. Mathematics',
        experience: '10',
        subjectSpecialization: 'Data Science',
        status: 'On Leave',
        address: 'Delhi'
      },
      {
        id: 10,
        firstName: 'Emily',
        lastName: 'Chen',
        email: 'emily.chen@school.com',
        phone: '+1-555-0020',
        dateOfBirth: '1990-08-01',
        qualification: 'Ph.D. in Mathematics',
        experience: '7',
        subjectSpecialization: 'Data Science',
        status: 'Active',
        address: '123 Teacher St'
      },
      {
        id: 12,
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@school.com',
        phone: '+1-555-0030',
        dateOfBirth: '1982-04-18',
        qualification: 'M.Ed. Science',
        experience: '15',
        subjectSpecialization: 'Physics',
        status: 'Active',
        address: '789 Prof Ave'
      },
      {
        id: 17,
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: 'lisa.anderson@school.com',
        phone: '+1-555-0040',
        dateOfBirth: '1988-11-11',
        qualification: 'MA English',
        experience: '9',
        subjectSpecialization: 'Literature',
        status: 'On Leave',
        address: '456 Lecturer Rd'
      },
      {
        id: 4,
        firstName: 'Arvind',
        lastName: 'Rao',
        email: 'arvind.rao@example.com',
        phone: '+91-8000000003',
        dateOfBirth: '1979-11-11',
        qualification: 'M.Tech Software Engineering',
        experience: '15',
        subjectSpecialization: 'Software Engineering',
        status: 'Active',
        address: 'Hyderabad'
      }
    ];

    const enrollments: Enrollment[] = [
      {
        id: 1,
        studentId: 1,
        courseId: 1,
        enrollmentDate: '2024-01-15',
        status: 'Enrolled',
        grade: undefined
      },
      {
        id: 2,
        studentId: 2,
        courseId: 1,
        enrollmentDate: '2024-01-16',
        status: 'Enrolled',
        grade: 'A'
      },
      {
        id: 3,
        studentId: 1,
        courseId: 2,
        enrollmentDate: '2024-01-10',
        status: 'Completed',
        grade: 'B+'
      },
      {
        id: 4,
        studentId: 3,
        courseId: 3,
        enrollmentDate: '2024-02-01',
        status: 'Enrolled',
        grade: undefined
      },
      {
        id: 5,
        studentId: 2,
        courseId: 4,
        enrollmentDate: '2024-01-20',
        status: 'Completed',
        grade: 'A-'
      }
    ];

    const messages: Message[] = [];

    // The return object keys MUST match the API endpoints (api/courses, api/students)
    return { courses, students, teachers, enrollments, messages };
  }

  // Helper to auto-increment IDs
  genId<T extends { id: number }>(collection: T[]): number {
    return collection.length > 0 ? Math.max(...collection.map(t => t.id)) + 1 : 1;
  }
}