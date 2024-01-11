import { Component } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
//import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of } from 'rxjs';
import { publicDecrypt } from 'crypto';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

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


  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
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
}
