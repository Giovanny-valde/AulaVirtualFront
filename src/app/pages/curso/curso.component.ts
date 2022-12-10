import { startWith, map, debounceTime } from 'rxjs/operators';
import { FormCursoComponent } from './form-curso/form-curso.component';
import { Observable } from 'rxjs';
import { Curso } from '../../_model/cursos.interface';
import { CursoService } from '../../_service/curso.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  id!: string | null;

  cursos!: Curso[];
  curso!: Curso;
  form!: FormGroup;
  cursos$!: Observable<Curso[]>;
  filter: FormControl = new FormControl("");

  constructor(
    private _cursoService: CursoService,
    private _formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private spinner : NgxSpinnerService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.getCursos()
  }
  
  initForm() {
    this.form = this._formBuilder.group({
      c_id: [null],
      name: [null, [Validators.required]],
      credits: [1 , [Validators.maxLength(6)]]
    })
  }

  openModal(curso?: Curso) {
    let modal = this._modalService.open(FormCursoComponent)
    modal.componentInstance.curso = curso

    modal.result.then(
      () => {
        this.getCursos()
      }
    )
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
          this._cursoService.deleteItem((id)).subscribe(data => {
              this.toastrMenssage('Eliminado Exitosamente', 'success')
              this.getCursos()
          })
        }
    })
  }

  getCursos() {
    this.spinner.show();
    this._cursoService.getItems().subscribe(data => {
      this.cursos = data.data
      this.toastrMenssage('Cursos obtenidos Exitosamente', 'success')
      this.spinner.hide();
      this.tableFilter();
    });
  }

  tableFilter() {
    this.cursos$ = this.filter.valueChanges.pipe(
      startWith(''),
      //debounceTime(300),
      map(text => this.search(text))
    )
  }

  search(text: string): Curso[] {
    return this.cursos.filter(val => {
      const term = text.toLowerCase();
      // return
      return val.credits.toString().includes(term) ||
      val.name.toLowerCase().includes(term) 
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
