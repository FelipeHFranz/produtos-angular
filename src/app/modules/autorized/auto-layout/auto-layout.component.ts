import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { AuthUtilService } from 'src/app/services/authentication/auth-util.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { isNullOrUndefined } from 'src/app/shared/nullorundefined.util';
import { SenhaComponent } from '../usuario/senha/senha.component';
import { UserInfoComponent } from '../usuario/user-info/user-info.component';

@Component({
  selector: 'app-auto-layout',
  templateUrl: './auto-layout.component.html',
  styleUrls: ['./auto-layout.component.scss']
})
export class AutoLayoutComponent implements OnInit {

  constructor(private authUtil: AuthUtilService, private router: Router, public dialog: MatDialog,
    public usuarioService: UsuarioService) { }

  user: Usuario;

  ngOnInit(): void {
    this.getUsuario();
  }

  logout() {
    this.authUtil.logout();
    this.router.navigate(['/auth/login']);
  }

  alterarSenha(){
    const dialogRef = this.dialog.open(SenhaComponent, {
      width: '500px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
    
    });
  
  }
  userDetails() {
    const dialogRef = this.dialog.open(UserInfoComponent, {
      width: '500px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrUndefined(result)) {
        this.user.nome = result;
      }
    });
  }
  getUsuario() {
    this.usuarioService.getUsuario().subscribe({
      next: (res) => {

        this.user = res
      }
      ,
      error: (e) => {
        alert(e.error), console.log(e);
      }
    })
  }
}
