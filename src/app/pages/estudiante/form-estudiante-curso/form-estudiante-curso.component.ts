import { CursosEstudiantes } from 'src/app/_model/cursoEstudiante.interface';
import { CursoEstudianteService } from '../../../_service/cursoEstudiante.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/_model/estudiante.interface';
import { Curso } from 'src/app/_model/cursos.interface';
import { CursoService } from 'src/app/_service/curso.service';
import { EstudianteService } from 'src/app/_service/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-estudiante-curso',
  templateUrl: './form-estudiante-curso.component.html',
  styleUrls: ['./form-estudiante-curso.component.css']
})
export class FormCursosEstudiantesComponent implements OnInit {

  idRuta!: string | null;
  localStorage = localStorage
  form!: FormGroup;
  cursoEstudiantes!: CursosEstudiantes[];
  idcursoEstudiante!: any;

  editcursoEstudiantes : Boolean = false

  estudiante!: Estudiante
  estudiantes! : Estudiante[]
  cursos!  : Curso[]

  constructor(
    private _cursoEstudiantesService: CursoEstudianteService,
    private _cursoService: CursoService,
    private _estudiantesService: EstudianteService,
    private _formBuilder: FormBuilder,
    public _activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.estudiante);
    this.getCursosEstudiantes();
    this.initForm();
  }

  emptyForm() {
    this.form = this._formBuilder.group({
      c_id: [null, [Validators.required]],
      s_id: [this.estudiante.s_id],
    });
  }

  initForm() {
    this.emptyForm();

    this._cursoService.getItems().subscribe(data => {
      this.cursos = data.data
    })

    this._estudiantesService.getItems().subscribe(data => {
      this.estudiantes = data.data
    })

  }

  operate() {
    // let rawValuesForm = this.form.getRawValue();
    if(!this.form.valid){
      this.toastrMenssage('Error', "error")
      return
    }

    let cursoEstudiantes: CursosEstudiantes = {
      c_id : parseInt( this.form.controls["c_id"].value),
      s_id : parseInt( this.form.controls["s_id"].value),
    }

    if (this.editcursoEstudiantes) {
      this.editcursoEstudiantes = false
      this._cursoEstudiantesService.updateItem(cursoEstudiantes , this.idcursoEstudiante).subscribe(data => {
        this.getCursosEstudiantes()
        this.toastrMenssage('Actualizado Exitosamente', "success")
      });
    } else {
      this._cursoEstudiantesService.saveItem(cursoEstudiantes).subscribe(data => {
        this.getCursosEstudiantes()
        this.toastrMenssage('Guardado Exitosamente', "success")
        this.form.controls["c_id"].setValue(null)
      });
    }
  }

  getCursosEstudiantes() {
    this._cursoEstudiantesService.getItemsByEstudianteId(this.estudiante.s_id.toString()).
    subscribe(({data} )=> {
       this.cursoEstudiantes = data
       this.toastrMenssage('Cursos obtenidos exitosamente', "success")
      });
  }

  editCursoEstudiante(data : CursosEstudiantes){
    this.form.controls["c_id"].setValue(data.c_id)
    this.editcursoEstudiantes = true
    this.idcursoEstudiante = data.cxs_id
  }

  eliminar(id: any ) {
      Swal.fire({
        title: '¿Está seguro de realizar esta acción?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F8E12E',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminelo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
          this._cursoEstudiantesService.deleteItem((id)).subscribe(data => {
              this.getCursosEstudiantes()
              this.toastrMenssage('Eliminado Exitosamente', "success")
          })
        }
    })
  }
  
  closeModal() {
    this._activeModal.close();
  }


  toastrMenssage(Mensage : string , estado : "error" | "success"){
    if(estado ==  "success") {
      this.toastr.success( `${Mensage}` , 'Mensaje del sistema!',{
        positionClass: 'toast-bottom-right',
      });
    }else{
      this.toastr.error( `Ocurrio un error` , 'Mensaje del sistema!',{
        positionClass: 'toast-bottom-right',
      });
    }
  }



}
