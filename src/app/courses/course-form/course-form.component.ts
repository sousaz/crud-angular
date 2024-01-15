import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesService } from '../services/courses.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    SharedModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form: FormGroup
  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    ){
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    })
  }

  onCancel(){
    this.location.back()
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe(result => this.onSuccess(), error => this.onError());
    this.onCancel()
  }

  private onSuccess(){
    this._snackBar.open("Curso salvo com sucesso!", "", {duration: 5000})
  }

  private onError(){
    this._snackBar.open("Erro ao salvar curso", "", {duration: 5000})
  }
}
