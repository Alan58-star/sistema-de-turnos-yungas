import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavComponent } from "../main-page/nav/nav.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-turno',
  standalone: true,
  imports: [RouterLink, NavComponent, CommonModule],
  templateUrl: './form-turno.component.html',
  styleUrl: './form-turno.component.css'
})
export class FormTurnoComponent {
  medicos = [
    {
      id: 1,
      genero: "DR.",
      nombre: "Gastón Lozano",
      turnos: 14
    },
    {
      id: 2,
      genero: "DRA.",
      nombre: "Alicia Gutiérrez",
      turnos: 7
    },
    {
      id: 3,
      genero: "DR.",
      nombre: "Ernesto Alvarado",
      turnos: 1
    },
    {
      id: 4,
      genero: "DR.",
      nombre: "Johnson Martínez",
      turnos: 99
    },
  ];

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
