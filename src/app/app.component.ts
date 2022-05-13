import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataRouteService } from './services/data-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sincoTest';
  inicio:boolean=true;
  ruta:string;
  constructor(
    private route:Router,
    private dataRouteService: DataRouteService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.updateRute();
    this.dataRouteService.updateCurrentRoute(this.route.url);

  }

  noInicio(){
   this.inicio =false;
  }
  siInicio(){
    this.inicio =true;
    console.log("si inicio p");
    this.ruta="/";
  }
  updateRute() {
    this.dataRouteService.currentRute.subscribe(res => {
      console.log(res);
      if (res != null || res!="") {
        this.ruta = res;

      }

    });
  }
}
