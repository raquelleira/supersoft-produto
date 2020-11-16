import { Adicional } from 'src/app/shared/adicional/adicional.model';
import { Ingrediente } from 'src/app/shared/ingredientes/ingrediente.model';
import { ProdutoCaracteristicas } from './produto_caracteristicas.model';

interface ProdutoInterface {
    id: number;
    id_categoria: number;
    nome: string;
    preco_custo: number;
    preco_venda: number;
    medida: string;
    obs: string;
    foto: string | File;
    adicionais: Adicional[];
    caracteristicas: ProdutoCaracteristicas[];
    ingredientes: Ingrediente[];
}
export class Produto implements ProdutoInterface {
    public id: number;
    public id_categoria: number;
    public nome: string;
    public preco_custo: number;
    public preco_venda: number;
    public medida: string;
    public obs: string;
    public foto: string | File;
    public adicionais: Adicional[];
    public caracteristicas: ProdutoCaracteristicas[];
    public ingredientes: Ingrediente[];

    constructor({
        id,
        id_categoria,
        nome,
        preco_custo,
        preco_venda,
        medida,
        obs,
        foto,
        adicionais,
        caracteristicas,
        ingredientes
    }: {
        id?: number;
        id_categoria?: number;
        nome?: string;
        preco_custo?: number;
        preco_venda?: number;
        medida?: string;
        obs?: string;
        foto?: string | File;
        adicionais?: Adicional[];
        caracteristicas?: ProdutoCaracteristicas[];
        ingredientes?: Ingrediente[];
    }
    ){
        this.id = id;
        this.id_categoria = id_categoria;
        this.nome = nome;
        this.preco_custo = preco_custo;
        this.preco_venda = preco_venda;
        this.medida = medida;
        this.obs = obs;
        this.foto = foto;
        this.adicionais = adicionais;
        this.caracteristicas = caracteristicas;
        this.ingredientes = ingredientes;
    }
}
