import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthUtilService } from 'src/app/services/authentication/auth-util.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.scss']
})
export class SenhaComponent {

  hideNewPassword = true;
  hidePassword = true;
  actualPassword: string;
  newPassword: string;
  constructor(
    public dialogRef: MatDialogRef<SenhaComponent>, private usuarioService:UsuarioService,
    private snackbarService:SnackbarService) { }

  
  changePassword() {
    this.usuarioService.alterarSenha(this.actualPassword, this.newPassword).subscribe({
      next:res=>{
        console.log(res);
        
        this.snackbarService.openSnackBarTopCenter('Senha Alterada!');
        this.dialogRef.close();
      },
      error:e=>{
        this.snackbarService.openSnackBarTopCenter(`Senha não foi alterada!, ${e.error}`);
        console.log(e);
        
      }
    }
     
    );
  }


}
