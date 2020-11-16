import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ingrediente } from './ingrediente.model';


@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

    public ingredientes$: Observable<Ingrediente[]>;

    private ingredientesSubject: BehaviorSubject<Ingrediente[]> = new BehaviorSubject(null);

    constructor(
        private httpClient: HttpClient
    ) {
        this.ingredientes$ = this.ingredientesSubject.asObservable();
    }

    /**
     * Recupera e emite uma lista de ingredientes.
     * Esse método aqui não é exatamente necessário para este exemplo.
     * Só deixei ele aqui porque imagino que haverá um módulo de gerenciamento de ingredientes.
     */
    public getIngredientes(): void {
        this.getIngredientesPromise()
            .then(ingredientes => this.ingredientesSubject.next(ingredientes));
    }

    /**
     * Retorna uma promise de ingredientes.
     */
    public getIngredientesPromise(): Promise<Ingrediente[]> {
        const url = 'assets/ingredientes.json';
        return this.httpClient.get<any>(url)
            // Estou fazendo um pipe map aqui, pois o meu response é no seguinte formato:
            // { ingredientes: [] }
            // E nesse caso, eu quero emitir apenas o array, e não o objeto response retornado.
            .pipe(map(response => response.ingredientes)).toPromise();
    }
}
