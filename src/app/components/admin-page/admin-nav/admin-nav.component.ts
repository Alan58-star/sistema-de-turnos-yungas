import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css'
})
export class AdminNavComponent {
  constructor(public _loginService:LoginService, private router:Router){
    
  }
  public logout() {
    this._loginService.logout();
    this.router.navigateByUrl('/');
  }
}
