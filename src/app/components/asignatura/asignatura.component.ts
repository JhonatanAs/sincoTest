import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Asignatura } from 'src/app/models/Asignatura';
import { Constantes } from 'src/app/models/Constantes';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { DataRouteService } from 'src/app/services/data-route.service';
import { AddAsignaturaComponent } from '../dialogs/add-asignatura/add-asignatura.component';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit {

  asignaturas:Asignatura[];
  asignatura:Asignatura;
  dataSource= new MatTableDataSource<Asignatura>() ;
  constructor(
    private route:Router,
    private dataRouteService: DataRouteService,
    private asignaturaService: AsignaturasService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  displayedColumns: string[] = ['codigo', 'nombre'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataRouteService.updateCurrentRoute(this.route.url);
    this.getAsignaturas();
  }

  getAsignaturas():void {
    this.asignaturaService.getAsignaturas()
    .subscribe({
      next: (data) => {
        if(data){
          this.asignaturas = data;
          this.dataSource= new MatTableDataSource<Asignatura>(this.asignaturas);
          this.dataSource.paginator = this.paginator;
        }
      },error:(error) =>{

        this.openSnackbar(error.error, Constantes.TIPO_SNACKBAR_ERROR);
      }
    });
  }

  openAdicionarAsignatura(){
    const dialogRef = this.dialog.open(AddAsignaturaComponent, {
      width: '350px',
      position: {'top': '10px'},
      data: "",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.asignatura = result;
          this.addAsignatura(this.asignatura);

        }

    });
  }
  addAsignatura(asignatura:Asignatura){
    console.log(asignatura);
    this.asignaturaService.addAsignatura(asignatura)
    .subscribe({
      next: (data) => {
        if(data){
          this.ngOnInit();
        }
      },error:(error) =>{

        this.openSnackbar(error.error, Constantes.TIPO_SNACKBAR_ERROR);
      }
    });
  }

  openSnackbar(mensaje:string, tipo:number){
    let config = new MatSnackBarConfig();
    config.duration = Constantes.SNACK_DURATION;

    switch(tipo){
      case Constantes.TIPO_SNACKBAR_OK:
        config.panelClass = ['green-snackbar'];
      break;
      case Constantes.TIPO_SNACKBAR_ERROR:
        config.panelClass = ['red-snackbar'];
      break;
    }
    this.snackBar.open(mensaje, 'x',config);
  }
}
