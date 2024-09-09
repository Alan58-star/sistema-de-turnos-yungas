import { Injectable } from '@angular/core';
import { ObraSocial } from '../models/obraSocial';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {
  url='http://localhost:4000/api/obra/';
  
  obras:ObraSocial[];
  
  constructor(private http: HttpClient) {
    this.obras = [];
   }
  getObras(){
    return this.http.get<ObraSocial[]>(this.url);
  }
  getObra(id:any){
    return this.http.get<ObraSocial>(`${this.url}/${id}`);
  }

 
}
