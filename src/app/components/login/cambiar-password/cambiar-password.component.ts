import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent implements OnInit{
  datos: FormGroup;
  passwd: boolean = false;
  passwordMismatch: boolean = false;
  ngOnInit(): void {
  
  }
  constructor(public _pacienteService:PacienteService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    
    private toastr: ToastrService,
    public _loginService:LoginService
    
  ){
      
    this.datos = this.fb.group({
      password1: ['',Validators.required],
      passw1: ['',Validators.required],
      passw2:['',Validators.required]
    });
     // Monitorear cambios en tiempo real
     this.datos.get('passw1')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });

    this.datos.get('passw2')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }
  checkPasswords(): void {
    const passw1 = this.datos.get('passw1')?.value;
    const passw2 = this.datos.get('passw2')?.value;

    this.passwordMismatch = passw1 !== passw2;  // Actualiza passwordMismatch
  }
  resetPassword() {
    if (this.passwordMismatch) {
      this.toastr.error("Las contraseñas no coinciden.");
      return;
    }
    if (this.datos.invalid) {
      this.toastr.error("Todos los campos deben estar completos y correctos.");
      return;
    }
    let idPaciente=sessionStorage.getItem("id");
    this._pacienteService
      .resetPasswordSinToken(this.datos.get('password1')?.value,this.datos.get('passw1')?.value,idPaciente)
      .subscribe({
        next: (result) => {
          this.toastr.success(
            result.msg 
          );
          this._loginService.logout();
          this.router.navigateByUrl('/login');
        },
        error: (e) => {
          const errorMessage =
            e.error?.msg;
          this.toastr.error(errorMessage);
        },
      });
  }
  showHidePwd(){
    this.passwd = !this.passwd;
    
  }
}
