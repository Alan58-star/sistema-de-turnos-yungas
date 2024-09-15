import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  environment = {
    'baseUrl': 'https://graph.facebook.com',
    'Business-ID': '557605326605445',
    'Phone-Number-ID': '398388510029004',
    'User-Access-Token': 'EAASUrq8QlP0BOyRDAaMQiZCEplaBHzOpFim5Q0GUunv7iIx0ZC52Cw9yqLaBhvQKNS8Yb3UgZASS6GOCuqfiY8aA4vaCf3mRZCV9XyjYpA1MfNXuGyLpgrw7ONh72tutdn5x9pL0B2n2ALZBsJ30d4uxD4NNTwjeMCeikoLMcW7XZAC42ZCnKy2F2EhavzREBcI',
    'WABA-ID': '354116141128824',
    'Version': 'v20.0'
};

  private version = this.environment.Version;
  private phoneNumberId = this.environment['Phone-Number-ID'];
  private token = this.environment['User-Access-Token'];
  private urlBase = `${this.environment.baseUrl}/${this.version}/${this.phoneNumberId}/messages`;
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
