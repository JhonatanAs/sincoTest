import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constantes } from '../models/Constantes';
import { DataReporte } from '../models/DataReporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  API_URL = Constantes.API_URL;
  constructor(private httpClient: HttpClient) {

  }
  getReporte(): Observable<any> {
    return this.httpClient.get<DataReporte[]>(this.API_URL + 'Reporte/report');
  }
}
