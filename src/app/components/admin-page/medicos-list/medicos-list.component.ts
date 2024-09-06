import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { RouterLink } from '@angular/router';
import { MedicoService } from '../../../services/medico.service';

@Component({
  selector: 'app-medicos-list',
  standalone: true,
  imports: [CommonModule, AdminNavComponent, RouterLink],
  templateUrl: './medicos-list.component.html',
  styleUrl: './medicos-list.component.css'
})
export class MedicosListComponent implements OnInit {
  ngOnInit(): void {
    this.getMedicos();
    this.getMedico();
  }
  constructor(public _medicoService:MedicoService){
    
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
  deleteMedico(id:any){
    this._medicoService.deleteMedico(id).subscribe({
      next:(data) => {
        console.log(data);
        this.getMedicos();
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
medicos = [
    {
      id: 1,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345"
    },
    {
      id: 2,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345"
    },
    {
      id: 3,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345"
    },
    {
      id: 4,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345"
    },
    {
      id: 5,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345"
    },
    {
      id: 6,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345"
    },    
  ]
}
