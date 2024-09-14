import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import {Paciente} from '../../models/paciente'
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{
  //Variables condicionales.
  pacienteForm:FormGroup;
  passwordMismatch: boolean = false;
  dniInvalid: boolean = false;
  passwd: boolean = false;

  //Inicio
  constructor(private fb:FormBuilder, public _pacienteService: PacienteService,private toastr: ToastrService,private router:Router){
    this.pacienteForm = this.fb.group({
      dni: ['',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('^[0-9]+$')
        ],
       
      ],
      nombre: ['',Validators.required],
      telefono: ['',Validators.required],
      passw1: ['',Validators.required],
      passw2: ['',Validators.required],
      
    });

    // Monitorear cambios en tiempo real
    this.pacienteForm.get('passw2')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });

    this.pacienteForm.get('passw1')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
    this.pacienteForm.get('dni')?.valueChanges.subscribe(() => {  
      this.checkDni();
    });
  }
  ngOnInit(): void {
    
  }
  checkPasswords(): void {
    const passw1 = this.pacienteForm.get('passw1')?.value;
    const passw2 = this.pacienteForm.get('passw2')?.value;

    this.passwordMismatch = passw1 !== passw2;  // Actualiza passwordMismatch
  }
  checkDni(): void {
    const dniControl = this.pacienteForm.get('dni')?.value;
    this.dniInvalid = dniControl?.invalid && dniControl?.touched;
  }
  showHidePwd(){
    this.passwd = !this.passwd;
    
  }
  agregarPaciente(){
    if (this.passwordMismatch) {
      this.toastr.error("Las contraseñas no coinciden");
      return;
    }
    if (this.pacienteForm.invalid) {
      this.toastr.error("Todos los campos deben estar completos");
      return;
    }
    const PACIENTE: Paciente ={
      dni: Number(this.pacienteForm.get('dni')?.value),
      nombre: this.pacienteForm.get('nombre')?.value,
      telefono: this.pacienteForm.get('telefono')?.value,
      passw: this.pacienteForm.get('passw1')?.value,
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
        if(data.status=='3'){
          this.toastr.error("El telefono ya esta registrado")
        }
        
      },
      error:(e) => {
        this.toastr.success(e);
      },
      
    })

  }

}
