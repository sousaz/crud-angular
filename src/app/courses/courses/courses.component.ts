import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

import { Course } from '../model/course';

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
  courses: Course[] = [
    {_id: "01",name: "heliana", category: 'Hydrogen'},
    {_id: "02",name: "obama", category: 'Helium'},
  ];
  displayedColumns = ['name', 'category']

  constructor(){
    //this.courses = [];
  }
}
