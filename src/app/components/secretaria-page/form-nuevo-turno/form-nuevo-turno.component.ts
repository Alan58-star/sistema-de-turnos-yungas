import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../../admin-page/admin-nav/admin-nav.component";
import { RouterLink } from '@angular/router';
import { EspecialidadService } from '../../../services/especialidad.service';
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../../services/medico.service'; 
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-form-nuevo-turno',
  standalone: true,
  imports: [
            AdminNavComponent, 
            RouterLink, 
            CommonModule,
          ],
  templateUrl: './form-nuevo-turno.component.html',
  styleUrl: './form-nuevo-turno.component.css'
})
export class FormNuevoTurnoComponent implements OnInit{

  ngOnInit(): void {
    this.getEspecialidades();
    //this.getEspecialidad();
  }

  constructor(public _especialidadService:EspecialidadService, public _medicoService:MedicoService, private toastr: ToastrService){
    
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
    alert("Id especialidad: " + idEspecialidad);
    this.getEspMedico(idEspecialidad);
  }

  mostrarToast = () => {
    this.toastr.success("(mentira, esto es sólo un toast de ejemplo)", "Turno creado con éxito!");
  }
}
