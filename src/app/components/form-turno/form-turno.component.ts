import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NavComponent } from '../main-page/nav/nav.component';
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../services/medico.service';

import { ObraSocialService } from '../../services/obra-social.service';
import { TurnoService } from '../../services/turno.service';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TurnoServ } from '../../models/turnoServ';
import { Turno } from '../../models/turno';
import { ToastrService } from 'ngx-toastr';
import { WhatsappService } from '../../services/whatsapp.service';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-form-turno',
  standalone: true,
  imports: [RouterLink, NavComponent, ReactiveFormsModule, CommonModule],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es' }],
  templateUrl: './form-turno.component.html',
  styleUrl: './form-turno.component.css',
})
export class FormTurnoComponent implements OnInit {
  turnoForm: FormGroup;
  turno: TurnoServ;
  obra1: boolean = false;
  obra2: boolean = false;
  medico_id: any;

  fechaTurno:String = "";
  doctor = ""
  consultorio = ""
  especialidad = ""

  ngOnInit(): void {
    this._medicoService.medicos = [];
    this.cargarObras();
    this._medicoService.turnos = [];
    this._obraService.obras = [];

    this.activatedRoute.params.subscribe((params) => {
      this.cargarMedicos(params['id']);
    });
  }
  constructor(
    private fb: FormBuilder,
    public _obraService: ObraSocialService,
    private toastr: ToastrService,
    public _turnoService: TurnoService,
    public _medicoService: MedicoService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public _whatsappService: WhatsappService
  ) {
    this.turnoForm = this.fb.group({
      obra1: [''],
      obra2: [''],
      obra3: [''],
      turno: ['', Validators.required],
    });
    this.turno = new TurnoServ('0', new Date(), '0', '0', '0', 0);
  }

  agregarTurno() {
    if (this.obra1 && this.obra2) {
      this.turno.obras_sociales = [
        this.turnoForm.get('obra1')?.value,
        this.turnoForm.get('obra2')?.value,
        this.turnoForm.get('obra3')?.value,
      ];
    } else if (this.obra1) {
      this.turno.obras_sociales = [
        this.turnoForm.get('obra1')?.value,
        this.turnoForm.get('obra2')?.value,
      ];
    } else {
      this.turno.obras_sociales = [this.turnoForm.get('obra1')?.value];
    }
    this.turno.paciente_id = sessionStorage.getItem('id');
    this.turno.estado = 'Ocupado';
    this._turnoService.putTurno(this.turno).subscribe({
      next: (actua) => {
        if (actua.status == '2') {
          this.toastr.success('Turno agendado!');
          this._whatsappService
            .sendTurnMessage(
              sessionStorage.getItem('telefono')!,
              sessionStorage.getItem('nombre')!,
              this.fechaTurno.toString(),
              this.doctor,
              this.consultorio,
              this.especialidad
            )
            .subscribe({
              next: (data) => {
                console.log(data);
              },
              error: (e) => {
                console.log(e);
              },
            });

          this.route.navigateByUrl('/');
        } else {
          this.toastr.error(actua.msg);
          this.route.navigateByUrl('/');
        }
      },
      error: (e) => {
        this.toastr.success('Ocurrio un error');
        console.log(e);
      },
    });

    this._medicoService.getMedico(this.medico_id).subscribe({
      next: (data) => {
        let medico = data;
        medico.disponibles = medico.disponibles - 1;
        console.log(medico);
        this._medicoService.putMedico(data).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (e) => {
            console.log(e);
          },
        });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  finalizarTurno() {
    this._turnoService.getTurno(this.turnoForm.get('turno')?.value).subscribe({
      next: (data) => {
        this.turno = data;

        this.agregarTurno();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  cargarObras() {
    this._obraService.getObras().subscribe({
      next: (data) => {
        this._obraService.obras = data;
      },
      error: (e) => {
        this._obraService.obras = [];
        console.log(e);
      },
    });
  }

  cargarMedicos(id: any) {
    this._medicoService.getEspecialidades(id).subscribe({
      next: (data) => {
        this._medicoService.medicos = data;
        console.log(this._medicoService.medicos);
        
      },
      error: (e) => {
        this._medicoService.medicos = [];
        console.log(e);
      },
    });
  }

  cargarTurnos = (id: any) => {
    this.medico_id = id;
    let idEspecialidad = '';
    this.activatedRoute.params.subscribe((params) => {
      idEspecialidad = params['id'];
    });

    this._medicoService
      .getTurnosMedicoEsp(this.medico_id, idEspecialidad)
      .subscribe({
        next: (data) => {
          this._medicoService.turnos = data;
          console.log(this._medicoService.turnos);
        },
        error: (e) => {
          this._medicoService.turnos = [];
          console.log(e);
        },
      });
  };

  agregarObra() {
    if (this.obra1) {
      this.obra2 = true;
    } else {
      this.obra1 = true;
    }
  }

  sacarObra() {
    if (this.obra2) {
      this.obra2 = false;
    } else {
      this.obra1 = false;
    }
  }

  formatearFecha(fechaISO: string) {
    // Convertir la cadena ISO a un objeto Date
    const fecha = new Date(fechaISO);
  
    // Definir las opciones para el formato de la fecha y la hora
    const opcionesFecha: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  
    // Formatear la fecha y la hora
    const formatoFecha = new Intl.DateTimeFormat('es-ES', opcionesFecha).format(fecha);
    const formatoHora = new Intl.DateTimeFormat('es-ES', opcionesHora).format(fecha);
  
    this.fechaTurno = `${formatoFecha}, ${formatoHora}`.toString();
  }
  
  getConsultorio(consultorio:string){
    this.consultorio = consultorio;
  }

  getDoctor(apellido:string, nombre: string){
    this.doctor = `${apellido} ${nombre}`
  }

  getEspecialidad(esp:string){
    this.especialidad = esp
  }
  
  
  
  

  medicos = [
    {
      id: 1,
      genero: 'DR.',
      nombre: 'Gastón Lozano',
      turnos: 14,
    },
    {
      id: 2,
      genero: 'DRA.',
      nombre: 'Alicia Gutiérrez',
      turnos: 7,
    },
    {
      id: 3,
      genero: 'DR.',
      nombre: 'Ernesto Alvarado',
      turnos: 1,
    },
    {
      id: 4,
      genero: 'DR.',
      nombre: 'Johnson Martínez',
      turnos: 99,
    },
  ];

  turnos = [
    {
      idTurno: 1,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: 'Hospital (Presencial)',
      consultorio: 15,
    },
    {
      idTurno: 2,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: 'Hospital (Presencial)',
      consultorio: 12,
    },
    {
      idTurno: 3,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: 'Hospital (Presencial)',
      consultorio: 12,
    },
    {
      idTurno: 4,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: 'Hospital (Presencial)',
      consultorio: 15,
    },
  ];
}
