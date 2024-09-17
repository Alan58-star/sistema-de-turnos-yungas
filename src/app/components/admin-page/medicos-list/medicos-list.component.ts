import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { Router, RouterLink } from '@angular/router';
import { MedicoService } from '../../../services/medico.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicos-list',
  standalone: true,
  imports: [CommonModule, AdminNavComponent, RouterLink,ReactiveFormsModule],
  templateUrl: './medicos-list.component.html',
  styleUrl: './medicos-list.component.css'
})
export class MedicosListComponent implements OnInit {
  busquedaForm:FormGroup;
  ngOnInit(): void {
    this.getMedicos();
    
  }
  constructor(public _medicoService:MedicoService,
    private fb:FormBuilder,
    private router:Router,
    private toastr: ToastrService
  ){
    this.busquedaForm = this.fb.group({
      busqueda: ['']
      
    })
  }
  actualizarMedico(idMedico:any){
    this.router.navigateByUrl('/admin/medico-form/'+idMedico)
  }
  getMedico(){
    this._medicoService.getMedico('66d7e1d5a93d91e9064ecb3e').subscribe({
      next:(data) => {
        console.log(data);
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
 
  busqueda() {
    const busquedaValue = this.busquedaForm.get('busqueda')?.value;
    if(busquedaValue==""){
      this.getMedicos();
    }
    else{
      this._medicoService.getMedicosTermino(busquedaValue).subscribe({
        next: (data) => {
          this._medicoService.medicos = data;
        },
        error: (e) => {
          this.toastr.error("Sin coincidencias")
        }
      });
    }
    
  }
  
  getMedicos() {
    this._medicoService.getMedicos().subscribe({
      next:(data) => {
        this._medicoService.medicos=data;
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  confirmarEliminarMedico(medicoId: any) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este médico?');
    
    if (confirmacion) {
      this.deleteMedico(medicoId);
    }
  }
  deleteMedico(id:any){
    this._medicoService.deleteMedico(id).subscribe({
      next:(data) => {
        this.toastr.success(data.msg);
        this.getMedicos();
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
}
