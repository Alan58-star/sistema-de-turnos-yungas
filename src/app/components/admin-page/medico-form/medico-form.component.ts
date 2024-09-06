import { Component, OnInit } from '@angular/core';
import { AdminNavComponent } from "../admin-nav/admin-nav.component";
import { RouterLink } from '@angular/router';
import { Medico } from '../../../models/medico';
import { MedicoService } from '../../../services/medico.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-medico-form',
  standalone: true,
  imports: [AdminNavComponent, RouterLink,ReactiveFormsModule],
  templateUrl: './medico-form.component.html',
  styleUrl: './medico-form.component.css'
})
export class MedicoFormComponent implements OnInit {
  medicoForm:FormGroup;
  
  constructor(private fb:FormBuilder, public _medicoService: MedicoService){
    this.medicoForm = this.fb.group({
      legajo: ['',Validators.required],
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      
    })
  }
  ngOnInit(): void {
    
  }
  agregarMedico(){
    const MEDICO: Medico ={
      legajo: this.medicoForm.get('legajo')?.value,
      nombre: this.medicoForm.get('nombre')?.value,
      apellido: this.medicoForm.get('apellido')?.value,
    }
    
    this._medicoService.postMedico(MEDICO).subscribe({
      next:(data) => {
        console.log(data);
        
      },
      error:(e) => {
        console.log(e);
      },
      
    })

  }
}
