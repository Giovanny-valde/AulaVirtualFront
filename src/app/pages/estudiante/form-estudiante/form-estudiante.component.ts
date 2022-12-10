import { Estudiante } from 'src/app/_model/estudiante.interface';
import { EstudianteService } from '../../../_service/estudiante.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-estudiante',
  templateUrl: './form-estudiante.component.html',
  styleUrls: ['./form-estudiante.component.css']
})
export class FormEstudianteComponent implements OnInit {

  idRuta!: string | null;
  localStorage = localStorage
  form!: FormGroup;
  estudiantes!: Estudiante[];
  estudiante!: Estudiante;

  constructor(
    private _estudianteService: EstudianteService,
    private _formBuilder: FormBuilder,
    public _activeModal: NgbActiveModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getEstudiantes();
    this.initForm();
  }

  emptyForm() {
    this.form = this._formBuilder.group({
      email: [null, [Validators.maxLength(100)]],
      first_name: [null, [Validators.required, Validators.maxLength(50)]],
      geolocation: [null, [Validators.maxLength(200)]],
      group: [null, [Validators.maxLength(5)]],
      last_name: [null, [Validators.maxLength(50)]],
      lv_id: [null, [Validators.maxLength(6)]],
      phone_number: [null, [Validators.maxLength(50)]],
      status: [true],
    });
  }

  editForm() {
    this.form = this._formBuilder.group({
      email: [this.estudiante.email],
      first_name: [this.estudiante.first_name],
      geolocation: [this.estudiante.geolocation],
      group: [this.estudiante.group],
      last_name: [this.estudiante.last_name],
      lv_id: [this.estudiante.lv_id],
      phone_number: [this.estudiante.phone_number],
      status: [this.estudiante.status]
    });

  }

  initForm() {
    this.emptyForm();
    if (this.estudiante) {
      this.editForm();
    }
  }

  operate() {
    let rawValuesForm = this.form.getRawValue();

    let estudiante: Estudiante = {
      ...rawValuesForm
    }

    if (this.estudiante) {
      this._estudianteService.updateItem(estudiante ,this.estudiante.s_id).subscribe(data => {
        this.closeModal();
        this.toastrMenssage('Actualizado Exitosamente', 'success');
      });
    } else {
      this._estudianteService.saveItem(estudiante).subscribe(data => {
        this.closeModal();
        this.toastrMenssage('Guardado Exitosamente', 'success');

      });
    }
  }

  getEstudiantes() {
    this._estudianteService.getItems().subscribe(data => this.estudiantes = data.data);
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
