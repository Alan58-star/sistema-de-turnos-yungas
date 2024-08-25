import { Component } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [AdminNavComponent, RouterLink],
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.css'
})
export class MedicoFormComponent {

}
