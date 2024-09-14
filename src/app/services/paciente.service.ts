import { Injectable } from '@angular/core'
import {Paciente} from '../models/paciente'
import { HttpClient } from '@angular/common/http'
import { Turno } from '../models/turno';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url='http://localhost:4000/api/paciente/';
  
  pacientes:Paciente[];
  turnos:Turno[];

  constructor(private http: HttpClient) {
    this.pacientes = [];
    this.turnos=[];
   }
  getPacientes(){
    return this.http.get<Paciente[]>(this.url);
  }
  getPaciente(id:any){
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }
  postPaciente(paciente: Paciente){
    return this.http.post<any>(this.url+'/register', paciente);
  }
  loginUsuario(formulario: any){
    return this.http.post<any>(this.url+'/login', formulario);
  }
  deletePaciente(id:any){
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  getTurnosPaciente(){
    return this.http.get<Turno[]>(`${this.url}/turnos/${sessionStorage.getItem('id')}`);
  }
}
