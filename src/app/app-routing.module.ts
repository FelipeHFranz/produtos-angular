import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './modules/authentication/auth-layout/auth-layout.component';
import { AuthGuard } from './modules/authentication/auth.guard';
import { CadastroComponent } from './modules/authentication/cadastro/cadastro.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { AutoLayoutComponent } from './modules/autorized/auto-layout/auto-layout.component';
import { ListProdutoComponent } from './modules/autorized/produto/list-produto/list-produto.component';

const routes: Routes = [
  {
    path: '',
    component: AutoLayoutComponent,
    children: [
      { path: '', component: ListProdutoComponent },

    ],
    canActivate: [AuthGuard],
  },

  {

    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'cadastro', component: CadastroComponent },


    ],
  },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
