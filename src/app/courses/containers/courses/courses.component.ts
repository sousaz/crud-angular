import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { CoursesListComponent } from "../../components/courses-list/courses-list.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    imports: [
        AppMaterialModule,
        CommonModule,
        SharedModule,
        CoursesListComponent
    ]
})
export class CoursesComponent {
  courses: Observable<Course[]> | null = null;


  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ){
    this.refresh()
  }

  refresh(){
    this.courses = this.coursesService.list()
      .pipe(
        catchError(error => {
          this.onError("Erro ao carregar cursos.")
          return of([])
        })
      )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onAdd(){
    this.router.navigate(["new"], {relativeTo:this.route})
  }

  onEdit(course: Course){
    this.router.navigate(["edit", course._id], {relativeTo:this.route})
  }

  onRemove(course: Course){
    this.coursesService.remove(course._id)
      .subscribe({
        next: () => {
          this.refresh()
          this.snackBar.open("Curso removido com sucesso!", 'X', {
            duration: 5000,
            verticalPosition: "top",
            horizontalPosition: "center"
          })
        },
        error: () => this.onError("Erro ao tentar remover curso!")
      })
  }
}
