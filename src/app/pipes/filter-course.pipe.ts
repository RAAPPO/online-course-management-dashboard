import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course.model';

@Pipe({
  name:  'filterCourse',
  standalone: true
})
export class FilterCoursePipe implements PipeTransform {
  transform(courses: Course[], searchTerm: string, category: string, level: string): Course[] {
    if (!courses) return [];

    let filtered = courses;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term)
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(course => course.category === category);
    }

    if (level && level !== 'All') {
      filtered = filtered.filter(course => course.level === level);
    }

    return filtered;
  }
}