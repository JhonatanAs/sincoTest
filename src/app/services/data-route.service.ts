import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataRouteService {

  constructor() { }
  private actualRute = new BehaviorSubject<string>(null);
  currentRute = this.actualRute.asObservable();

  updateCurrentRoute(title: string){
    this.actualRute.next(title);
  }
}
