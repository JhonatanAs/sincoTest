import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlumnoComponent} from './components/alumno/alumno.component';
import {ProfesorComponent} from './components/profesor/profesor.component';
import {AsignaturaComponent} from './components/asignatura/asignatura.component';

const routes: Routes = [
  {path:'profesores',component: ProfesorComponent },
  {path:'alumnos',component: AlumnoComponent },
  {path:'asignaturas',component: AsignaturaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
