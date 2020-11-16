interface ProdutoCaracteristicasInterface{
    id: number;
    caracteristica: string;
    valor_und: number;
}

export class ProdutoCaracteristicas implements ProdutoCaracteristicasInterface {
    public id: number;
    public caracteristica: string;
    public valor_und: number;

    constructor({
        id,
        caracteristica,
        valor_und
    }: {
        id?: number;
        id_produto?: number;
        caracteristica?: string;
        valor_und?: number;
    }
    ){
        this.id = id;
        this.caracteristica = caracteristica;
        this.valor_und = valor_und;
    }
}
