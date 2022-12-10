
import { CursoComponent } from './curso/curso.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './estudiante/estudiante.component';

const routes: Routes = [
  {
    path:"",
    redirectTo : "curso",
    pathMatch: "full"
  },
  {
    path: "estudiante",
    component: EstudianteComponent,
  },
  {
    path: "curso",
    component: CursoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
