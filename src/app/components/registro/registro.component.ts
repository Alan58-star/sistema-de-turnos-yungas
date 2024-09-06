import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import {Paciente} from '../../models/paciente'
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  pacienteForm:FormGroup;
  
  constructor(private fb:FormBuilder, public _pacienteService: PacienteService){
    this.pacienteForm = this.fb.group({
      dni: ['',Validators.required],
      nombre: ['',Validators.required],
      telefono: ['',Validators.required],
      passw: ['',Validators.required],
      
    })
  }
  ngOnInit(): void {
    
  }
  agregarPaciente(){
    const PACIENTE: Paciente ={
      dni: this.pacienteForm.get('dni')?.value,
      nombre: this.pacienteForm.get('nombre')?.value,
      telefono: this.pacienteForm.get('telefono')?.value,
      passw: this.pacienteForm.get('passw')?.value,
    }
    
    this._pacienteService.postPaciente(PACIENTE).subscribe({
      next:(data) => {
        console.log(data);
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })

  }

}
