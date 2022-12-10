import { startWith, map, debounceTime } from 'rxjs/operators';
import { FormEstudianteComponent } from './form-estudiante/form-estudiante.component';
import { Observable } from 'rxjs';
import { Estudiante } from '../../_model/estudiante.interface';
import { EstudianteService } from '../../_service/estudiante.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormCursosEstudiantesComponent } from './form-estudiante-curso/form-estudiante-curso.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  id!: string | null;

  estudiantes!: Estudiante[];
  estudiante!: Estudiante;
  form!: FormGroup;
  estudiantes$!: Observable<Estudiante[]>;
  filter: FormControl = new FormControl("");

  constructor(
    private _estudianteService: EstudianteService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getEstudiantes()
  }
  
  initForm() {
    this.form = this._formBuilder.group({
      c_id: [null],
      name: [null, [Validators.required]],
      credits: [1 , [Validators.maxLength(6)]]
    })
  }

  openModal(estudiante?: Estudiante) {
    let modal = this._modalService.open(FormEstudianteComponent)
    modal.componentInstance.estudiante = estudiante
    modal.result.then(
      () => {
        this.getEstudiantes()
      }
    )
  }

  openModalCursos(estudiante?: Estudiante) {
    let modal = this._modalService.open(FormCursosEstudiantesComponent ,  { size: 'lg' })
    modal.componentInstance.estudiante = estudiante
  }


  eliminar(id: number) {
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
          this._estudianteService.deleteItem((id)).subscribe(data => {
            this.toastrMenssage("Estudiante eliminado con exito" , "success")
              this.getEstudiantes()
          })
        }
    })
  }

  getEstudiantes() {
    this.spinner.show();
    this._estudianteService.getItems().subscribe(data => {
      this.estudiantes = data.data
      this.toastrMenssage("Estudiantes obtenidos con exito" , "success")
      this.spinner.hide();
      this.tableFilter();
    });
  }

  tableFilter() {
    this.estudiantes$ = this.filter.valueChanges.pipe(
      startWith(''),
      //debounceTime(300),
      map(text => this.search(text))
    )
  }

  search(text: string): Estudiante[] {
    return this.estudiantes.filter(val => {
      const term = text.toLowerCase();
      return val.email?.toLowerCase().includes(term) ||
      val.first_name.toLowerCase().includes(term) ||
      val.geolocation?.includes(term) ||
      val.group?.toLowerCase().includes(term) ||
      val.last_name?.includes(term) ||
      val.lv_id?.toString().includes(term) ||
      val.phone_number?.includes(term) 
    });
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
