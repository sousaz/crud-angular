import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
//import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    AppMaterialModule,
    CommonModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Observable<Course[]>;
  displayedColumns = ['name', 'category']


  constructor(private coursesService: CoursesService){
    this.courses = this.coursesService.list()
    //this.coursesService.list().subscribe(courses => this.courses = courses)
  }
}
