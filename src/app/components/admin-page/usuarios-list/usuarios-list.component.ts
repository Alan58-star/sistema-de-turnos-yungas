import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente';
import { Toast, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, AdminNavComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent implements OnInit{
  busquedaForm:FormGroup;
  ngOnInit(): void {
    if(sessionStorage.getItem("rol")=='admin'){
      this.getUsuarios();
    }
    else{
      this.getSoloPacientes();
    }
    
    
  }
  constructor(public _pacienteService:PacienteService,
    private toastr:ToastrService,private fb:FormBuilder, 
  public _loginService:LoginService){
    
    this.busquedaForm = this.fb.group({
      busqueda: ['']
      
    })
  }
  
  busqueda() {
    
    const busquedaValue = this.busquedaForm.get('busqueda')?.value;
    if(sessionStorage.getItem("rol")=='admin'){
      if(busquedaValue==""){
        this.getUsuarios();
      }
      else{
        this._pacienteService.getPacientesTermino(busquedaValue).subscribe({
          next: (data) => {
            this._pacienteService.pacientes = data;
          },
          error: (e) => {
            this.toastr.error("Sin coincidencias")
          }
        });
      }
    }
    else{
      if(busquedaValue==""){
        this.getSoloPacientes();
      }
      else{
        this._pacienteService.getPacientesTerminoSec(busquedaValue).subscribe({
          next: (data) => {
            this._pacienteService.pacientes = data;
          },
          error: (e) => {
            this.toastr.error("Sin coincidencias")
          }
        });
      }
    }
   
    
  }
  
  confirmarEliminarPaciente(pacienteId: any) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este paciente?');
    
    if (confirmacion) {
      this.deletePaciente(pacienteId);
    }
  }
  desbloquearPaciente(idPaciente:any){
     
      this._pacienteService.getPaciente(idPaciente).subscribe({
        next:(data) => {
          
          let paciente=data;
          paciente.strikes=0;
          this._pacienteService.putPaciente(paciente).subscribe({
            next:(data) => {
              this.toastr.success("Usuario desbloqueado!")
              
              this.getBloqueados();
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
  getPacientes() {
    this._pacienteService.getPacientes().subscribe({
      next:(data) => {
        this._pacienteService.pacientes=data;
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  getSoloPacientes() {
    this._pacienteService.getSoloPacientes().subscribe({
      next:(data) => {
        this._pacienteService.pacientes=data;
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  getBloqueados() {
    this._pacienteService.getPacientesStrikes().subscribe({
      next:(data) => {
        this._pacienteService.pacientes=data;
        if(this._pacienteService.pacientes.length==0){
          this.toastr.info("No hay paciente bloqueados");
          this.getSoloPacientes();
        }
      },
      error:(e) => {
        this.toastr.error("No hay pacientes bloqueados")
      },
      
    })
  }
  getUsuarios() {
    this._pacienteService.getUsuarios().subscribe({
      next:(data) => {
        this._pacienteService.pacientes=data;
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  deletePaciente(id:any){
    this._pacienteService.deletePaciente(id).subscribe({
      next:(data) => {
        this.toastr.success(data.msg);
        this.getPacientes();
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
}
