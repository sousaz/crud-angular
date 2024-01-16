import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    SharedModule,
    AppMaterialModule,
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  @Input() courses: Course[] = []
  @Output() add = new EventEmitter(false)
  @Output() edit = new EventEmitter(false)
  readonly displayedColumns = ['name', 'category', 'actions']

  constructor(){}

  onAdd(){
    this.add.emit(true)
  }

  onEdit(course: Course){
    this.edit.emit(course)
  }
}
