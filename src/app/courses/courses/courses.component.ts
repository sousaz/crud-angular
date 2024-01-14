import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    imports: [
        AppMaterialModule,
        CommonModule,
        SharedModule
    ]
})
export class CoursesComponent {
  courses: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions']


  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ){
    this.courses = this.coursesService.list()
      .pipe(
        catchError(error => {
          this.onError("Erro ao carregar cursos.")
          return of([])
        })
      )
    //this.coursesService.list().subscribe(courses => this.courses = courses)
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onAdd(){
    this.router.navigate(["new"], {relativeTo:this.route})
  }
}
