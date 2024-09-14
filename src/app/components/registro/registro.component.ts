import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import {Paciente} from '../../models/paciente'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  pacienteForm:FormGroup;
  
  constructor(private fb:FormBuilder, public _pacienteService: PacienteService,private toastr: ToastrService,private router:Router){
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
      telefono: "54" + this.pacienteForm.get('telefono')?.value,
      passw: this.pacienteForm.get('passw')?.value,
      strikes:0
    }
    
    this._pacienteService.postPaciente(PACIENTE).subscribe({
      next:(data) => {
        if(data.status=='1'){
          this.toastr.success("Cuenta creada con exito")
          this.router.navigateByUrl('/login');
        }
        
        if(data.status=='2'){
          this.toastr.error("El DNI ya esta registrado")
        }
        
        if(data.status=='0'){
          this.toastr.error(data.msg)
        }
        
      },
      error:(e) => {
        this.toastr.success(e);
      },
      
    })

  }

}
