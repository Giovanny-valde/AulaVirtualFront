import { Curso } from 'src/app/_model/cursos.interface';
import { CursoService } from '../../../_service/curso.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-curso',
  templateUrl: './form-curso.component.html',
  styleUrls: ['./form-curso.component.css']
})
export class FormCursoComponent implements OnInit {

  idRuta!: string | null;
  localStorage = localStorage
  form!: FormGroup;
  cursos!: Curso[];
  curso!: Curso;

  constructor(
    private _cursoService: CursoService,
    private _formBuilder: FormBuilder,
    public _activeModal: NgbActiveModal,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.getCursos();
    this.initForm();
  }

  emptyForm() {
    this.form = this._formBuilder.group({
      c_id: [null],
      credits: [null, [Validators.required ,  Validators.maxLength(6)]],
      name: [null, [Validators.required , Validators.maxLength(100)]]
    });
  }

  editForm() {
    this.form = this._formBuilder.group({
      c_id: [this.curso.c_id],
      credits: [this.curso.credits, [Validators.required]],
      name: [this.curso.name, [Validators.required]],
    });

  }

  initForm() {
    this.emptyForm();
    if (this.curso) {
      this.editForm();
    }
  }

  operate() {
    let rawValuesForm = this.form.getRawValue();

    let curso: Curso = {
      ...rawValuesForm
    }

    if (this.curso) {
      this._cursoService.updateItem(curso ,curso.c_id).subscribe(data => {
      this.toastrMenssage('Actualizado Exitosamente', 'success')
        this.closeModal();
      });
    } else {
      this._cursoService.saveItem(curso).subscribe(data => {
        this.toastrMenssage('Guardado Exitosamente', 'success')
        this.closeModal();
      });
    }
  }

  getCursos() {
    this._cursoService.getItems().subscribe(data => this.cursos = data.data);
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
