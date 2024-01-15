import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';

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
  readonly displayedColumns = ['name', 'category', 'actions']

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){}

  onAdd(){
    this.router.navigate(["new"], {relativeTo:this.route})
  }
}
