import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../admin-page/admin-nav/admin-nav.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TurnoService } from '../../services/turno.service';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PacienteService } from '../../services/paciente.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-secretaria-page',
  standalone: true,
  imports: [AdminNavComponent, CommonModule,ReactiveFormsModule, RouterLink],
  providers:[DatePipe,{ provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './secretaria-page.component.html',
  styleUrl: './secretaria-page.component.css'
})
export class SecretariaPageComponent implements OnInit{ 
  turnoForm:FormGroup
  ngOnInit(): void {
    this.getTurnos();
    
    
  }
  constructor(
    private fb:FormBuilder,
    public _turnoService:TurnoService,
    public _pacienteService:PacienteService,
    private datePipe:DatePipe
    
  ){
    this.turnoForm = this.fb.group({
      fecha:[''] ,
      busqueda:[''],
      tipo: ['']
    });
  }
  busqueda() {
    const busquedaValue = this.turnoForm.get('busqueda')?.value;
    const tipoValue = this.turnoForm.get('tipo')?.value;
  
    console.log(busquedaValue);
    console.log(tipoValue);
  
    if (tipoValue === 'medico') {
      // Si el tipo es 'medico', llamamos al servicio de búsqueda por médico
      this._turnoService.getTurnosPorMedico(busquedaValue).subscribe({
        next: (data) => {
          this._turnoService.turnos = data;
          console.log('Resultados de la búsqueda por médico:', data);
        },
        error: (e) => {
          console.log('Error en la búsqueda por médico:', e);
        }
      });
    } else if (tipoValue === 'paciente') {
      // Si el tipo es 'paciente', llamamos al servicio de búsqueda por paciente
      this._turnoService.getTurnosPorPaciente(busquedaValue).subscribe({
        next: (data) => {
          this._turnoService.turnos = data;
          console.log('Resultados de la búsqueda por paciente:', data);
        },
        error: (e) => {
          console.log('Error en la búsqueda por paciente:', e);
        }
      });
    } else {
      console.log('Tipo de búsqueda no reconocido');
    }
  }
  buscarFecha(){
    console.log(this.turnoForm.get('fecha')?.value)
    const fechaValue = this.turnoForm.get('fecha')?.value;
    
    if (fechaValue) {
      
      const fechaFormateada = this.datePipe.transform(fechaValue, 'yyyy-MM-dd');
      console.log(fechaFormateada); 
      this._turnoService.getTurnosPorFecha(fechaFormateada).subscribe({
        next: (data) => {
          this._turnoService.turnos = data;
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      console.log('No se ha seleccionado ninguna fecha');
    }
  }
  darStrike(paciente_id:any){
    console.log(paciente_id);
    this._pacienteService.getPaciente(paciente_id).subscribe({
      next:(data) => {
        let paciente=data;
        
        paciente.strikes=paciente.strikes+1;
       
        this._pacienteService.putPaciente(paciente).subscribe({
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
  getTurnos() {
    this._turnoService.getTurnosHoy().subscribe({
      next:(data) => {
        this._turnoService.turnos=data;;
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
}