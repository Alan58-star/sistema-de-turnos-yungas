import { Injectable } from '@angular/core';
import { ObraSocial } from '../models/obraSocial';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {
  url='https://sistema-de-turnos-hdlh-back.onrender.com/api/obra/';
  
  obras:ObraSocial[];
  obras1:ObraSocial[];
  obras2:ObraSocial[];
  
  constructor(private http: HttpClient) {
    this.obras = [];
    this.obras1 = [];
    this.obras2 = [];
   }
  getObras(){
    return this.http.get<ObraSocial[]>(this.url);
  }
  getObra(id:any){
    return this.http.get<ObraSocial>(`${this.url}/${id}`);
  }

 
}
