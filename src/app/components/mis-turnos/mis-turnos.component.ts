import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../main-page/nav/nav.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [NavComponent, CommonModule, RouterLink],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css'
})
export class MisTurnosComponent implements OnInit {
  ngOnInit(): void {
    this.cargarTurnos();
  }
  constructor(
    public _pacienteService:PacienteService
  ){}
  cargarTurnos () {
    
    
    
    this._pacienteService.getTurnosPaciente().subscribe({
      next:(data) => {
        this._pacienteService.turnos=data;
      },
      error:(e) => {
        this._pacienteService.turnos=[];
        console.log(e);
      },
      
    })
  }
  turnos = [
    {
      idTurno: 1,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: "Hospital (Presencial)",
      consultorio: 15,
    },
    {
      idTurno: 2,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: "Hospital (Presencial)",
      consultorio: 12,
    },
    {
      idTurno: 3,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: "Hospital (Presencial)",
      consultorio: 12,
    },
    {
      idTurno: 4,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: "Hospital (Presencial)",
      consultorio: 15,
    },
  ]
}
