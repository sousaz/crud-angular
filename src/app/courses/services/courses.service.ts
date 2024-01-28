import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';
import { CoursePage } from '../model/Course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = "api/courses"

  constructor(private httpClient: HttpClient) { }

  list(page = 0, size = 10){
    return this.httpClient.get<CoursePage>(this.API, { params: {page, size} })
    .pipe(
      first(),
      // delay(5000),
      tap(courses => console.log(courses)
      )
    )
  }

  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`)
  }

  save(record: Course){
    if(record._id){
      return this.update(record)
    }
    return this.create(record)
  }

  private create(record: Course){
    return this.httpClient.post<Course>(this.API, record)
  }

  private update(record: Course){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record)
  }

  remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`)
  }
}
