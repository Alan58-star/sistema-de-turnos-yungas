import { Component } from '@angular/core';
import { AdminNavComponent } from "../admin-page/admin-nav/admin-nav.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secretaria-page',
  standalone: true,
  imports: [AdminNavComponent, CommonModule],
  templateUrl: './secretaria-page.component.html',
  styleUrl: './secretaria-page.component.css'
})
export class SecretariaPageComponent{ 
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