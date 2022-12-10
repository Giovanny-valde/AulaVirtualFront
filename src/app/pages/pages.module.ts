import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { PagesRoutingModule } from './pages-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { CursoComponent } from './curso/curso.component';
import { FormCursoComponent } from './curso/form-curso/form-curso.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { FormEstudianteComponent } from './estudiante/form-estudiante/form-estudiante.component';
import { FormCursosEstudiantesComponent } from './estudiante/form-estudiante-curso/form-estudiante-curso.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    CursoComponent,
    CursoComponent,
    FormCursoComponent,
    EstudianteComponent,
    FormEstudianteComponent,
    FormCursosEstudiantesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule
  ]
})
export class PagesModule { }
