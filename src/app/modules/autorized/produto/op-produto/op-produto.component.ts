import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from 'src/app/model/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-op-produto',
  templateUrl: './op-produto.component.html',
  styleUrls: ['./op-produto.component.scss']
})
export class OpProdutoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OpProdutoComponent>, @Inject(MAT_DIALOG_DATA) public data,
    private produtoService: ProdutoService, private formBuilder: FormBuilder, public snackBar: SnackbarService
  ) { }

  ownerForm: FormGroup;

  ngOnInit(): void {
    this.ownerForm = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required])
    });
    if (this.data.type == "update") {
      this.f['descricao'].setValue(this.data.descricao);
      this.f['valor'].setValue(this.data.valor);
    }

  }

  get f() {
    return this.ownerForm.controls;
  }
  save() {
    var produto: Produto = {id:this.data.id, descricao: this.f['descricao'].value, valor: parseFloat(this.f['valor'].value) }
    if (this.data.type == "update") {
      this.produtoService.updateProduto(produto).subscribe({
        next: res => { this.snackBar.openSnackBarTopCenter('Produto atualizado'); this.dialogRef.close(produto); },
        error: e => {
          console.log(e);
        }
      })
    } else {
     
      this.produtoService.postProduto(produto).subscribe({
        next: res => { this.snackBar.openSnackBarTopCenter('Produto cadastrado'); this.dialogRef.close(produto); },
        error: e => {
          console.log(e);
        }
      })
    }
  }

}
