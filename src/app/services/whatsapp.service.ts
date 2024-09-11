import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  private version = environment.Version;
  private phoneNumberId = environment['Phone-Number-ID'];
  private token = environment['User-Access-Token'];
  private urlBase = `${environment.baseUrl}/${this.version}/${this.phoneNumberId}/messages`;

  constructor(private _http:HttpClient) { }

  
  sendTurnMessage(target: string, name: string, date: string, doctor: string, room: string, especiality: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  
    const body = {
      messaging_product: 'whatsapp',
      to: target,
      type: 'template',
      template: {
        name: 'info_turno',
        language: {
          code: 'es_AR'
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: name
              },
              {
                type: 'text',
                text: date
              },
              {
                type: 'text',
                text: doctor
              },
              {
                type: 'text',
                text: room
              },
              {
                type: 'text',
                text: especiality
              }
            ]
          }
        ]
      }
    };
  
    return this._http.post(this.urlBase, body, { headers });
  }
}
