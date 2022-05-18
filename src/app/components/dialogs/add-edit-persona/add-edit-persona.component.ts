import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constantes } from 'src/app/models/Constantes';
import { DataDialogPersona } from 'src/app/models/DataDialogPersona';
import { Persona } from 'src/app/models/Persona';

@Component({
  selector: 'app-add-edit-persona',
  templateUrl: './add-edit-persona.component.html',
  styleUrls: ['./add-edit-persona.component.css']
})
export class AddEditPersonaComponent implements OnInit {

  titulo:string;
  persona:Persona ;
  nombreAccion:string = 'Registrar';
  constructor(
    public dialogRef: MatDialogRef<AddEditPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogPersona,
  ) {}


  ngOnInit(): void {
    console.log(this.data);
    this.isEdit();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {

  }

  guardarPersona(){
    this.dialogRef.close(this.data);
  }

  isEdit(){
    if (this.data.tipoOperacion == Constantes.ACTUALIZAR_PERSONA){
      this.nombreAccion = 'Actualizar';
    }
  }

}
