import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { GridParamsPaginacao } from '../modelos';

@Component({
    selector: 'paginacao',
    templateUrl: './paginacao.component.html'
})
export class PaginacaoComponent implements OnInit, OnChanges {
    private paginacao: GridParamsPaginacao = (new GridParamsPaginacao());
    private pagina: number;
    private registrosTotais: number;
    private registrosPorPagina: number;

    @Input() data: any;
    @Output() onCarregarPagina: EventEmitter<number> = new EventEmitter<number>();

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data'] && changes['data'].currentValue) {
            let dados = changes['data'].currentValue;

            this.pagina = parseInt(dados.pagina);
            this.registrosTotais = parseInt(dados.registrosTotais);
            this.registrosPorPagina = parseInt(dados.registrosPorPagina);

            this.carregarPaginacao(this.pagina);
        }
    }

    get primeiroRegistroPagina() {
        if (this.registrosTotais == 0)
            return this.registrosTotais;
        else
            return (this.pagina - 1) * this.registrosPorPagina + 1;
    }

    get ultimoRegistroPagina() {
        let ultimoRegistro = this.primeiroRegistroPagina + this.registrosPorPagina;

        if (this.registrosTotais <= ultimoRegistro)
            return this.registrosTotais;
        else
            return ultimoRegistro - 1;
    }

    avancarPaginacao() {
        this.onCarregarPagina.emit(++this.pagina);
    }

    voltarPaginacao() {
        this.onCarregarPagina.emit(--this.pagina);
    }

    carregarPagina(pagina: number) {
        this.onCarregarPagina.emit(pagina)
    }

    carregarPaginacao(numeroPagina: number) {
        let numeroPaginacao = Math.ceil(numeroPagina / this.paginacao.paginasPorPaginacao);
        let exibirEsquerda = numeroPagina > 1;
        let exibirDireita = this.paginacao.paginasTotais > numeroPagina;
        let primeiraPagina = (numeroPaginacao - 1) * this.paginacao.paginasPorPaginacao + 1;
        let ultimaPagina = primeiraPagina + this.paginacao.paginasPorPaginacao - 1;
        if (ultimaPagina > this.paginacao.paginasTotais)
            ultimaPagina = this.paginacao.paginasTotais;

        let pg = [];

        for (let index = primeiraPagina; index <= ultimaPagina; index++) {
            if (index == numeroPagina)
                pg.push({ numero: index, ativa: true });
            else
                pg.push({ numero: index, ativa: false });
        }

        this.paginacao.paginasTotais = Math.ceil(this.registrosTotais / this.registrosPorPagina);
        this.paginacao.exibirEsquerda = exibirEsquerda;
        this.paginacao.exibirDireita = exibirDireita;
        this.paginacao.paginas = pg;
    }
}