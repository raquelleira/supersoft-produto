import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-imagem-upload',
  templateUrl: './imagem-upload.component.html',
  styleUrls: ['./imagem-upload.component.scss']
})
export class ImagemUploadComponent implements OnInit {

    public imagens: File[] = [];
    @Output() public arquivoCarregado: EventEmitter<File> = new EventEmitter();

    constructor() { }

    /**
     * Init component view
     */
    public ngOnInit(): void {
    }

    /**
     * Adiciona uma imagem
     * @param {any} event
     */
    public adicionarImagem(event: any): void {
        if (this.imagens.length === 0) {
            this.imagens.push(...event.addedFiles);
        }
        this.arquivoCarregado.emit(this.imagens[0]);
    }

    /**
     * Remove uma imagem
     * @param {any} event
     */
    public removerImagem(event: any): void {
        this.imagens.splice(this.imagens.indexOf(event), 1);
        this.arquivoCarregado.emit(null);
    }

}
