import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>(this.getMockCourses());
  public courses$ = this.coursesSubject.asObservable();

  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.coursesSubject.value.find(c => c.id === id);
    return of(course);
  }

  addCourse(course: Course): Observable<Course> {
    const courses = this.coursesSubject.value;
    course.id = Math.max(...courses.map(c => c.id)) + 1;
    courses.push(course);
    this.coursesSubject.next(courses);
    return of(course);
  }

  updateCourse(id:  number, course: Partial<Course>): Observable<Course | undefined> {
    const courses = this.coursesSubject.value;
    const index = courses.findIndex(c => c.id === id);
    if (index !== -1) {
      courses[index] = { ...courses[index], ...course };
      this.coursesSubject.next(courses);
      return of(courses[index]);
    }
    return of(undefined);
  }

  deleteCourse(id:  number): Observable<boolean> {
    const courses = this.coursesSubject.value.filter(c => c.id !== id);
    this.coursesSubject.next(courses);
    return of(true);
  }

  private getMockCourses(): Course[] {
    return [
      {
        id:  1,
        title: 'Advanced JavaScript Frameworks',
        code: 'CS401',
        description: 'Deep dive into modern JavaScript frameworks including Angular, React, and Vue',
        instructor: 'John Teacher',
        teacherId: 2,  // Teacher user ID
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
        teacherId: 2,  // Teacher user ID
        category:  'Database',
        level:  'Intermediate',
        duration: 10,
        capacity:  40,
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
        teacherId: 2,  // Teacher user ID
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
        title:  'Machine Learning Fundamentals',
        code: 'CS501',
        description: 'Introduction to ML algorithms and practical applications',
        instructor: 'Dr. Emily Chen',
        teacherId: undefined,  // Not our teacher
        category: 'AI & ML',
        level: 'Advanced',
        duration: 14,
        capacity: 25,
        enrolled: 20,
        price: '1500',
        status: 'Active',
        startDate: '2026-02-10',
        endDate: '2026-05-20',
        syllabus:  ['ML Overview', 'Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Deep Learning', 'Projects'],
        imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c? w=400&h=250&fit=crop'
      },
      {
        id: 5,
        title: 'Cloud Computing with AWS',
        code:  'CS402',
        description: 'Master cloud infrastructure and services on AWS',
        instructor: 'Prof. David Wilson',
        teacherId: undefined,  // Not our teacher
        category: 'Cloud',
        level: 'Intermediate',
        duration: 10,
        capacity: 30,
        enrolled: 22,
        price: '1100',
        status: 'Active',
        startDate: '2026-01-25',
        endDate: '2026-04-05',
        syllabus:  ['AWS Basics', 'EC2', 'S3', 'Lambda', 'RDS', 'DevOps on AWS'],
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa? w=400&h=250&fit=crop'
      },
      {
        id: 6,
        title: 'Mobile App Development',
        code: 'CS403',
        description:  'Build native mobile apps for iOS and Android',
        instructor: 'Dr. Lisa Anderson',
        teacherId: undefined,  // Not our teacher
        category: 'Mobile Development',
        level: 'Intermediate',
        duration: 12,
        capacity: 35,
        enrolled: 30,
        price:  '1250',
        status:  'Active',
        startDate: '2026-02-05',
        endDate: '2026-05-05',
        syllabus: ['Mobile Basics', 'React Native', 'UI/UX', 'APIs', 'State Management', 'Publishing'],
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop'
      }
    ];
  }
}