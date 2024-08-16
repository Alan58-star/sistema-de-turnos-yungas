import { Component } from '@angular/core';
import { MedicosListComponent } from "./medicos-list/medicos-list.component";
import { AdminNavComponent } from "./admin-nav/admin-nav.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [MedicosListComponent, AdminNavComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
