export enum GridCampoFormato {
    TEXTO,
    NUMERO,
    DATA
}

export interface Grid {
    dados?: any;
    conf: GridConfiguracao;
}

export interface GridResultado {
    Resultado: Array<any>;
    Total: number;
}

export interface GridColunaGrupo {
    descricao: string,
    colspan: number
}

export interface GridConfiguracao {
    modelo: GridModelo;
    campos: Array<GridCampo>;
    grupos?: Array<GridColunaGrupo>;
    acoes?: Array<GridAcao>;
    filtros: Array<GridFiltro>;
}

export interface GridCampo {
    nome: string;
    descricao: string;
    edicao?: boolean;
    tipo?: GridCampoFormato;
    alinhamento?: string;
    template?: string;
}

export interface GridFiltro {
    id: string;
    text: string;
}

export interface GridAcao {
    nome: string;
    descricao?: string;
    icone?: string;
    template?: string;
}

export interface GridModelo {
    nome: string;
    descricao: string;
    rotaEdicao?: string;
    permiteInclusao: boolean;
}

export interface EventoAcao {
    nome: string;
    modelo: any;
}

export class FiltroGrid {
    public Pagina: number = 1;
    public RegistrosPorPagina: number = 20;
    public OrdemCampo: string;
    public OrdemCrescente: boolean;
    public AtributoFiltro: string;
    public ValorFiltro: string;
    public PaginaAlteracao: boolean = false;

    constructor() {
        this.RegistrosPorPagina = 20;;
        this.Pagina = 1;
    }

    public static getInstanciaPadrao(): FiltroGrid {
        let filtro = new FiltroGrid();
        filtro.Pagina = 1;
        filtro.RegistrosPorPagina = 20;

        return filtro;
    }
}

export class GridParamsPaginacao {
    public exibirEsquerda: boolean = false;
    public exibirDireita: boolean = false;
    public paginasTotais: number;
    public paginacaoAtual: number = 1;
    public paginasPorPaginacao: number = 5;
    public paginas: Array<any>;
}

export class GridParams {
    public paginaAtual: number;
    public registrosPorPagina: number;
    public registrosTotais: number;
    public paginacao: GridParamsPaginacao = (new GridParamsPaginacao());

    public filtro: FiltroGrid;
}
