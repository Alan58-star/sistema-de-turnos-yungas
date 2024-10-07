import { Injectable } from '@angular/core';
import { ObraSocial } from '../models/obraSocial';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {
  url='http://localhost:4000/api/obra/';
  
  obras:ObraSocial[];
  obras1:ObraSocial[];
  obras2:ObraSocial[];
  
  constructor(private http: HttpClient) {
    this.obras = [];
    this.obras1 = [];
    this.obras2 = [];
   }
  getObras(){
    return this.http.get<ObraSocial[]>(this.url,this.createHeader());
  }
  getObra(id:any){
    return this.http.get<ObraSocial>(`${this.url}/${id}`,this.createHeader());
  }
  createHeader(){
    return {
      headers: new HttpHeaders({
        'Authorization':sessionStorage.getItem("token")!
      })
    }
  }
 
}
