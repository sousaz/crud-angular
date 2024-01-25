import { Course } from './../../model/course';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesService } from '../../services/courses.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../../model/lesson';

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

  form!: FormGroup
  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    ){

    const course: Course = this.route.snapshot.data["course"]

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course))
    })
  }

  private retrieveLessons(course: Course){
    // console.log("testando: ", course);
    const lessons = []
    if(course?.lessons){
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    } else {
      lessons.push(this.createLesson())
    }
    console.log("teste: ", lessons);

    return lessons
  }

  private createLesson(lesson: Lesson = {id: "", name: "", youtubeUrl: ""}){
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
    })
  }

  getLessonsFormArray(){
    return (<UntypedFormArray>this.form.get("lessons")).controls
  }

  addNewLesson(){
    const lessons = this.form.get("lessons") as UntypedFormArray
    lessons.push(this.createLesson())
  }

  removeLesson(index: number){
    const lessons = this.form.get("lessons") as UntypedFormArray
    lessons.removeAt(index)
  }

  onCancel(){
    this.location.back()
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe({next: () => this.onSuccess(), error: () => this.onError()});
    this.onCancel()
  }

  private onSuccess(){
    this._snackBar.open("Curso salvo com sucesso!", "", {duration: 5000})
  }

  private onError(){
    this._snackBar.open("Erro ao salvar curso", "", {duration: 5000})
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName)

    if(field?.hasError("required")){
      return "Campo obrigatório"
    }

    if(field?.hasError("minlength")){
      const requiredLength: number = field.errors
        ? field.errors["minlength"]["requiredLength"]
          : 5
      return `Tamanho minímo precisa ser de ${requiredLength} caracteres`
    }

    if(field?.hasError("maxlength")){
      const requiredLength: number = field.errors ? field.errors["maxlength"]["requiredLength"] : 200
      return `Tamanho máximo excedido de ${requiredLength} caracteres`
    }

    return "Campo inválido"
  }
}
