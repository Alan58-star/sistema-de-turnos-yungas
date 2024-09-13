import { Component } from '@angular/core';
import { OptionCardComponent } from '../../ui/option-card/option-card.component';
import { NavComponent } from '../nav/nav.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ OptionCardComponent, NavComponent ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  constructor(public _loginService:LoginService){

  }

}
