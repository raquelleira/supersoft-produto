import { Component, OnInit } from '@angular/core';

import { ProdutosService } from './produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

    constructor(
        private produtosService: ProdutosService
    ) { }

    /**
     * Componente principal.
     * Trigger para recuperar os produtos e carregar a lista.
     */
    public ngOnInit(): void {
        this.produtosService.getProdutos();
    }

}
