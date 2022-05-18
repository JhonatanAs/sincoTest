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
import { AsociarAsignaturaComponent } from '../dialogs/asociar-asignatura/asociar-asignatura.component';
import { PersonaAsignatura } from 'src/app/models/PersonaAsignatura';
import { AsignaturasService } from 'src/app/services/asignaturas.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  dataAlumnos:Persona[];
  alumno : Persona;
  alumnoAsignatura : PersonaAsignatura;
  dataSource= new MatTableDataSource<Persona>() ;
  constructor(
    private route:Router,
    private dataRouteService: DataRouteService,
    private personasService: PersonasService,
    private asignaturaService: AsignaturasService,
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
    this.getAlumnos(Constantes.TIPO_ALUMNO);
  }

  getAlumnos(type:number){
    this.personasService.getPersonas(type).subscribe(
      res=>{
      if(res.length > 0){
        this.dataAlumnos = res;
        console.log(this.dataAlumnos);
        this.dataSource= new MatTableDataSource<Persona>(res);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  openAdicionarAlumno(){
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
    this.openDialogAddEdit(Constantes.TITULO_ADD_ALUMNO, this.alumno, Constantes.AGREGAR_PERSONA);
  }
  openDialogAddEdit(titulo:string,alumno:Persona, operacion:number): void {

    const dialogRef = this.dialog.open(AddEditPersonaComponent, {
      width: '350px',
      position: {'top': '10px'},
      data: {persona: alumno, titulo: titulo,tipoOperacion: operacion},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.alumno = result.persona;
        debugger;
        if(result.tipoOperacion == Constantes.ACTUALIZAR_PERSONA){
          this.actualizarAlumno(this.alumno);
        }
        else{
          this.registrarAlumno(this.alumno);
        }
      }
    });
  }

  registrarAlumno(alumno:Persona){
    this.personasService.addPersona(alumno)
    .subscribe({
      next: (data) => {
        if(data){
          this.openSnackbar('Alumno registrado',Constantes.TIPO_SNACKBAR_OK);
          this.ngOnInit();
        }
      },error:(error) =>{
        this.openSnackbar(error.error, Constantes.TIPO_SNACKBAR_ERROR);
      }
    });

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
  openActualizarAlumno(idPersona:number){
    debugger;
    let alumno  = this.dataAlumnos.find(element=>element.idPersona == idPersona);
    this.openDialogAddEdit(Constantes.TITULO_UPDATE_ALUMNO,alumno, Constantes.ACTUALIZAR_PERSONA);
  }
  actualizarAlumno(alumno:Persona){
    this.personasService.updatePersona(alumno)
    .subscribe({
      next: (data) => {
        if(data){
          this.openSnackbar('Alumno actualizado',Constantes.TIPO_SNACKBAR_OK);
          this.ngOnInit();
        }
      },error:(error) =>{
        this.openSnackbar(error.error, Constantes.TIPO_SNACKBAR_ERROR);
      }
    });
  }
  openAsignaturaAlumno(idAlumno:number){

    let alumno  = this.dataAlumnos.find(w=>w.idPersona = idAlumno);
    let titulo = Constantes.TITULO_ASIGNATURA_ALUMNO + alumno.nombre +' ' +alumno.apellido;

    const dialogRef = this.dialog.open(AsociarAsignaturaComponent, {
      width: '350px',
      position: {'top': '10px'},
      data: {persona: alumno, titulo: titulo,tipoOperacion: 0},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.alumnoAsignatura = result;
        this.registrarAsignatura(this.alumnoAsignatura);
      }
    });
  }
  registrarAsignatura(alumnoAsg:PersonaAsignatura){
    this.asignaturaService.addAsignaturaAlumno(alumnoAsg)
    .subscribe({
      next: (data) => {
        if(data){
          this.openSnackbar('Operación realizada',Constantes.TIPO_SNACKBAR_OK);

        }
      },error:(error) =>{
        this.openSnackbar(error.error, Constantes.TIPO_SNACKBAR_ERROR);
      }
    });
  }
}
