import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, AdminNavComponent, RouterLink],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent {
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
