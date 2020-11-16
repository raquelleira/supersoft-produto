interface CategoriaInterface {
    id: number;
    descricao: string;
}

export class Categoria implements CategoriaInterface {

    public id: number;
    public descricao: string;

    constructor({
        id,
        descricao
    }: {
        id?: number;
        descricao?: string;
    }) {
        this.id = id;
        this.descricao = descricao;
    }
}
