import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isNavMenuHidden: boolean = true;
  constructor(public _loginService:LoginService){

  }
  toggleMenu = () => {
    this.isNavMenuHidden = ! this.isNavMenuHidden;
  }
  public logout() {
    this._loginService.logout();
  }
}
