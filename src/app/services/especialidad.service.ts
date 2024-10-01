import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Especialidad} from '../models/especialidad';
@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  
  url='https://sistema-de-turnos-hdlh-back.onrender.com/api/especialidad/';
  
  especialidades:Especialidad[];
  

  constructor(private http: HttpClient) {
    this.especialidades = [];
   }
  getEspecialidades(){
    return this.http.get<Especialidad[]>(this.url);
  }
  getEspecialidad(id:any){
    return this.http.get<Especialidad>(`${this.url}/${id}`);
  }
}


