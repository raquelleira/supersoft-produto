import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';

import { Produto } from '../../shared/produto.model';
import { Adicional } from '../../../shared/adicional/adicional.model';
import { AdicionalService } from '../../../shared/adicional/adicional.service';

@Component({
    selector: 'app-produto-adicionais-form',
    templateUrl: './produto-adicionais-form.component.html',
    styleUrls: ['./produto-adicionais-form.component.scss']
})
export class ProdutoAdicionaisFormComponent implements OnInit, OnDestroy {

    @Input() public form: FormGroup;
    @Input() public produto: Produto;
    public adicionalForm: FormGroup;
    public criarAdicionalForm: FormGroup;
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public adicionais: Adicional[] = [];
    public adicionaisFiltrados: Adicional[] = [];
    public subscription;
    @ViewChild('adicionalInput') adicionalInput: ElementRef<HTMLInputElement>;

    private subscriptionDestroyer: Subject<null> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private adicionalService: AdicionalService
    ) { }

    /**
     * Inicia a view do form de adicionais do produto
     */
    public ngOnInit(): void {
        this.adicionalService.getAdicionais();
        this.buildForm();
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
     * Remove um adicional da lista
     * @param {number} id
     */
    public removerAdicional(id: number): void {
        const index = this.form.get('id_adicional').value.indexOf(id);
        if (index >= 0) {
            this.form.get('id_adicional').value.splice(index, 1);
        }
    }

    /**
     * Recupera a descrição de um adicional, baseado em seu id
     * @param {number} id
     * @returns {Adicional}
     */
    public getAdicional(id: number): Adicional {
        return this.adicionais.find(listItem => listItem.id === id);
    }

    /**
     * Seleciona um adicional em um auto complete
     * @param {MatAutocompleteSelectedEvent} event
     */
    public adicionalSelecionado(event: MatAutocompleteSelectedEvent): void {
        const itemSelecionado = this.adicionais.find(adicional =>
            adicional.descricao.toLowerCase() === event.option.viewValue.toLowerCase() ||
            event.option.viewValue.toLowerCase().includes(adicional.descricao.toLowerCase()));
        this.form.get('id_adicional').value.push(itemSelecionado.id);
        this.resetAdicional();
    }

    /**
     * Cria um novo adicional
     */
    public criarAdicional(): void {
        this.adicionalService.criarAdicional(this.criarAdicionalForm.getRawValue())
            .then(() => this.criarAdicionalForm.reset());
    }

    /**
     * Adiciona ao form do componente pai os campos relativo aos adicionais do produto.
     */
    private buildForm(): void {
        this.form.addControl('id_adicional', this.formBuilder.control(this.produto?.adicionais || [], Validators.required));
        this.adicionalForm = this.formBuilder.group({ adicional: null });
        this.criarAdicionalForm = this.formBuilder.group({
            id: null,
            descricao: [null, Validators.required],
            valor: [null, Validators.required]
         });
    }

    /**
     * Builda os dropdowns e selecionaveis
     */
    private buildDropdowns(): void {
        this.adicionalService.adicionais$
            .subscribe(adicionais => {
                if (adicionais) {
                    this.adicionais = adicionais;
                    if (!this.subscription) {
                        this.initSubscriptions();
                    }
                }
            });
    }

    /**
     * Inicializa subscriptions nos campos do form que fazem trigger de filtros
     */
    private initSubscriptions(): void {
        this.subscription = this.adicionalForm.get('adicional').valueChanges
            .pipe(
                startWith(null),
                map((descricao: string | null) =>  descricao ? this.filtrarAdicionais(descricao) : this.adicionais),
                takeUntil(this.subscriptionDestroyer)
            )
            .subscribe(adicionais => this.adicionaisFiltrados = adicionais);
    }

    /**
     * Filtra lista de adicionais baseado no valor digitado no input
     * @param {string} descricao
     */
    private filtrarAdicionais(descricao: string): Adicional[] {
        return this.adicionais.filter(adicional => adicional.descricao.toLowerCase().indexOf(descricao.toLowerCase()) === 0);
    }

    /**
     * Reseta os filtros e campos dos auto completes
     */
    private resetAdicional(): void {
        this.adicionaisFiltrados = this.adicionais;
        this.adicionalInput.nativeElement.value = '';
        this.adicionalForm.reset();
    }

}
