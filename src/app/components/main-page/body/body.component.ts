import { Component } from '@angular/core';
import { OptionCardComponent } from '../../ui/option-card/option-card.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ OptionCardComponent, NavComponent ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
