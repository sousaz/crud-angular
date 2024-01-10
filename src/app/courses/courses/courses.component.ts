import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    AppMaterialModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Course[] = [];
  displayedColumns = ['name', 'category']


  constructor(private coursesService: CoursesService){
    this.coursesService.list().subscribe(courses => this.courses = courses)
  }
}
