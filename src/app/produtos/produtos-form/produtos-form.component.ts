import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';

import { Produto } from '../shared/produto.model';
import { ProdutosService } from '../produtos.service';
import { Ingrediente } from '../../shared/ingredientes/ingrediente.model';
import { IngredienteService } from '../../shared/ingredientes/ingrediente.service';
import { AdicionalService } from '../../shared/adicional/adicional.service';
import { Adicional } from '../../shared/adicional/adicional.model';
import { CategoriaService } from '../../shared/categoria/categoria.service';
import { Categoria } from '../../shared/categoria/categoria.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss']
})
export class ProdutosFormComponent implements OnInit, OnDestroy {

    public form: FormGroup;
    public produto: Produto;
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public ingredientes: Ingrediente[] = [];
    public ingredientesFiltrados: Ingrediente[] = [];
    public adicionais: Adicional[] = [];
    public adicionaisFiltrados: Adicional[] = [];
    public categorias: Categoria[] = [];
    public colunasCategoria: string[] = ['caracteristica', 'valor_und', 'acoes'];
    public listaProdutoCaracteristica: MatTableDataSource<AbstractControl> = new MatTableDataSource([]);

    @ViewChild('ingredienteInput') ingredienteInput: ElementRef<HTMLInputElement>;
    @ViewChild('adicionalInput') adicionalInput: ElementRef<HTMLInputElement>;

