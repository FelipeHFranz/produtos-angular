import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthLayoutComponent } from './modules/authentication/auth-layout/auth-layout.component';
import { ListProdutoComponent } from './modules/autorized/produto/list-produto/list-produto.component';
import { AutoLayoutComponent } from './modules/autorized/auto-layout/auto-layout.component';
import { UserInfoComponent } from './modules/autorized/usuario/user-info/user-info.component';
import { SenhaComponent } from './modules/autorized/usuario/senha/senha.component';
import { OpProdutoComponent } from './modules/autorized/produto/op-produto/op-produto.component';
import { DeleteComponent } from './shared/dialog/delete/delete.component';
import { CadastroComponent } from './modules/authentication/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProdutoComponent,
    LoginComponent,
    AuthLayoutComponent,
    AutoLayoutComponent,
    UserInfoComponent,
    SenhaComponent,
    OpProdutoComponent,
    DeleteComponent,
    CadastroComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
