interface AdicionalInterface {
    id: number;
    descricao: string;
    valor: number;
    inativo: string;
}

export class Adicional implements AdicionalInterface {

    public id: number;
    public descricao: string;
    public valor: number;
    public inativo: string;

    constructor({
        id,
        descricao,
        valor,
        inativo
    }: {
        id?: number;
        descricao?: string;
        valor?: number;
        inativo?: string;
    }) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.inativo = inativo;
    }
}
