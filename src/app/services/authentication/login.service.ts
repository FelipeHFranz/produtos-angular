import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { API } from '../../app.const';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    });
  }
 //faz login
 public login = (login: string, password: string): Observable<string> => {
  const body = JSON.stringify({ Email: login, Senha: password });
  console.log('a')
  return this.http
    .post<string>( 
     API.concatToAPIStorageURL ('login'), body,{ headers: this.getHeaders(), responseType: 'text' as 'json' }
    );
}



}
