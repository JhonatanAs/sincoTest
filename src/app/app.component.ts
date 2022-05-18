
import { Router } from '@angular/router';
import { DataRouteService } from './services/data-route.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataReporte } from './models/DataReporte';
import { ReporteService } from './services/reporte.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sincoTest';
  inicio:boolean=true;
  ruta:string;
  dataReporte:DataReporte[];
  dataSource= new MatTableDataSource<DataReporte>() ;
  constructor(
    private route:Router,
    private dataRouteService: DataRouteService,
    private reporteService: ReporteService
  ) {}


  displayedColumns: string[] = ['anio', 'idAlumno', 'nombreAlumno', 'idMateria','nombreMateria', 'idProfesor', 'nombreProfesor', 'calificacion','aprobo'];




  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.updateRute();
    this.dataRouteService.updateCurrentRoute(this.route.url);
    this.getReport();

  }

  noInicio(){
   this.inicio =false;
  }
  siInicio(){
    this.inicio =true;
    this.getReport();
  }
  updateRute() {
    this.dataRouteService.currentRute.subscribe(res => {
      console.log(res);
      if (res != null || res!="") {
        this.ruta = res;

      }

    });
  }
  getReport(){
    this.reporteService.getReporte().subscribe(
      res=>{
        console.log(res);
      if(res.length > 0){
        this.dataSource= new MatTableDataSource<DataReporte>(res) ;
        this.dataSource.paginator = this.paginator;

        console.log(this.dataSource);
      }
    });
  }
}
