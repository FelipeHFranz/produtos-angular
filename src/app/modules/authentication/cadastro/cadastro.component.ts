import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private srv: UsuarioService,
    private snackBar: SnackbarService,
    public router: Router,
  ) { }

  public cadastroForm: FormGroup;
  public hidePassword: boolean = false;
  public hidePasswordConfirm: boolean = false;

  ngOnInit(): void {

    this.cadastroForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.checkPasswords });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.cadastroForm.controls[controlName].hasError(errorName);
  };

  public checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const passwordConfirm = group.get('passwordConfirm').value;

    if (passwordConfirm.length < 6) return true


    return password === passwordConfirm ? null : { notSame: true ? true : false }
  }


  sendForm() {
    const usuario: Usuario = new Usuario();
    usuario.nome = this.cadastroForm.controls['name'].value;
    usuario.email = this.cadastroForm.controls['email'].value;
    usuario.senha = this.cadastroForm.controls['password'].value;


    this.srv.postUsuario(usuario)
      .subscribe(
        {
          next: res => {
            this.snackBar.openSnackBarTopCenter('Conta criada.', 'ok');
             this.router.navigate(['/auth/login']);
           },
           error:e=>{this.snackBar.openSnackBarTopCenter('erro: ' + e.status, e.error);console.log(e);
           }
        }

      )
      }
}
