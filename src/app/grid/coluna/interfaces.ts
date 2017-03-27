export enum ColunaTipo {
    TEXTO,
    NUMERO,
    COMBO,
    DATA,
    DATAHORA,
    HTML,
    TEMPLATE
}

export interface IGridColuna {
    titulo: string;
    campo: string;
    ordenacao: string;
    tipo: ColunaTipo;
    editavel: boolean;
    link?: string;
}

export interface IGridColunaText extends IGridColuna {
    titulo: string;
    campo: string;
    formato: string;
    editavel: boolean;
    css: string;
}

export interface IGridColunaDate extends IGridColuna {
}

export interface IGridColunaSelect {
    modelo: string;
    dados: string;
    valor: string;
    texto: string;
    chaveFonteDados: string;
}

export interface IRegistroGridEdit {
    Id: number;
    incluirPromise?: any;
    alterarPromise?: any;
    excluirPromise?: any;
}