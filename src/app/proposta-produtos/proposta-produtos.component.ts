import { Component, OnInit } from '@angular/core';

import { ProdutosService } from './produtos.service';

@Component({
    selector: 'app-proposta-produtos',
    templateUrl: './proposta-produtos.component.html',
    styleUrls: ['./proposta-produtos.component.scss']
})
export class PropostaProdutosComponent implements OnInit {

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
