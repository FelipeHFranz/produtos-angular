import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserInfoComponent>,
    public usuarioService: UsuarioService,
    public snakeBar: SnackbarService
  ) { }

  isEditabled = false;
  formPerson: FormGroup;
  userid;
  ngOnInit(): void {
    this.getUsuario();
    this.formPerson = this.formBuilder.group({
      nome: new FormControl({ value: '', disabled: true }, [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required]),
    })

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formPerson.controls[controlName].hasError(errorName);
  }
  get f() {
    return this.formPerson.controls;
  }

  editPerson() {
    this.isEditabled = true;
    this.f['nome'].enable();
    this.f["email"].enable();
  }

  getUsuario() {
    this.usuarioService.getUsuario().subscribe({
      next: (res) => {

        this.userid = res.id;
        this.f['nome'].setValue(res.nome);
        this.f["email"].setValue(res.email);
      }
      ,
      error: (e) => {
        alert(e.error), console.log(e);
      }
    })

  }
  save() {
    this.usuarioService.updateUsuario({ id: this.userid, nome: this.f['nome'].value, email: this.f['email'].value, senha: '.' }).subscribe({
      next: res => {
        this.snakeBar.openSnackBarTopCenter('Atualizado');
        this.dialogRef.close(this.f['nome'].value);
      },
      error: e => {
        alert(e); console.log(e);
      }
    })
  }
}
