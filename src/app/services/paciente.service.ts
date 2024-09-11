import { Injectable } from '@angular/core'
import {Paciente} from '../models/paciente'
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url='http://localhost:4000/api/paciente/';
  
  pacientes:Paciente[];

  constructor(private http: HttpClient) {
    this.pacientes = [];
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
  getTurnosPaciente(id:any){
    return this.http.delete<any>(`${this.url}/turnos/${id}`);
  }
}
