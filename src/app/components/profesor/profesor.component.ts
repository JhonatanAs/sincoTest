import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Constantes } from 'src/app/models/Constantes';
import { Persona } from 'src/app/models/Persona';
import { PersonaAsignatura } from 'src/app/models/PersonaAsignatura';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { DataRouteService } from 'src/app/services/data-route.service';
import { PersonasService } from 'src/app/services/personas.service';
import { AddEditPersonaComponent } from '../dialogs/add-edit-persona/add-edit-persona.component';
import { AsociarAsignaturaComponent } from '../dialogs/asociar-asignatura/asociar-asignatura.component';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  dataProfesores: Persona[];
  profesor:Persona;
  dataSource= new MatTableDataSource<Persona>() ;
  profesorAsignatura : PersonaAsignatura;

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

  ngOnInit(): void {
    this.dataRouteService.updateCurrentRoute(this.route.url);
    this.getProfesores(Constantes.TIPO_PROFESOR);
  }

  getProfesores(type:number){
    this.personasService.getPersonas(type).subscribe(
      res=>{
      if(res.length > 0){
        this.dataProfesores = res;
        console.log(this.dataProfesores);
        this.dataSource= new MatTableDataSource<Persona>(res);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openAdicionarProfesor(){
    this.profesor = {
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
    this.openDialogAddEdit(Constantes.TITULO_ADD_PROFESOR, this.profesor, Constantes.AGREGAR_PERSONA);
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
        this.profesor = result.persona;
        if(result.tipoOperacion == Constantes.ACTUALIZAR_PERSONA){
          this.actualizarProfesor(this.profesor);
        }
        else{
          this.registrarProfesor(this.profesor);
        }
      }
    });
  }
  registrarProfesor(profesor:Persona){
    this.personasService.addPersona(profesor)
    .subscribe({
      next: (data) => {
        if(data){
          this.openSnackbar('Profesor registrado',Constantes.TIPO_SNACKBAR_OK);
          this.ngOnInit();
        }
      },error:(error) =>{
        this.openSnackbar(error.error, Constantes.TIPO_SNACKBAR_ERROR);
      }
    });

  }

  openActualizarProfesor(idPersona:number){

    let alumno  = this.dataProfesores.find(element=>element.idPersona == idPersona);
    this.openDialogAddEdit(Constantes.TITULO_UPDATE_PROFESOR,alumno, Constantes.ACTUALIZAR_PERSONA);
  }

  actualizarProfesor(profesor:Persona){
    this.personasService.updatePersona(profesor)
    .subscribe({
      next: (data) => {
        if(data){
          this.openSnackbar('Proofesor actualizado',Constantes.TIPO_SNACKBAR_OK);
          this.ngOnInit();
        }
      },error:(error) =>{
        this.openSnackbar(error.error, Constantes.TIPO_SNACKBAR_ERROR);
      }
    });
  }

  openAsignaturaProfesor(idProfesor:number){

    let alumno  = this.dataProfesores.find(w=>w.idPersona = idProfesor);
    let titulo = Constantes.TIPO_ASIGNATURA_PROFESOR + alumno.nombre +' ' +alumno.apellido;

    const dialogRef = this.dialog.open(AsociarAsignaturaComponent, {
      width: '350px',
      position: {'top': '10px'},
      data: {persona: alumno, titulo: titulo,tipoOperacion: 0},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.profesorAsignatura = result;
        let profesor = this.dataProfesores.find(w=>w.idPersona = this.profesorAsignatura.idPersona);
        profesor.idMateria = this.profesorAsignatura.idmateria;
        this.actualizarProfesor(profesor);
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
