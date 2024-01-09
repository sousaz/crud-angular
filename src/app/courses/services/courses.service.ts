import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  list(): Course[]{
    return [
      {_id: "01",name: "heliana", category: 'Hydrogen'},
      {_id: "02",name: "obama", category: 'Helium'},
    ];
  }
}
