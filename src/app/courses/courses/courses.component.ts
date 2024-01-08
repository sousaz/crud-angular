import { Component } from '@angular/core';
import { Course } from '../model/course'
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatTableModule,
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
