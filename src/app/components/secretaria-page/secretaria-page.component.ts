import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../admin-page/admin-nav/admin-nav.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TurnoService } from '../../services/turno.service';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-secretaria-page',
  standalone: true,
  imports: [AdminNavComponent, CommonModule, RouterLink],
  providers:[DatePipe,{ provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './secretaria-page.component.html',
  styleUrl: './secretaria-page.component.css'
})
export class SecretariaPageComponent implements OnInit{ 
  ngOnInit(): void {
    this.getTurnos();
    
  }
  constructor(public _turnoService:TurnoService){
    
  }
  getTurnos() {
    this._turnoService.getTurnos().subscribe({
      next:(data) => {
        this._turnoService.turnos=data;
        console.log(this._turnoService.turnos);
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
}