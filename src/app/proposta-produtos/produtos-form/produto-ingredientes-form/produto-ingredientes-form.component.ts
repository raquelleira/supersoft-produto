import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';

import { Produto } from '../../shared/produto.model';
import { IngredienteService } from '../../../shared/ingredientes/ingrediente.service';
import { Ingrediente } from '../../../shared/ingredientes/ingrediente.model';

@Component({
  selector: 'app-produto-ingredientes-form',
  templateUrl: './produto-ingredientes-form.component.html',
  styleUrls: ['./produto-ingredientes-form.component.scss']
})
export class ProdutoIngredientesFormComponent implements OnInit, OnDestroy {

    @Input() public form: FormGroup;
    @Input() public produto: Produto;
    public ingredienteForm: FormGroup;
    public separatorKeysCodes: number[] = [ENTER, COMMA];
    public ingredientes: Ingrediente[] = [];
    public ingredientesFiltrados: Ingrediente[] = [];
    @ViewChild('ingredienteInput') ingredienteInput: ElementRef<HTMLInputElement>;

    private subscriptionDestroyer: Subject<null> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private ingredienteService: IngredienteService
    ) { }

    /**
     * Inicia a view do form de ingredientes do produto
     */
    public ngOnInit(): void {
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
     * Remove um ingrediente de uma lista
     * @param {number} id
     */
    public removerIngrediente(id: number): void {
        const index = this.form.get('id_ingredientes').value.indexOf(id);
        if (index >= 0) {
            this.form.get('id_ingredientes').value.splice(index, 1);
        }
    }

    /**
     * Recupera a descrição de um ingrediente, baseado em seu id
     * @param {number} id
     * @returns {string}
     */
    public getDescricaoIngrediente(id: number): string {
        return this.ingredientes.find(listItem => listItem.id === id)?.descricao;
    }

    /**
     * Seleciona um ingrediente em um auto complete
     * @param {MatAutocompleteSelectedEvent} event
     */
    public ingredienteSelecionado(event: MatAutocompleteSelectedEvent): void {
        const ingredienteSelecionado = this.ingredientes.find(ingrediente =>
            ingrediente.descricao.toLowerCase() === event.option.viewValue.toLowerCase());
        this.form.get('id_ingredientes').value.push(ingredienteSelecionado.id);
        this.resetIngrediente();
    }

    /**
     * Adiciona ao form do componente pai os campos relativos aos ingredientes do produto
     */
    private buildForm(): void {
        this.form.addControl('id_ingredientes', this.formBuilder.control(this.produto?.ingredientes || [], Validators.required));
        this.ingredienteForm = this.formBuilder.group({ ingrediente: null });
    }

    /**
     * Builda os dropdowns e selecionaveis
     */
    private buildDropdowns(): void {
        // Deixei esse timeout aqui pra demonstrar que a demora do back-end em retornar informações não quebra o form
        setTimeout(() => {
            this.ingredienteService.getIngredientesPromise()
            .then(ingredientes => {
                this.ingredientes = ingredientes;
                this.initSubscriptions();
            })
            .catch(error => console.error(error));
        }, 3000);

    }

    /**
     * Inicializa subscriptions nos campos do form que fazem trigger de filtros
     */
    private initSubscriptions(): void {
        this.ingredienteForm.get('ingrediente').valueChanges
            .pipe(
                startWith(null),
                map((descricao: string | null) =>  descricao ? this.filtrarIngredientes(descricao) : this.ingredientes),
                takeUntil(this.subscriptionDestroyer)
            )
            .subscribe(ingredientes => this.ingredientesFiltrados = ingredientes);
    }

    /**
     * Filtra lista de ingredientes baseado no valor digitado no input
     * @param {string} descricao
     */
    private filtrarIngredientes(descricao: string): Ingrediente[] {
        return this.ingredientes.filter(ingrediente => ingrediente.descricao.toLowerCase().indexOf(descricao.toLowerCase()) === 0);
    }

    /**
     * Reseta os filtros e campos dos auto completes
     */
    private resetIngrediente(): void {
        this.ingredientesFiltrados = this.ingredientes;
        this.ingredienteInput.nativeElement.value = '';
        this.ingredienteForm.reset();
    }

}
