import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Produto } from '../../shared/produto.model';

@Component({
  selector: 'app-produto-imagem-form',
  templateUrl: './produto-imagem-form.component.html',
  styleUrls: ['./produto-imagem-form.component.scss']
})
export class ProdutoImagemFormComponent implements OnInit {

    @Input() public form: FormGroup;
    @Input() public produto: Produto;
    @ViewChild('imagemProduto') public imagemProduto: ElementRef<HTMLInputElement>;
    public urlFoto: string;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    /**
     * Init component view
     */
    public ngOnInit(): void {
        this.buildForm();
    }

    /**
     * Callback para arquivo alterado no componente de upload
     * @param {File} arquivo
     */
    public arquivoCarregado(arquivo: File): void {
        if (arquivo) {
            this.imagemProduto.nativeElement.style.display = 'none';
        } else {
            this.imagemProduto.nativeElement.style.display = 'inline';
        }
        this.form.get('foto').setValue(arquivo);
    }

    /**
     * Adiciona o campo relativo a foto ao form do produto
     */
    private buildForm(): void {
        this.form.addControl('foto', this.formBuilder.control(this.produto?.foto || null));
    }

}
