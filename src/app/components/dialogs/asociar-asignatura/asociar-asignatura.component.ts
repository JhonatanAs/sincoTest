import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Asignatura } from 'src/app/models/Asignatura';
import { Constantes } from 'src/app/models/Constantes';
import { DataDialogPersona } from 'src/app/models/DataDialogPersona';
import { PersonaAsignatura } from 'src/app/models/PersonaAsignatura';
import { AsignaturasService } from 'src/app/services/asignaturas.service';

@Component({
  selector: 'app-asociar-asignatura',
  templateUrl: './asociar-asignatura.component.html',
  styleUrls: ['./asociar-asignatura.component.css']
})
export class AsociarAsignaturaComponent implements OnInit {

  personaAsignatura : PersonaAsignatura;
  fecha = new Date();
  tipoAlumno : number;
  tipoProfesor : number;
  minDate:Date;
  maxDate:Date;
  calificacion: number;
  asignaturas:Asignatura[];
  idAsignatura:number;
  anio:string;

  constructor(
    public dialogRef: MatDialogRef<AsociarAsignaturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogPersona,
    private asignaturaService: AsignaturasService,
    private snackBar: MatSnackBar


  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    //profesores sin asignaturas
    // asignaturas no asociadas
    this.tipoAlumno = Constantes.TIPO_ALUMNO;
    this.tipoProfesor = Constantes.TIPO_PROFESOR;
    this.idAsignatura = null;
    this.calificacion =-1;
    this.anio = this.fecha.getFullYear().toString();
    if(this.data.persona.idTipoPersona == Constantes.TIPO_ALUMNO){
      this.getAsignaturasAlumnos();
    }
    if(this.data.persona.idTipoPersona == Constantes.TIPO_PROFESOR){
      this.getAsignaturasProfesor();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  guardar(){
    this.personaAsignatura ={

      idPersona: this.data.persona.idPersona,
      anio: this.anio,
      calificacion: this.calificacion,
      idTipoPersona: this.data.persona.idTipoPersona,
      idmateria: this.idAsignatura,
    };
    console.log(this.personaAsignatura);

    if((this.data.persona.idTipoPersona == this.tipoAlumno) &&( !this.idAsignatura || this.idAsignatura== null || this.calificacion == null
      ||this.calificacion < 0 || this.calificacion>5)){

      this.openSnackbar('Todos lso campos son obligatorios', Constantes.TIPO_SNACKBAR_ERROR);

    }
    else if (this.data.persona.idTipoPersona == this.tipoProfesor  && this.idAsignatura == null){
      this.openSnackbar('Seleccione una asignatura', Constantes.TIPO_SNACKBAR_ERROR);

    }
    else{
      this.dialogRef.close(this.personaAsignatura);
    }

  }

  dateInput(date: Date) {
    this.anio = date.getFullYear().toString();
  }

  getAsignaturasAlumnos(){
    this.asignaturaService.getAsignaturasAlumnos().subscribe({
      next: (data) => {
        if(data){
          this.asignaturas = data;
        }
      },error:(error) =>{

      }
    });
  }
  getAsignaturasProfesor(){
    this.asignaturaService.getAsignaturasProfesor().subscribe({
      next: (data) => {
        if(data){
          this.asignaturas = data;
        }
      },error:() =>{

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
