import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../admin-page/admin-nav/admin-nav.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TurnoService } from '../../services/turno.service';
@Component({
  selector: 'app-secretaria-page',
  standalone: true,
  imports: [AdminNavComponent, CommonModule, RouterLink],
  templateUrl: './secretaria-page.component.html',
  styleUrl: './secretaria-page.component.css'
})
export class SecretariaPageComponent implements OnInit{ 
  ngOnInit(): void {
    this.getTurnos();
    
  }
  constructor(public _turnoService:TurnoService){
    
  }
  getTurnos() {
    this._turnoService.getTurnos().subscribe({
      next:(data) => {
        this._turnoService.turnos=data;
        console.log(this._turnoService.turnos);
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  turnos = [
    {
      id: 1,
      horario: "16:00",
      paciente: "Nombre Paciente",
      motivo: "Gastroenterología",
      doctor: "Nombre Doctor",
      consultorio: 15,
    },
    {
      id: 2,
      horario: "16:00",
      paciente: "Nombre Paciente",
      motivo: "Gastroenterología",
      doctor: "Nombre Doctor",
      consultorio: 15,
    },
    {
      id: 3,
      horario: "16:00",
      paciente: "Nombre Paciente",
      motivo: "Gastroenterología",
      doctor: "Nombre Doctor",
      consultorio: 15,
    },
    {
      id: 4,
      horario: "16:00",
      paciente: "Nombre Paciente",
      motivo: "Gastroenterología",
      doctor: "Nombre Doctor",
      consultorio: 15,
    },
    {
      id: 5,
      horario: "16:00",
      paciente: "Nombre Paciente",
      motivo: "Gastroenterología",
      doctor: "Nombre Doctor",
      consultorio: 15,
    },
    {
      id: 6,
      horario: "16:00",
      paciente: "Nombre Paciente",
      motivo: "Gastroenterología",
      doctor: "Nombre Doctor",
      consultorio: 15,
    },    
  ]
}