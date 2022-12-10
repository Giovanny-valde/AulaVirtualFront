import { PageResponse } from '../_model/page-response.interface';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Estudiante } from '../_model/estudiante.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService extends GenericService<Estudiante> {

  constructor(
    protected override _http: HttpClient
  ) {
    super(
      _http,
      `${environment.HOST}/estudiantes`
    )
   }

   


}
