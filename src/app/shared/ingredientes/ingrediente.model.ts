interface IngredienteInterface {
    id: number;
    descricao: string;
}

export class Ingrediente implements IngredienteInterface {
    public id: number;
    public descricao: string;

    constructor({
        id,
        descricao
    }: {
        id?: number;
        descricao?: string;
    }
    ){
        this.id = id;
        this.descricao = descricao;
    }
}
