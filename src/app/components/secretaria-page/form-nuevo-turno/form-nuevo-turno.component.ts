import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../../admin-page/admin-nav/admin-nav.component";
import { Router, RouterLink } from '@angular/router';
import { EspecialidadService } from '../../../services/especialidad.service';
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../../services/medico.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators  } from '@angular/forms';
import { Turno } from '../../../models/turno';
import { Paciente } from '../../../models/paciente';
import { ObraSocial } from '../../../models/obraSocial';
import { TurnoService } from '../../../services/turno.service';
import { TurnoServ } from '../../../models/turnoServ';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-nuevo-turno',
  standalone: true,
  imports: [AdminNavComponent, RouterLink, CommonModule,ReactiveFormsModule],
  templateUrl: './form-nuevo-turno.component.html',
  styleUrl: './form-nuevo-turno.component.css'
})
export class FormNuevoTurnoComponent implements OnInit{
  turnoForm:FormGroup;
  
  ngOnInit(): void {
    this.getEspecialidades();
    this._especialidadService.especialidades=[];
    this._medicoService.medicos=[];
    
  }
  constructor(
    private fb:FormBuilder,
    public _especialidadService:EspecialidadService, 
    public _medicoService:MedicoService, 
    public _turnoService:TurnoService,
    private toastr: ToastrService,
    private router:Router
  ){

    this.turnoForm = this.fb.group({
      especialidad: ['',Validators.required],
      medico: ['',Validators.required],
      fecha: ['',Validators.required],
      duracion: ['',Validators.required],
      consultorio: ['',Validators.required],
    })
  }
  agregarTurno(){
    const TURNO: TurnoServ ={
      medico_id: this.turnoForm.get('medico')?.value,
      especialidad_id: this.turnoForm.get('especialidad')?.value,
      fecha: this.turnoForm.get('fecha')?.value,
      duracion: this.turnoForm.get('duracion')?.value,
      consultorio:this.turnoForm.get('consultorio')?.value,
      estado:"Disponible"

    }
    if(this.turnoForm.invalid){
      console.log(this.turnoForm);
      this.toastr.error("Todos los campos deben estar completos");
      return;
    }
    this._turnoService.postTurno(TURNO).subscribe({
      next:(data) => {
        
        this.toastr.success(data.msg);
        this.router.navigateByUrl('secretaria');
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
    this._medicoService.getMedico(this.turnoForm.get('medico')?.value).subscribe({
      next:(data) => {
        let medico=data;
        medico.disponibles=medico.disponibles+1;
        console.log(medico);
        this._medicoService.putMedico(data).subscribe({
          next:(data) => {
            console.log(data);
            
          },
          error:(e) => {
            console.log(e);
          },
          
        })
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })

  }
  getEspecialidad(){
    this._especialidadService.getEspecialidad('66d7e1d5a93d91e9064ecb3e').subscribe({
      next:(data) => {
        console.log(data);
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  getEspecialidades() {
    this._especialidadService.getEspecialidades().subscribe({
      next:(data) => {
        this._especialidadService.especialidades=data;
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  getEspMedico(id:any){
    this._medicoService.getEspecialidades(id).subscribe({
      next:(data) => {
        console.log(data);
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }

  cargarMedicos = (event: any) => {
    
    const idEspecialidad = event.target.value;

    console.log(idEspecialidad);
    
    
    this._medicoService.getEspecialidades(idEspecialidad).subscribe({
      next:(data) => {
        this._medicoService.medicos=data;
      },
      error:(e) => {
        this._medicoService.medicos=[];
        console.log(e);
      },
      
    })
  }

  mostrarToast = () => {
    this.toastr.success("(mentira, esto es sólo un toast de ejemplo)", "Turno creado con éxito!");
  }
}
