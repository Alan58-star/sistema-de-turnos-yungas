import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  url='http://localhost:4000/api/medico/';
  
  medicos:Medico[];

  constructor(private http: HttpClient) {
    this.medicos = [];
   }
  getMedicos(){
    return this.http.get<Medico[]>(this.url);
  }
  getMedico(id:any){
    return this.http.get<Medico>(`${this.url}/${id}`);
  }
  getEspecialidades(id:any){
    return this.http.get<Medico>(`${this.url}/especialidad/${id}`);
  }
  postMedico(medico: Medico){
    return this.http.post<any>(this.url, medico);
  }
  deleteMedico(id:any){
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
