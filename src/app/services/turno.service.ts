import { Injectable } from '@angular/core';
import {Turno} from '../models/turno'
import { HttpClient ,HttpHeaders ,HttpParams} from '@angular/common/http'
import { TurnoServ } from '../models/turnoServ';
@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  url='http://localhost:4000/api/turno/';
  
  turnos:Turno[];

  constructor(private http: HttpClient) {
    this.turnos = [];
   }
  getTurnos(){
    return this.http.get<Turno[]>(this.url);
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
