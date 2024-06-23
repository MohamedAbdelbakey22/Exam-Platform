import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../interfaces/course.js';

@Pipe({
  name: 'coursesearch'
})
export class CoursesearchPipe implements PipeTransform {

  transform(courses: Course[], term: string): Course[]{
    return courses?.filter(course=>course.code?.includes(term)|| course.name?.toLowerCase().includes(term.toLowerCase())) ;
  }

}
