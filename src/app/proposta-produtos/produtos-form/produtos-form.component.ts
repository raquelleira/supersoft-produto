import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Produto } from '../shared/produto.model';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss']
})
export class ProdutosFormComponent implements OnInit {

    public form: FormGroup;
    public produto: Produto;

    constructor(
        private formBuilder: FormBuilder,
        private produtosService: ProdutosService,
        private router: Router
    ) { }

    /**
     * Inicia a view
     */
    public ngOnInit(): void {
        this.produto = this.produtosService.produtoEditado;
        if (this.produto?.id) {
            this.produtosService.getProdutoDetalhado(this.produto.id)
                .then(produto => {
                    this.produto = produto;
                    this.form = this.buildForm();
                })
                .catch(error => console.error(error));
        } else {
            this.form = this.buildForm();
        }
    }

    /**
     * Submete o form
     */
    public submit(): void {
        this.produtosService.submitProduto(this.form.getRawValue())
            .then(response => {
                // Sucesso.. mensagem de sucesso e provavelmente manda um trigger pra atualizar a lista de produtos...
                this.finalizaEdicao();
            })
            .catch(error => {
                // Trata erro aqui.. mostra mensagem, etc...
                console.error(error);
                this.finalizaEdicao();
            });
    }

    /**
     * Navega para a tela
     */
    public finalizaEdicao(): void {
        this.router.navigate(['raquel']);
    }

    /**
     * Builda o form de produto
     * @returns {Produto}
     */
    private buildForm(): FormGroup {
        return this.form = this.formBuilder.group({
            id: this.produto?.id || null
        });
    }

}
