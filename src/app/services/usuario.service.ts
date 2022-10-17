import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../app.const';
import { Usuario } from '../model/usuario.model';
import { AuthUtilService } from './authentication/auth-util.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
    private authUtil: AuthUtilService,
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authUtil.currentTokenValue,
    });
  }
  private getHeaderspost(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    });
  }
  public getUsuario() {
      return this.http.get<Usuario>(API.concatToAPIStorageURL('usuario'), { headers: this.getHeaders() });
  }
  public postUsuario(user: Usuario) {
    return this.http.post(API.concatToAPIStorageURL('usuario'), JSON.stringify(user), { headers: this.getHeaderspost() });
  }
  public updateUsuario(user: Usuario) {
   
    return this.http.put(API.concatToAPIStorageURL('usuario'), JSON.stringify(user), { headers: this.getHeaders() });
  }
  public deleteUsuario(id) {
    this.http.delete(API.concatToAPIStorageURL(`usuario/${id}`), { headers: this.getHeaders() });
  }

  public alterarSenha(senhaAtual:string, senhaNova:string){
    return this.http.put(API.concatToAPIStorageURL('usuario/alterarsenha'), JSON.stringify({senhaAtual:senhaAtual,senhaNova:senhaNova}), { headers: this.getHeaders() });
  }
}
