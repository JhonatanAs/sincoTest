import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constantes } from '../models/Constantes';
import { Persona } from '../models/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  API_URL = Constantes.API_URL;
  constructor(private httpClient: HttpClient) {

  }
  getPersonas(type: number): Observable<any> {
    return this.httpClient.get<Persona[]>(this.API_URL + 'Personas/users/'+type);
  }
  addPersona(persona: Persona): Observable<any> {
    return this.httpClient.post(this.API_URL + 'Personas/users/',persona);
  }

  deletePersona(idPersona:number){
    return this.httpClient.delete(this.API_URL + 'Personas/users/'+idPersona);
  }

  updatePersona(persona:Persona): Observable<any> {
    return this.httpClient.put(this.API_URL + 'Personas/users/'+persona.idPersona,persona);
  }
}
