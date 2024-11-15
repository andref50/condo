export interface IApartamento {
    id: string;
    url: string;
    endereco: string;
    valor: number;
    condominio: number;
    reforma: string;
    rating: string;
    fav: boolean;
    imgs: string[];
}

export class Apartamento implements IApartamento {
    id: string;
    url: string;
    endereco: string;
    valor: number;
    condominio: number;
    reforma: string;
    rating: string;
    fav: boolean;
    imgs: string[];

    constructor(
        id: string,
        url: string,
        endereco: string,
        valor: number,
        condominio: number,
        reforma: string,
        rating: string,
        favorito: boolean,
        imgs: string[]
    ) {
        this.id = id;
        this.url = url
        this.endereco = endereco;
        this.valor = valor;
        this.condominio = condominio;
        this.reforma = reforma;
        this.rating = rating;
        this.fav = favorito
        this.imgs = imgs
    }
}