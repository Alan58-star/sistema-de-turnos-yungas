import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../main-page/nav/nav.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esepcialidades-page',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    RouterLink
],
  templateUrl: './esepcialidades-page.component.html',
  styleUrl: './esepcialidades-page.component.css'
})
export class EsepcialidadesPageComponent {

  /** Datos placeholder de prueba, posteriormente estos se cargarán dinámicamente desde una API o una base de datos */
  especialidades =
    [
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
      {
        titulo: 'Ejemplo',
        accion: 'link'
      },
    ]
}
