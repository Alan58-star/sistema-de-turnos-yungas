import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  private version = environments.Version;
  private phoneNumberId = environments['Phone-Number-ID'];
  private token = environments['User-Access-Token'];
  private urlBase = `${environments.baseUrl}/${this.version}/${this.phoneNumberId}/messages`;

  constructor(private _http: HttpClient) { }

  sendMessage(target: string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      messaging_product: 'whatsapp',
      to: target,
      type: 'template',
      template: {
        name: 'hello_world',
        language: {
          code: 'en_US'
        }
      }
    };
    
    return this._http.post(this.urlBase, body, { headers });
  }
}
