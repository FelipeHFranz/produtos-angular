import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/model/produto.model';
import { ProdutoService } from 'src/app/services/produto.service';
import { DeleteComponent } from 'src/app/shared/dialog/delete/delete.component';
import { isNullOrUndefined } from 'src/app/shared/nullorundefined.util';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { OpProdutoComponent } from '../op-produto/op-produto.component';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.scss']
})
export class ListProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService, public dialog: MatDialog, public snackbarService: SnackbarService) { }

  //colunas da tabela
  displayedColumns: string[] = ['description', 'value', 'update', 'delete'];

  //dados da tabela
  public dataSource = new MatTableDataSource<Produto>();


  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
      },
      error: e => {
        console.log(e);
      }
    })
  }

  onInsert() {
    const dialogRef = this.dialog.open(OpProdutoComponent, {
      width: '350px',
      data: {
        type: 'insert',
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (!isNullOrUndefined(result)) {

        this.getProdutos();
      }
    });

  }
  onUpdate(produto: Produto) {
    const dialogRef = this.dialog.open(OpProdutoComponent, {
      width: '350px',
      data: {
        type: 'update',
        descricao: produto.descricao,
        valor: produto.valor,
        id: produto.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (!isNullOrUndefined(result)) {
        var pos = this.dataSource.data.map(function (e) { return e.id; }).indexOf(produto.id);
        this.dataSource.data[pos] = result;

        //para atualizar a tabela sem isso não atualiza
        this.dataSource.data = this.dataSource.data;
      }
    });
  }
  onDelete(produto: Produto) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '390px',
      data: {
        message: 'Você deseja deletar o produto:',
        name: produto.descricao
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) this.produtoService.deleteProduto(produto.id).subscribe({
        next: res => {
          this.snackbarService.openSnackBarTopCenter("Deletado");
          var pos = this.dataSource.data.map(function (e) { return e.id; }).indexOf(produto.id);
          this.dataSource.data.splice(pos, 1);
          //para atualizar a tabela sem isso não atualiza
          this.dataSource.data = this.dataSource.data;
        },
        error:e=>{console.log(e); this.snackbarService.openSnackBarTopCenter("Não foi possivel deletar o produto",e.error);;
        }
      }

      );
    });

  }



@ViewChild(MatSort, { static: true }) sort: MatSort;
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;//cria paginas na tabela
ngAfterViewInit(): void {
  this.dataSource.sort = this.sort;//ordenação
  this.dataSource.paginator = this.paginator;
}

//pesquisa item na tabela
public doFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
