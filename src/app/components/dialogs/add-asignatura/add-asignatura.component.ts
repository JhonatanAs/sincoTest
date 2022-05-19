import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Asignatura } from 'src/app/models/Asignatura';

@Component({
  selector: 'app-add-asignatura',
  templateUrl: './add-asignatura.component.html',
  styleUrls: ['./add-asignatura.component.css']
})
export class AddAsignaturaComponent implements OnInit {

  titulo='Registrar asignatura';
  codigo:string;
  nombre:string;
  asignatura: Asignatura;
  constructor(
    public dialogRef: MatDialogRef<AddAsignaturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  registrarAsignatura(){
    this.asignatura = {
      idmateria : 0,
      codigo : this.codigo,
      nombre : this.nombre
    }
    this.dialogRef.close(this.asignatura);
  }
}
