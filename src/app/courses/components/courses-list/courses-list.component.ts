import { Component, Input, Output } from '@angular/core';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { Course } from '../../model/course';
import { EventEmitter } from '@angular/core';

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
  @Output() add = new EventEmitter()
  readonly displayedColumns = ['name', 'category', 'actions']

  constructor(){}

  onAdd(){
    this.add.emit('true')
  }
}
