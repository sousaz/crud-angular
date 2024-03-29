import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursePage } from '../../model/Course-page';
import { CoursesService } from '../../services/courses.service';


@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    imports: [
    CommonModule,
    CoursesListComponent,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
  ]
})
export class CoursesComponent {
  courses: Observable<CoursePage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ){
    this.refresh()
  }

  refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}){
    this.courses = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex
          this.pageSize = pageEvent.pageSize
        }),
        catchError(error => {
          this.onError("Erro ao carregar cursos.")
          return of({ courses: [], totalElements: 0, totalPages: 0 })
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover esse curso?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
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
    });



  }

}
