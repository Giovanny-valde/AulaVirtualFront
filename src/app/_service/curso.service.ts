import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Curso } from '../_model/cursos.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends GenericService<Curso> {


  constructor( protected override _http: HttpClient) {
    super(
      _http,
      `${environment.HOST}/cursos`
    )
   }

  
}
