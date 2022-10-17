import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../app.const';
import { Produto } from '../model/produto.model';
import { AuthUtilService } from './authentication/auth-util.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient,
    private authUtil: AuthUtilService,) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authUtil.currentTokenValue,
    });
  }

  public getProdutos() {
    return this.http.get<Produto>(API.concatToAPIStorageURL('produto/all'), { headers: this.getHeaders() });
  }
  public getProdutoById(id) {
    return this.http.get<Produto>(API.concatToAPIStorageURL(`produto/${id}`), { headers: this.getHeaders() });
}
  public postProduto(produto: Produto) {
    return this.http.post(API.concatToAPIStorageURL('produto'), JSON.stringify(produto), { headers: this.getHeaders() });
  }
  public updateProduto(produto: Produto) {
    console.log(produto);
    
    return this.http.put(API.concatToAPIStorageURL('produto'), JSON.stringify(produto), { headers: this.getHeaders() });
  }
  public deleteProduto(id) {
   return this.http.delete(API.concatToAPIStorageURL(`produto/${id}`), { headers: this.getHeaders() });
  }
}
