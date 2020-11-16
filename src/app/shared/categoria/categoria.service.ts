import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

    public categorias$: Observable<Categoria[]>;

    private categoriasSubject: BehaviorSubject<Categoria[]> = new BehaviorSubject(null);

    constructor(
        private httpClient: HttpClient
    ) {
        this.categorias$ = this.categoriasSubject.asObservable();
    }

    /**
     * Recupera e emite uma lista de categorias.
     * Esse método aqui não é exatamente necessário para este exemplo.
     * Só deixei ele aqui porque imagino que haverá um módulo de gerenciamento de Categorias.
     */
    public getCategorias(): void {
        this.getCategoriasPromise()
            .then(categorias => this.categoriasSubject.next(categorias));
    }

    /**
     * Retorna uma promise de categorias.
     */
    public getCategoriasPromise(): Promise<Categoria[]> {
        const url = 'assets/categorias.json';
        return this.httpClient.get<any>(url)
            // Estou fazendo um pipe map aqui, pois o meu response é no seguinte formato:
            // { categorias: [] }
            // E nesse caso, eu quero emitir apenas o array, e não o objeto response retornado.
            .pipe(map(response => response.categorias)).toPromise();
    }
}