    private subscriptionDestroyer: Subject<null> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private produtosService: ProdutosService,
        private ingredienteService: IngredienteService,
        private adicionalService: AdicionalService,
        private categoriaService: CategoriaService,
        private router: Router
    ) { }

    /**
     * Inicia a view
     */
    public ngOnInit(): void {
        this.produto = this.produtosService.produtoEditado;
        if (this.produto?.id) {
            this.produtosService.getProdutoDetalhado(this.produto.id)
                .then(produto => this.buildForm(produto))
                .catch(error => console.error(error));
        } else {
            this.buildForm(this.produto);
        }
        this.buildDropdowns();
    }

    /**
     * Finaliza as subscriptions
     */
    public ngOnDestroy(): void {
        this.subscriptionDestroyer.next();
        this.subscriptionDestroyer.complete();
    }

    /**
     * Remove um item de uma lista
     * @param {number} id
     * @param {string} formControl
     */
    public removerItem(id: number, formControl: string): void {
        const index = this.form.get(formControl).value.indexOf(id);
        if (index >= 0) {
            this.form.get(formControl).value.splice(index, 1);
        }
    }

    /**
     * Recupera a descrição de um item de uma lista, baseado em seu id
     * @param {number} id
     * @param {list} any[]
     * @returns {any}
     */
    public getItem(id: number, list: any[]): any {
        return list.find(listItem => listItem.id === id);
    }

    /**
     * Seleciona um item em um auto complete
     * @param {MatAutocompleteSelectedEvent} event
     * @param {any[]} lista
     * @param {formControl} string
     */
    public itemSelecionado(event: MatAutocompleteSelectedEvent, lista: any[], formControl: string): void {
        const itemSelecionado = lista.find(item =>
            item.descricao.toLowerCase() === event.option.viewValue.toLowerCase() ||
            event.option.viewValue.toLowerCase().includes(item.descricao.toLowerCase()));
        this.form.get(formControl).value.push(itemSelecionado.id);
        this.resetFiltros();
    }

    /**
     * Adiciona uma característica a lista
     */
    public adicionarCaracteristica(): void {
        const caracteristicas = this.form.get('caracteristica') as FormArray;
        caracteristicas.push(this.formBuilder.group(this.form.get('nonRequestItems').get('caracteristica').value));
        this.form.get('nonRequestItems').get('caracteristica').reset();
        this.listaProdutoCaracteristica = new MatTableDataSource((this.form.get('caracteristica') as FormArray).controls);
    }

    /**
     * Exclui uma caracteristica da lista
     * @param {AbstractControl} caracteristica
     */
    public excluirCaracteristica(caracteristica: AbstractControl): void {
        const caracteristicas = this.form.get('caracteristica') as FormArray;
        caracteristicas.removeAt(caracteristicas.value.findIndex(control =>
            control.id === caracteristica.get('id').value &&
            control.caracteristica === caracteristica.get('caracteristica').value &&
            control.valor_und === caracteristica.get('valor_und').value
        ));
        this.listaProdutoCaracteristica = new MatTableDataSource((this.form.get('caracteristica') as FormArray).controls);
    }

    /**
     * Submete o form
     */
    public submit(): void {
        this.form.removeControl('nonRequestItems');
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
        this.router.navigate(['']);
    }

    /**
     * Builda o form de produto
     * @param {Produto} produto
     */
    private buildForm(produto: Produto): void {
       this.form = this.formBuilder.group({
            id: produto?.id || null,
            nome: [produto?.nome || null, Validators.required],
            id_categoria: [produto?.id_categoria || null, Validators.required],
            preco_custo: [produto?.preco_custo || null],
            preco_venda: [produto?.preco_venda || null, Validators.required],
            medida: [produto?.medida || null],
            obs: [produto?.obs || null],
            id_adicional: this.formBuilder.control(this.produto?.adicionais || [], Validators.required),
            id_ingredientes: this.formBuilder.control(this.produto?.ingredientes || [], Validators.required),
            caracteristica: this.produto?.caracteristicas
                ? this.formBuilder.array(
                    this.produto.caracteristicas.map(caracteristica =>
                        this.formBuilder.group({
                            id: caracteristica?.id,
                            caracteristica: caracteristica?.caracteristica,
                            valor_und: caracteristica?.valor_und
                        })
                    )
                )
                : this.formBuilder.array([]),
            foto: null,
            nonRequestItems: this.formBuilder.group({
                ingrediente: null,
                adicional: null,
                caracteristica: this.formBuilder.group({
                    id: null,
                    caracteristica: null,
                    valor_und: null
                })
            })
       });
       this.listaProdutoCaracteristica = new MatTableDataSource((this.form.get('caracteristica') as FormArray).controls);
    }

    /**
     * Builda os dropdowns e selecionaveis
     */
    private buildDropdowns(): void {
        Promise.all([
            this.ingredienteService.getIngredientesPromise(),
            this.adicionalService.getAdicionaisPromise(),
            this.categoriaService.getCategoriasPromise()
        ]).then(responses => {
            [this.ingredientes, this.adicionais, this.categorias] = responses;
            this.initSubscriptions();
        }).catch(error => console.error(error));
    }

    /**
     * Inicializa subscriptions nos campos do form que fazem trigger de filtros
     */
    private initSubscriptions(): void {
        this.form.get('nonRequestItems.ingrediente').valueChanges
            .pipe(
                startWith(null),
                map((descricao: string | null) =>  descricao ? this.filtrarLista(descricao, this.ingredientes) : this.ingredientes),
                takeUntil(this.subscriptionDestroyer)
            )
            .subscribe(ingredientes => this.ingredientesFiltrados = ingredientes);

        this.form.get('nonRequestItems.adicional').valueChanges
            .pipe(
                startWith(null),
                map((descricao: string | null) => descricao ? this.filtrarLista(descricao, this.adicionais) : this.adicionais),
                takeUntil(this.subscriptionDestroyer)
            )
            .subscribe(adicionais => this.adicionaisFiltrados = adicionais);

    }

    /**
     * Filtra lista de ingredientes baseado no valor digitado no input
     * @param {string} descricao
     * @param {any[]} lista
     */
    private filtrarLista(descricao: string, lista: any[]): any[] {
        return lista.filter(item => item.descricao.toLowerCase().indexOf(descricao.toLowerCase()) === 0);
    }

    /**
     * Reseta os filtros e campos dos auto completes
     */
    private resetFiltros(): void {
        this.ingredientesFiltrados = this.ingredientes;
        this.adicionaisFiltrados = this.adicionais;
        this.form.get('nonRequestItems').reset();
        if (this.ingredienteInput) {
            this.ingredienteInput.nativeElement.value = '';
        }
        if (this.adicionalInput) {
            this.adicionalInput.nativeElement.value = '';
        }
    }

}
