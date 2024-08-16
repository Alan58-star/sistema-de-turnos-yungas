import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

@Component({
  selector: 'app-medicos-list',
  standalone: true,
  imports: [CommonModule, AdminNavComponent],
  templateUrl: './medicos-list.component.html',
  styleUrl: './medicos-list.component.css'
})
export class MedicosListComponent {
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
