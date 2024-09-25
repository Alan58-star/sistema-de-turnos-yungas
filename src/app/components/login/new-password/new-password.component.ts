import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent implements OnInit {
  passwd: boolean = false;
  token: string = '';
  datos: FormGroup;
  passwordMismatch: boolean = false;
  showHidePwd() {
    this.passwd = !this.passwd;
  }

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.datos = this.fb.group({
      password: ['',Validators.required],
      repeatPassword: ['',Validators.required],
    });
    // Monitorear cambios en tiempo real
    this.datos.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });

    this.datos.get('repeatPassword')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }
  checkPasswords(): void {
    const passw1 = this.datos.get('password')?.value;
    const passw2 = this.datos.get('repeatPassword')?.value;

    this.passwordMismatch = passw1 !== passw2;  // Actualiza passwordMismatch
  }

  onResetPassword() {
    if (this.passwordMismatch) {
      this.toastr.error("Las contraseñas no coinciden.");
      return;
    }
    if (this.datos.invalid) {
      this.toastr.error("Todos los campos deben estar completos y correctos.");
      return;
    }
    this.pacienteService
      .resetPassword(this.token.trim(), this.datos.value.password)
      .subscribe({
        next: (result) => {
          this.toastr.success(
            result.msg || 'Se envió un mensaje a su WhatsApp'
          );
          this.router.navigateByUrl('/login');
        },
        error: (e) => {
          const errorMessage =
            e.error?.msg || 'Ocurrió un error al intentar enviar el mensaje';
          this.toastr.error(errorMessage);
        },
      });
  }
}
