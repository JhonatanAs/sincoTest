import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asignatura } from '../models/Asignatura';
import { Constantes } from '../models/Constantes';
import { PersonaAsignatura } from '../models/PersonaAsignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  API_URL = Constantes.API_URL;
  constructor(private httpClient: HttpClient) {

  }
  getAsignaturasAlumnos(): Observable<any> {
    return this.httpClient.get<Asignatura>(this.API_URL + 'Asignatura/asignaturas-alumnos');
  }

  getAsignaturasProfesor(): Observable<any> {
    return this.httpClient.get<Asignatura>(this.API_URL + 'Asignatura/asignaturas-profesor');
  }

  getAsignaturas(): Observable<any> {
    return this.httpClient.get<Asignatura>(this.API_URL + 'Asignatura/asignaturas');
  }

  addAsignaturaAlumno(alumnoAsignatura:PersonaAsignatura): Observable<any> {
    return this.httpClient.post(this.API_URL + 'PersonaAsignatura/alumno-asignatura/',alumnoAsignatura);
  }

  addAsignatura(asignatura:Asignatura): Observable<any> {
    return this.httpClient.post(this.API_URL + 'Asignatura/asignaturas/',asignatura);
  }


}
