import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Produto } from './shared/produto.model';

@Injectable({
    providedIn: 'root'
})
export class ProdutosService {
    public produtos$: Observable<Produto[]>;
    public produtoEditado: Produto;

    private produtosSubject: BehaviorSubject<Produto[]> = new BehaviorSubject(null);

    constructor(
        private httpClient: HttpClient
    ) {
        this.produtos$ = this.produtosSubject.asObservable();
    }

    /**
     * Recupera e emite uma lista de produtos.
     */
    public getProdutos(): void {
        const url = 'assets/produtos.json';
        this.httpClient.get<any>(url)
            .toPromise()
            .then(response => this.produtosSubject.next(response.produtos));
    }

    /**
     * Recupera um produto específico pelo id.
     * @param {number} id
     * @returns {Promise<Produto>}
     */
    public getProdutoDetalhado(id: number): Promise<Produto> {
        return Promise.resolve(this.produtoEditado);
    }

    /**
     * Criar/Editar um produto
     * @param {Produto} produto
     */
    public editarProduto(produto: Produto): void {
        this.produtoEditado = produto;
    }

    /**
     * Salva as informações do produto
     * @param {Produto} produto
     * @returns {Promise<any>}
     */
    public submitProduto(produto: Produto): Promise<any> {
        // AQUI O REQUEST JÁ ESTÁ MONTADO DA FORMA DESEJADA
        console.log(produto);
        if (produto.foto && typeof produto.foto !== 'string') {
            // Se tem foto, tem que converter o request para HTML request.
            // Aqui dá pra submeter tudo no mesmo request (se converter)
            // Ou submeter em dois requests separados, um pra imagem e outro pros dados do produto
            // Na pratica, tanto faz...
            return produto.id ? this.atualizaProduto(this.buildRequest(produto)) : this.postProduto(this.buildRequest(produto));
        } else {
            return produto.id ? this.atualizaProduto(produto) : this.postProduto(produto);
        }
    }

    /**
     * Submete uma requisição POST para criar um novo produto
     * @param {Produto} produto
     * @returns {Promise<any>}
     */
    private postProduto(produto: Produto | FormData): Promise<any> {
        const url = 'produtos/adicionar';
        return this.httpClient.post(url, produto).toPromise();
    }

    /**
     * Submete uma requisição PUT para atualizar um produto
     * @param {Produto} produto
     * @returns {Promise<any>}
     */
    private atualizaProduto(produto: Produto | FormData): Promise<any> {
        const url =  'produtos/atualizar';
        return this.httpClient.post(url, produto).toPromise();
    }

    /**
     * Submete um put para atualizar o produto com a imagem.
     */
    private buildRequest(produto: Produto): FormData{
        const formData: any = new FormData();
        Object.keys(produto).forEach(key => {
            formData.append(key, produto[key]);
        });
        return formData;
    }
}
