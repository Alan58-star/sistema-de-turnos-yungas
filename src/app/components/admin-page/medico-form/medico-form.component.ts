import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { Router, RouterLink } from '@angular/router';
import { Medico } from '../../../models/medico';
import { MedicoService } from '../../../services/medico.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { Especialidad } from '../../../models/especialidad';
import { EspecialidadService } from '../../../services/especialidad.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [AdminNavComponent, RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.css'
})
export class MedicoFormComponent implements OnInit {
  medicoForm:FormGroup;
  
  constructor(private fb:FormBuilder, public _medicoService: MedicoService, public _especialidadService:EspecialidadService,private toastr: ToastrService,private router:Router){
    this.medicoForm = this.fb.group({
      legajo: ['',Validators.required],
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      especialidad:['',Validators.required]
      
    })
    
    
    
    
  }
  ngOnInit(): void {
    this._especialidadService.especialidades=[];
    this.getEspecialidades();
    

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
  agregarMedico(){
    const MEDICO: Medico ={
      legajo: this.medicoForm.get('legajo')?.value,
      nombre: this.medicoForm.get('nombre')?.value,
      apellido: this.medicoForm.get('apellido')?.value,
      especialidades: [this.medicoForm.get('especialidad')?.value],
      disponibles:0
    }
    if (this.medicoForm.invalid) {
      this.toastr.error("Todos los campos deben estar completos");
      return;
    }
    this._medicoService.postMedico(MEDICO).subscribe({
      next:(data) => {
        if(data.status=='1'){
          this.toastr.success(data.msg);
          this.router.navigateByUrl('/admin')
        }
        else{
          this.toastr.error(data.msg);
          
        }
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })

  }
}
