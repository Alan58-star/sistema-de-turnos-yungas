import { Component, OnInit } from '@angular/core';
import { RouterLink,Router,ActivatedRoute } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente';
import { Toast, ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  pacienteForm:FormGroup;
  passwd: boolean = false;
  constructor(private fb:FormBuilder, public _pacienteService: PacienteService,private toastr: ToastrService,private router:Router,private route:ActivatedRoute, public _loginService:LoginService){
    this.pacienteForm = this.fb.group({
      dni: new FormControl(),
      passw: new FormControl(),
      
    });
    this.passwd = false;    
  }
  ngOnInit(): void {
    
  }
  login(){
   
    this._loginService.loginUsuario(this.pacienteForm.value).subscribe({
      next:(data) => {
        var paciente=data;
        if(paciente.status=='1'){
          this.toastr.success(paciente.msg);
          sessionStorage.setItem("dni", paciente.dni);
          sessionStorage.setItem("telefono", paciente.telefono);
          sessionStorage.setItem("id", paciente.id);
          sessionStorage.setItem("token", paciente.token);
          sessionStorage.setItem("rol", paciente.rol);
          sessionStorage.setItem("nombre", paciente.nombre);
          if(data.rol=="paciente"){
            
            this.router.navigateByUrl('/');
          }
          if(data.rol=="admin"){
            
            this.router.navigateByUrl('/admin');
          }
          if(data.rol=="secretaria"){
            
            this.router.navigateByUrl('/secretaria');
          }
          
        }
        else{
          this.toastr.error(paciente.msg);
        }
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })

  }
showHidePwd(){
  this.passwd = !this.passwd;
  console.log(this.passwd);
}
  
}
