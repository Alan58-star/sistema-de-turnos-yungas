import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { RouterLink } from '@angular/router';
import { WhatsappService } from '../../../services/whatsapp.service';

@Component({
  selector: 'app-medicos-list',
  standalone: true,
  imports: [CommonModule, AdminNavComponent, RouterLink],
  templateUrl: './medicos-list.component.html',
  styleUrl: './medicos-list.component.css'
})
export class MedicosListComponent {

  medicos = [
    {
      id: 1,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345",
      telefono: '543884480836'
    },
    {
      id: 2,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345",
      telefono: '543884635285'
    },
    {
      id: 3,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345",
      telefono: ''
    },
    {
      id: 4,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345",
      telefono: ''
    },
    {
      id: 5,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345",
      telefono: ''
    },
    {
      id: 6,
      apellido: "Apellido",
      nombres: "Nombre completo",
      legajo: "12345",
      telefono: ''
    },    
  ]
  
  // private wppService = inject(WhatsappService);
  constructor(private wppService: WhatsappService){}

  public sendMesagge(phone:string){
    this.wppService.sendMessage(phone).subscribe((result) => {
        console.log(result);
      
    })
  }
}
