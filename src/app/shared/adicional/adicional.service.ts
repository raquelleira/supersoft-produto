import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Adicional } from './adicional.model';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {

    public adicionais$: Observable<Adicional[]>;

    private adicionaisSubject: BehaviorSubject<Adicional[]> = new BehaviorSubject(null);

    constructor(
        private httpClient: HttpClient
    ) {
        this.adicionais$ = this.adicionaisSubject.asObservable();
    }

    /**
     * Recupera e emite uma lista de adicionais.
     * Esse método aqui não é exatamente necessário para este exemplo.
     * Só deixei ele aqui porque imagino que haverá um módulo de gerenciamento de Adicionais.
     */
    public getAdicionais(): void {
        this.getAdicionaisPromise()
            .then(adicionais => this.adicionaisSubject.next(adicionais));
    }

    /**
     * Retorna uma promise de adicionais.
     */
    public getAdicionaisPromise(): Promise<Adicional[]> {
        const url = 'assets/adicionais.json';
        return this.httpClient.get<any>(url)
            // Estou fazendo um pipe map aqui, pois o meu response é no seguinte formato:
            // { adicionais: [] }
            // E nesse caso, eu quero emitir apenas o array, e não o objeto response retornado.
            .pipe(map(response => response.adicionais)).toPromise();
    }

    /**
     * Cria um adicional e emite uma lista de adicionais atualizada.
     * NA PRATICA: Esse método deveria chamar uma API pra criar um adicional, e logo após isso, fazer um refresh da lista
     * Aqui é só pra demonstrar o broadcast da lista quando um novo adicional é criado.
     */
    public criarAdicional(adicional: Adicional): Promise<any> {
        adicional.id = Math.floor(Math.random() * 100);
        const adicionais = this.adicionaisSubject.value;
        adicionais.push(adicional);
        this.adicionaisSubject.next(adicionais);
        return Promise.resolve();
    }
}
