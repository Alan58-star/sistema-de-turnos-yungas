import { Injectable } from '@angular/core';
import {Turno} from '../models/turno'
import { HttpClient ,HttpHeaders ,HttpParams} from '@angular/common/http'
import { TurnoServ } from '../models/turnoServ';
@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  url='https://sistema-de-turnos-hdlh-back.onrender.com/api/turno/';
  
  turnos:any[];
  

  constructor(private http: HttpClient) {
    this.turnos = [];
   }
  getTurnos(){
    return this.http.get<Turno[]>(this.url);
  }
  getTurnosHoy(){
    return this.http.get<any[]>(this.url+'hoy');
  }
  getTurnosPorFecha(fecha:any){
    return this.http.get<Turno[]>(this.url+'fecha/'+fecha);
  }
  getTurnosPorPaciente(busqueda:any){
    return this.http.get<Turno[]>(this.url+'paciente2/'+busqueda);
  }
  
  getTurnosPorMedico(busqueda:any){
    return this.http.get<any[]>(this.url+'medico/'+busqueda);
  }
  postTurno(turno: TurnoServ){
    return this.http.post<any>(this.url, turno);
  }
  putTurno(turno:TurnoServ){
    return this.http.put<any>(this.url+turno._id,turno);
  }
  
  getTurno(id:any){
    return this.http.get<TurnoServ>(`${this.url}/${id}`);
  }
  /*
  postPaciente(paciente: Paciente){
    return this.http.post<any>(this.url, paciente);
  }
  deletePaciente(id:any){
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  getTurnosPaciente(id:any){
    return this.http.delete<any>(`${this.url}/turnos/${id}`);
  }*/
}
