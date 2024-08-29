import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavComponent } from "../main-page/nav/nav.component";

@Component({
  selector: 'app-form-turno',
  standalone: true,
  imports: [RouterLink, NavComponent],
  templateUrl: './form-turno.component.html',
  styleUrl: './form-turno.component.css'
})
export class FormTurnoComponent {

}
