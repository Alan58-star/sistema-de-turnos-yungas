import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminNavComponent } from "../../admin-page/admin-nav/admin-nav.component";
import { Router, RouterLink } from '@angular/router';
import { EspecialidadService } from '../../../services/especialidad.service';
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../../services/medico.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { Turno } from '../../../models/turno';
import { Paciente } from '../../../models/paciente';
import { ObraSocial } from '../../../models/obraSocial';
import { TurnoService } from '../../../services/turno.service';
import { TurnoServ } from '../../../models/turnoServ';
import { Toast, ToastrService } from 'ngx-toastr';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-form-nuevo-turno',
  standalone: true,
  imports: [AdminNavComponent, RouterLink, CommonModule, ReactiveFormsModule],
  
  templateUrl: './form-nuevo-turno.component.html',
  styleUrl: './form-nuevo-turno.component.css'
})
export class FormNuevoTurnoComponent implements OnInit , OnDestroy {
  turnoForm: FormGroup;
  fechaMin: string='';
  subscription?: Subscription;
  ngOnInit(): void {
    this.getEspecialidades();
    this._especialidadService.especialidades = [];
    this._medicoService.medicos = [];
    this.updateFechaMin();
    // Actualizar la fecha mínima cada minuto (opcional)
    this.subscription = interval(60000).subscribe(() => this.updateFechaMin());
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  updateFechaMin(): void {
    const now = new Date();
    this.fechaMin = now.toISOString().slice(0, 16);
  }
  constructor(
    private fb: FormBuilder,
    public _especialidadService: EspecialidadService,
    public _medicoService: MedicoService,
    public _turnoService: TurnoService,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.turnoForm = this.fb.group({
      especialidad: ['', Validators.required],
      medico: ['', Validators.required],
      fecha: ['', Validators.required],
      duracion: ['', Validators.required],
      consultorio: ['', Validators.required],
    })
  }
  agregarTurno() {
    if (this.turnoForm.invalid) {
      this.toastr.error("Todos los campos deben estar completos");
      return;
    }
    const fechaRaw = this.turnoForm.get('fecha')?.value;
    const fechaISO = new Date(fechaRaw).toISOString();
    const TURNO: TurnoServ = {
      medico_id: this.turnoForm.get('medico')?.value,
      especialidad_id: this.turnoForm.get('especialidad')?.value,
      fecha: new Date(fechaISO),
      duracion: this.turnoForm.get('duracion')?.value,
      consultorio: this.turnoForm.get('consultorio')?.value,
      estado: "Disponible"

    }
    console.log(TURNO.fecha)
    this._turnoService.postTurno(TURNO).subscribe({
      next: (data) => {

        this.toastr.success(data.msg);

        this._medicoService.getMedico(this.turnoForm.get('medico')?.value).subscribe({
          next: (data) => {
            let medico = data;
            medico.disponibles = medico.disponibles + 1;
            console.log(medico);
            this._medicoService.putMedico(data).subscribe({
              next: (data) => {
                console.log(data);

              },
              error: (e) => {
                console.log(e);
              },

            })

          },
          error: (e) => {
            console.log(e);
          },

        })
        this.router.navigateByUrl('secretaria');

      },
      error: (e) => {
        console.log(e);
      },

    })

  }
 
  getEspecialidades() {
    this._especialidadService.getEspecialidades().subscribe({
      next: (data) => {
        this._especialidadService.especialidades = data;

      },
      error: (e) => {
        console.log(e);
      },

    })
  }
  getEspMedico(id: any) {
    this._medicoService.getEspecialidades(id).subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (e) => {
        console.log(e);
      },

    })
  }

  cargarMedicos = (event: any) => {

    this._medicoService.medicos = [];
    const idEspecialidad = event.target.value;

    


    this._medicoService.getEspecialidades(idEspecialidad).subscribe({
      next: (data) => {
        this._medicoService.medicos = data;
      },
      error: (e) => {
        this._medicoService.medicos = [];
        console.log(e);
      },

    })
  }

}
