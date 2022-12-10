import { Curso } from "./cursos.interface";
import { Estudiante } from "./estudiante.interface";

export interface CursosEstudiantes {
  cxs_id? : number;
  c_id : number;
  s_id : number;
  test_students?: Estudiante;
  test_courses?: Curso;
}

