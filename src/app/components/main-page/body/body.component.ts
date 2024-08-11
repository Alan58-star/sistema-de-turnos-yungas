import { Component } from '@angular/core';
import { OptionCardComponent } from './option-card/option-card.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ OptionCardComponent, ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
