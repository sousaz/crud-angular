import { Course } from './../../model/course';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';



import { CoursesService } from '../../services/courses.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
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
    public formUtils: FormUtilsService
    ){

    const course: Course = this.route.snapshot.data["course"]

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    })
  }

  private retrieveLessons(course: Course){
    const lessons = []
    if(course?.lessons){
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    } else {
      lessons.push(this.createLesson())
    }
    return lessons
  }

  private createLesson(lesson: Lesson = {id: "", name: "", youtubeUrl: ""}){
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
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
    if(this.form.valid){
      this.service.save(this.form.value).subscribe({next: () => this.onSuccess(), error: () => this.onError()});
      this.onCancel()
    } else {
      this.formUtils.validateAllFormFields(this.form)
    }
  }

  private onSuccess(){
    this._snackBar.open("Curso salvo com sucesso!", "", {duration: 5000})
  }

  private onError(){
    this._snackBar.open("Erro ao salvar curso", "", {duration: 5000})
  }
}
