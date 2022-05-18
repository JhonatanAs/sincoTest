import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { MatStepperIntl } from '@angular/material/stepper';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AsignaturaComponent } from './components/asignatura/asignatura.component';
import { AddEditPersonaComponent } from './components/dialogs/add-edit-persona/add-edit-persona.component';
import { ConfirmacionComponent } from './components/dialogs/confirmacion/confirmacion.component';
import { AsociarAsignaturaComponent } from './components/dialogs/asociar-asignatura/asociar-asignatura.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfesorComponent,
    AlumnoComponent,
    AsignaturaComponent,
    AddEditPersonaComponent,
    ConfirmacionComponent,
    AsociarAsignaturaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
