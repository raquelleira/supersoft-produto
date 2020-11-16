import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Produto } from '../../shared/produto.model';
import { CategoriaService } from '../../../shared/categoria/categoria.service';
import { Categoria } from '../../../shared/categoria/categoria.model';

@Component({
  selector: 'app-produto-dados-form',
  templateUrl: './produto-dados-form.component.html',
  styleUrls: ['./produto-dados-form.component.scss']
})
export class ProdutoDadosFormComponent implements OnInit {

    @Input() public form: FormGroup;
    @Input() public produto: Produto;
    public categorias: Categoria[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private categoriaService: CategoriaService
    ) { }

    /**
     * Inicia a view do form de dados do produto
     */
    public ngOnInit(): void {
        this.buildForm();
        this.buildDropdowns();
    }

    /**
     * Adiciona ao form do componente pai os campos relativos a dados do produto.
     */
    private buildForm(): void {
        this.form.addControl('nome', this.formBuilder.control(this.produto?.nome || null, Validators.required));
        this.form.addControl('id_categoria', this.formBuilder.control(this.produto?.id_categoria || null, Validators.required));
        this.form.addControl('preco_custo', this.formBuilder.control(this.produto?.preco_custo || null));
        this.form.addControl('preco_venda', this.formBuilder.control(this.produto?.preco_venda || null, Validators.required));
        this.form.addControl('medida', this.formBuilder.control(this.produto?.medida || null));
        this.form.addControl('obs', this.formBuilder.control(this.produto?.obs || null));
    }

    /**
     * Builda os dropdowns e selecionaveis
     */
    private buildDropdowns(): void {
        this.categoriaService.getCategoriasPromise()
            .then(categorias => this.categorias = categorias)
            .catch(error => console.error(error));
    }

}
