import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/Persona';
import { DataRouteService } from 'src/app/services/data-route.service';
import { PersonasService } from 'src/app/services/personas.service';
import { AddEditPersonaComponent } from '../dialogs/add-edit-persona/add-edit-persona.component';
import { Constantes } from 'src/app/models/Constantes';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { ConfirmacionComponent } from '../dialogs/confirmacion/confirmacion.component';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  dataAlumnos:Persona[];
  alumno : Persona;
  dataSource= new MatTableDataSource<Persona>() ;
  constructor(
    private route:Router,
    private dataRouteService: DataRouteService,
    private personasService: PersonasService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}


  displayedColumns: string[] = ['identificacion', 'nombre', 'apellido', 'edad','direccion', 'telefono', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataRouteService.updateCurrentRoute(this.route.url);
    this.getAlumnos(1);
  }

  getAlumnos(type:number){
    this.personasService.getPersonas(type).subscribe(
      res=>{
      if(res.length > 0){
        this.dataAlumnos = res;
        console.log(this.dataAlumnos);
        this.dataSource= new MatTableDataSource<Persona>(res);
      }
    });
  }
  adicionarAlumno(){
    this.alumno = {
      idPersona :0,
      identificacion:'',
      nombre:'',
      apellido:'',
      edad:0,
      direccion:'',
      telefono:'',
      idMateria:null,
      idTipoPersona:1
    };
    this.openDialogAddEdit(Constantes.TITULO_ADD_ALUMNO, this.alumno);
  }
  openDialogAddEdit(titulo:string,alumno:Persona): void {

    const dialogRef = this.dialog.open(AddEditPersonaComponent, {
      width: '350px',
      position: {'top': '10px'},
      data: {persona: alumno, titulo: titulo},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.alumno = result;
        this.registrarAlumno(this.alumno);
      }
    });
  }

  registrarAlumno(alumno:Persona){
    this.personasService.addPersona(alumno).subscribe(result => {
      if(result){
        //Sthis.getAlumnos(Constantes.TIPO_ALUMNO);
        console.log(result);
        this.ngOnInit();
      }
    }, error => console.log(error));
  }

  eliminarAlumno(idAlumno:number){
  let alumnoDelete = this.dataAlumnos.find(a=>a.idPersona == idAlumno);
  this.dialog
    .open(ConfirmacionComponent, {
      data: '¿Deseas eliminar el estudiante con identificación: '+ alumnoDelete.identificacion+ '?'
    })
    .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if(confirmado){
          this.personasService.deletePersona(idAlumno)
          .subscribe({
            next: (data) => {
              if(data){
                this.openSnackbar('Alumno eliminado',Constantes.TIPO_SNACKBAR_OK);
                this.ngOnInit();
              }
          },error:(error) => {
              console.log(error.error);
              this.openSnackbar(error.error, Constantes.TIPO_SNACKBAR_ERROR);
          }
          });
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
  actualizarAlumno(idPersona:number){
    let alumno  = this.dataAlumnos.find(element=>element.idPersona == idPersona);
    this.openDialogAddEdit(Constantes.TITULO_UPDATE_ALUMNO,alumno);
  }
}
