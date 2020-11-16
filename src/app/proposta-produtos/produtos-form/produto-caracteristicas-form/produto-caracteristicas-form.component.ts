import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AbstractControl, FormBuilder, FormGroup, FormArray, NgModel } from '@angular/forms';

import { Produto } from '../../shared/produto.model';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-produto-caracteristicas-form',
    templateUrl: './produto-caracteristicas-form.component.html',
    styleUrls: ['./produto-caracteristicas-form.component.scss']
})
export class ProdutoCaracteristicasFormComponent implements OnInit {

    @Input() public form: FormGroup;
    @Input() public produto: Produto;
    public caracteristicaForm: FormGroup;
    public listaProdutoCaracteristica: MatTableDataSource<AbstractControl> = new MatTableDataSource([]);
    public colunasCaracteristica: string[] = ['caracteristica', 'valor_und', 'input', 'acoes'];
    @ViewChildren('numeroMesaInput', { read: MatInput }) numeroMesaInput: QueryList<MatInput>;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    /**
     * Inicia a view do form de caracteristicas do produto
     */
    public ngOnInit(): void {
        this.buildForm();
    }

    /**
     * Adiciona uma característica a lista
     */
    public adicionarCaracteristica(): void {
        const caracteristicas = this.form.get('caracteristica') as FormArray;
        caracteristicas.push(this.formBuilder.group(this.caracteristicaForm.value));
        this.caracteristicaForm.reset();
        this.listaProdutoCaracteristica = new MatTableDataSource((this.form.get('caracteristica') as FormArray).controls);
    }

    /**
     * Edita uma caracteristica
     * ESSE MÉTODO SÓ FOI CRIADO PRA MOSTRAR A APLICAÇÃO DA MÁSCARA
     * @param {AbstractControl} caracteristica
     */
    public editarCaracteristica(caracteristica: AbstractControl): void {
        this.caracteristicaForm.get('caracteristica').setValue(caracteristica.get('caracteristica').value);
        this.caracteristicaForm.get('valor_und').setValue(caracteristica.get('valor_und').value);
        console.log(this.caracteristicaForm);
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
     * Pega o valor do item de ViewChildren por índice
     */
    public getNumeroMesaInput(index: any): void {
        console.log(this.numeroMesaInput.toArray()[index].value);
    }

    /**
     * Adiciona ao form do componente pai os campos relativos as características do produto.
     */
    private buildForm(): void {
        this.form.addControl('caracteristica', this.produto?.caracteristicas
            ? this.formBuilder.array(
                this.produto.caracteristicas.map(caracteristica =>
                    this.formBuilder.group({
                        id: caracteristica?.id,
                        caracteristica: caracteristica?.caracteristica,
                        valor_und: caracteristica?.valor_und
                    })
                )
            )
            : this.formBuilder.array([])
        );
        this.caracteristicaForm = this.formBuilder.group({
            id: null,
            caracteristica: null,
            valor_und: null
        });
        this.listaProdutoCaracteristica = new MatTableDataSource((this.form.get('caracteristica') as FormArray).controls);
    }

}
