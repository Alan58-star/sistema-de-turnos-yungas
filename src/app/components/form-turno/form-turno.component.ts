import { Component, OnInit } from '@angular/core';
import { RouterLink,Router, ActivatedRoute } from '@angular/router';
import { NavComponent } from "../main-page/nav/nav.component";
import { CommonModule } from '@angular/common';
import { MedicoService } from '../../services/medico.service';

import { ObraSocialService } from '../../services/obra-social.service';
import { TurnoService } from '../../services/turno.service';
import { FormGroup,ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms';
import { TurnoServ } from '../../models/turnoServ';
import { Turno } from '../../models/turno';

@Component({
  selector: 'app-form-turno',
  standalone: true,
  imports: [RouterLink, NavComponent,ReactiveFormsModule, CommonModule],
  templateUrl: './form-turno.component.html',
  styleUrl: './form-turno.component.css'
})
export class FormTurnoComponent implements OnInit{
  turnoForm:FormGroup;
  turno:TurnoServ;
  disponible:number;
  ngOnInit(): void {
    this._medicoService.medicos=[];
    this.cargarObras();
    this._medicoService.turnos=[];
    
    this.activatedRoute.params.subscribe(
      params=>{
        this.cargarMedicos(params['id']);
      }
    )
  }
  constructor(private fb:FormBuilder,public _obraService:ObraSocialService,public _turnoService:TurnoService, public _medicoService:MedicoService, private route:Router, private activatedRoute:ActivatedRoute){
    this.turnoForm = this.fb.group({
      obra: ['',Validators.required],
      turno: ['',Validators.required],
          
    })
    this.turno=new TurnoServ("0","0","0","0","0",0);
    this.disponible=0;
  }
  agregarTurno(turno:TurnoServ){
    console.log(this.turno);
    this.turno.obras_sociales=[this.turnoForm.get('obra')?.value];
    this.turno.paciente_id= sessionStorage.getItem('id');
    this.turno.estado="Ocupado"
    this._turnoService.putTurno(this.turno).subscribe({
      next:(data) => {
        console.log(data);
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })
  }
  finalizarTurno(){
  
    this._turnoService.getTurno(this.turnoForm.get('turno')?.value).subscribe({
      next:(data) => {
        
        this.turno=data;
        console.log(this.turno);
        this.agregarTurno(this.turno);
      },
      error:(e) => {
        console.log(e);
      },
      
    })
   
  }
  cargarObras(){
    
    this._obraService.getObras().subscribe({
      next:(data) => {
        this._obraService.obras=data;
      },
      error:(e) => {
        this._obraService.obras=[];
        console.log(e);
      },
      
    })
  }
  cargarMedicos(id:any) {
    
    this._medicoService.getEspecialidades(id).subscribe({
      next:(data) => {
        this._medicoService.medicos=data;
        this.disponible=this._medicoService.medicos.length;
        
      },
      error:(e) => {
        this._medicoService.medicos=[];
        console.log(e);
      },
      
    })
    
  }
  cargarTurnos = (id: any) => {
    
    const idMedico = id;
    let idEspecialidad="";
    this.activatedRoute.params.subscribe(
      params=>{
        idEspecialidad=params['id'];
      }
    )
    
    this._medicoService.getTurnosMedicoEsp(idMedico,idEspecialidad).subscribe({
      next:(data) => {
        this._medicoService.turnos=data;
      },
      error:(e) => {
        this._medicoService.turnos=[];
        console.log(e);
      },
      
    })
  }
  medicos = [
    {
      id: 1,
      genero: "DR.",
      nombre: "Gastón Lozano",
      turnos: 14
    },
    {
      id: 2,
      genero: "DRA.",
      nombre: "Alicia Gutiérrez",
      turnos: 7
    },
    {
      id: 3,
      genero: "DR.",
      nombre: "Ernesto Alvarado",
      turnos: 1
    },
    {
      id: 4,
      genero: "DR.",
      nombre: "Johnson Martínez",
      turnos: 99
    },
  ];

  turnos = [
    {
      idTurno: 1,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: "Hospital (Presencial)",
      consultorio: 15,
    },
    {
      idTurno: 2,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: "Hospital (Presencial)",
      consultorio: 12,
    },
    {
      idTurno: 3,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: "Hospital (Presencial)",
      consultorio: 12,
    },
    {
      idTurno: 4,
      fecha: 'DD/MM/AAAA',
      hora: 'HH:MM',
      duracion: 30,
      lugar: "Hospital (Presencial)",
      consultorio: 15,
    },
  ]
}
