import { Component } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [AdminNavComponent],
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.css'
})
export class MedicoFormComponent {

}
