import { Component } from '@angular/core';
import { NavComponent } from "../main-page/nav/nav.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css'
})
export class MisTurnosComponent {
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
