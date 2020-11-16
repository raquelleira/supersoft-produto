import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProdutosService } from '../produtos.service';
import { Produto } from '../shared/produto.model';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit, OnDestroy {

    public columns: string[] = ['nome', 'preco_custo', 'preco_venda', 'medida', 'obs', 'acoes'];
    public produtos: MatTableDataSource<Produto>;

    private subscriptionDestroyer: Subject<null> = new Subject();

    constructor(
        private produtosService: ProdutosService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    /**
     * Inicia a lista
     */
    public ngOnInit(): void {
        this.produtosService.produtos$
            .pipe(takeUntil(this.subscriptionDestroyer))
            .subscribe(produtos => this.produtos = new MatTableDataSource(produtos));
    }

    /**
     * Interrompe as subscriptions quando o componente é finalizado
     */
    public ngOnDestroy(): void {
        this.subscriptionDestroyer.next();
        this.subscriptionDestroyer.complete();
    }

    /**
     * Edita um produto existente
     * @param {Produto} produto
     */
    public editarProduto(produto: Produto): void {
        this.produtosService.editarProduto(produto);
        this.navigateForm();
    }

    /**
     * Adiciona um produto novo
     */
    public adicionarProduto(): void {
        this.produtosService.editarProduto(new Produto({}));
        this.navigateForm();
    }

    /**
     * Navega para a rota do form de produtos
     */
    private navigateForm(): void {
        this.router.navigate(['produtos-form'], { relativeTo: this.route });
    }

}
