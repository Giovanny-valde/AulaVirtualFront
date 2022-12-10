import { PageResponse } from '../_model/page-response.interface';
import { HttpClient } from '@angular/common/http';
import { CursosEstudiantes } from '../_model/cursoEstudiante.interface';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoEstudianteService extends GenericService<CursosEstudiantes> {

  constructor(
    protected override _http: HttpClient
  ) {
    super(
      _http,
      `${environment.HOST}/cursosEstudiantes`
    )
   }

   getItemsByEstudianteId(id: string) {
    return this._http.get<PageResponse<CursosEstudiantes>>(`${this._url}/byIdEstudiante/${id}`);
  }
}

