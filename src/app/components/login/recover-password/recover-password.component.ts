import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { ToastrService } from 'ngx-toastr';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css',
})
export class RecoverPasswordComponent {
  datos: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.datos = this.fb.group({
      dni: '',
      number: '',
    });
  }

  sendMessage() {
    this.datos.value.number = '54' + this.datos.value.number;
    this.pacienteService.requestPasswordReset(this.datos.value).subscribe({
      next: (result) => {
        this.toastr.success(result.msg || 'Se envió un mensaje a su WhatsApp');
        this.router.navigateByUrl('/')
      },
      error: (e) => {
        const errorMessage =
          e.error?.msg || 'Ocurrió un error al intentar enviar el mensaje';
        this.toastr.error(errorMessage);
      },
    });
  }
}
