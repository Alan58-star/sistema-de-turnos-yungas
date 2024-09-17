import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
      password: '',
      repeatPassword: '',
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  onResetPassword() {
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
