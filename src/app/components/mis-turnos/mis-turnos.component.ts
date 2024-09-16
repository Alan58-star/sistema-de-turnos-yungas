import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../main-page/nav/nav.component";
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { TurnoService } from '../../services/turno.service';
import { TurnoServ } from '../../models/turnoServ';
import { ToastrService } from 'ngx-toastr';
import { MedicoService } from '../../services/medico.service';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';
import { WhatsappService } from '../../services/whatsapp.service';
registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [NavComponent, CommonModule, RouterLink],
  providers:[DatePipe,{ provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css'
})
export class MisTurnosComponent implements OnInit {
  turnoCancelado:TurnoServ;
  vacio:boolean=false;
  ngOnInit(): void {
    this.cargarTurnos();
  }
  constructor(
    public _pacienteService:PacienteService,
    public _turnoService:TurnoService,
    private toastr: ToastrService,
    public _medicoService:MedicoService,
    public _whatsappService:WhatsappService
  ){
    this.turnoCancelado=new TurnoServ("0",new Date(),"0","0","0",0);
  }
  canCancelTurno(turnoFecha: Date): boolean {
    const turnoDate = new Date(turnoFecha);
    const now = new Date();

    // Resta los tiempos para obtener la diferencia en milisegundos
    const diffInMinutes = (turnoDate.getTime() - now.getTime()) / 1000 / 60;
    console.log(diffInMinutes);
    // Si faltan 30 minutos o menos, devolver false
    return diffInMinutes > 30;
  }
  cargarTurnos () {
    this._pacienteService.getTurnosPaciente().subscribe({
      next:(data) => {
        this._pacienteService.turnos=data;
        console.log(this._pacienteService.turnos);
        
      },
      error:(e) => {
        this._pacienteService.turnos=[];
        this.vacio=true;
        console.log(e);
      },
      
    })
  }
  cancelarTurno(idTurno:any){
    this._turnoService.getTurno(idTurno).subscribe({
      next:(data) => {
        this.turnoCancelado.medico_id=data.medico_id;
        this.turnoCancelado.fecha=data.fecha;
        this.turnoCancelado.consultorio=data.consultorio;
        this.turnoCancelado.duracion=data.duracion;
        this.turnoCancelado.especialidad_id=data.especialidad_id;
        this.turnoCancelado._id=data._id;
        this.turnoCancelado.paciente_id=null;
        this.turnoCancelado.obras_sociales=[];
        this.dejarLibreTurno();
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  
  dejarLibreTurno(){
    this.turnoCancelado.estado="Disponible"
    this._turnoService.putTurno(this.turnoCancelado).subscribe({
      next:(actua) => {
        if(actua.status=='2'){
          this.toastr.success("Turno cancelado!");
          this._whatsappService.sendTurnMessage(sessionStorage.getItem('telefono')!,sessionStorage.getItem('nombre')!,Date.now().toString(),"Turno cancelado","Consultorio 2","Cirugia").subscribe({
            next:(data) => {
              console.log(data);
              
            },
            error:(e) => {
              console.log(e);
            },
            
          })
          this.cargarTurnos();
        }
        else{
          this.toastr.error("Error");
          console.log(actua)
        }
        
        
      },
      error:(e) => {
        this.toastr.error("Ocurrio un error");
        console.log(e);
      },
      
    })
    
    this._medicoService.getMedico(this.turnoCancelado.medico_id).subscribe({
      next:(data) => {
        let medico=data;
        medico.disponibles=medico.disponibles+1;
        console.log(medico);
        this._medicoService.putMedico(data).subscribe({
          next:(data) => {
            console.log(data);
            
          },
          error:(e) => {
            console.log(e);
          },
          
        })
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })



  }
}
