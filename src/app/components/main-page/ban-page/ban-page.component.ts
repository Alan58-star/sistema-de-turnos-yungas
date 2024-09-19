import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ban-page',
  standalone: true,
  imports: [NavComponent, RouterLink],
  templateUrl: './ban-page.component.html',
  styleUrl: './ban-page.component.css'
})
export class BanPageComponent {

}
