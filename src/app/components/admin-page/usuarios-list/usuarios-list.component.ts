import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, AdminNavComponent, RouterLink],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent implements OnInit{
  ngOnInit(): void {
    this.getPacientes();
    
  }
  constructor(public _pacienteService:PacienteService){
    
  }
  getPaciente(){
    this._pacienteService.getPaciente('66d7e1d5a93d91e9064ecb3e').subscribe({
      next:(data) => {
        console.log(data);
        
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
  deletePaciente(id:any){
    this._pacienteService.deletePaciente(id).subscribe({
      next:(data) => {
        console.log(data);
        this.getPaciente();
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  usuarios = [
    {
      id: 1,
      nombre: "Nombre",
      datos: "Datos",
      ultimoAcceso: "DD/MM/AA, HH:MM"
    },
    {
      id: 2,
      nombre: "Nombre",
      datos: "Datos",
      ultimoAcceso: "DD/MM/AA, HH:MM"
    },
    {
      id: 3,
      nombre: "Nombre",
      datos: "Datos",
      ultimoAcceso: "DD/MM/AA, HH:MM"
    },
    {
      id: 4,
      nombre: "Nombre",
      datos: "Datos",
      ultimoAcceso: "DD/MM/AA, HH:MM"
    },
    {
      id: 5,
      nombre: "Nombre",
      datos: "Datos",
      ultimoAcceso: "DD/MM/AA, HH:MM"
    },
    {
      id: 6,
      nombre: "Nombre",
      datos: "Datos",
      ultimoAcceso: "DD/MM/AA, HH:MM"
    },    
  ]
}
