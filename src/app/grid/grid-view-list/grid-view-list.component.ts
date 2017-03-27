import { Component, Directive, OnInit, OnChanges, Input, Output, EventEmitter, ContentChild, ContentChildren, QueryList, AfterContentInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//import { BlockUI, Modal } from './../../modal';
import { GridConfiguracao, FiltroGrid, EventoAcao, GridParams, GridParamsPaginacao } from '../modelos';

import { AcaoComandoDirective } from '../acao/acao-comando.directive';
import { AcoesTemplateDirective } from '../acao/acoes-template.directive';

import { FiltroPropriedadeDirective } from '../filtro/filtro-propriedade.directive';
import { FiltrosTemplateDirective } from '../filtro/filtros-template.directive';

import { ColunaBase } from '../coluna/coluna-base.class';
import { ColunaTipo } from '../coluna/interfaces';
import { ColunaTextDirective } from '../coluna/coluna-text.directive';
import { ColunaNumeroDirective } from '../coluna/coluna-numero.directive';
import { ColunasTemplateDirective } from '../coluna/colunas-template.directive';

import { ColunaDateDirective } from '../coluna/coluna-date.directive';

import { GridTemplateBase } from './grid-template-base';
import { TdTemplate } from '../coluna/td-template.component';

/**
 * Constroí grid-tabela para visualização de dados
 *
 * Propridades
 *  campo: nome do campo da propriedade do objeto de onde deve ser originada a infroamação
 *  titulo: texto a ser exibido no cabeçalho da coluna
 *  ordenacao: nome do campo a ser utilizado para aplicar a ordenação. Valor deve ser informado, em casos de projeção de consulta em um modelo DTO. Valor deve respeitar estrutura IQUeryrable utilizada pelo consulta.  
 * 
 * ### Usage
 * 
 *  ```typescript
 * @Component({
 *      selector: "pagina",
 *      directives: [GRIDVIEWLIST_DIRECTIVES],
 *      template: ` <grid-view-list [registros]="dados" [atualizaPromise]="atualizando" [autoCarregar]="true" (carregaPagina)="onCarregar($event)">
                <colunas>
                    <coluna-texto titulo="" campo="" ordenacao=""></coluna-texto>                    
                    <coluna-data titulo="" campo=""  ordenacao=""></coluna-data>                    
                    <coluna-numero titulo="" campo=""  ordenacao=""></coluna-numero>
                </colunas>                
            </grid-view-list>`
 *  })
 * 
 * class GenericComp {
 *  dados: any[];
 *  atualizando:any;
 *  
 *  onCarregar(filtro:FiltroGrid) { 
 *      // comportamento realizado ao selecionar página
 *      atualizando = http.get(url).subscribe(...);  
 *  }  
 * }
 *  ```
 */
@Component({
    selector: 'grade',
    templateUrl: './grid-view-list.component.html',
    styleUrls: ['./grid-view-list.component.css']
})
export class GridViewListComponent extends GridTemplateBase implements OnInit, OnChanges, AfterContentInit {
    private ordemCampo: string;
    private ordemCrescente: boolean = true;

    private paginaAtual = 1;
    private registrosPorPagina: number = 25;
    private registrosTotais: number;

    private paginacao: GridParamsPaginacao = (new GridParamsPaginacao());

    private filtroSelecionado: string;
    private filtroValor: string;

    private colunasAtivas: any[];
    private acoes: AcaoComandoDirective[];
    private filtros: FiltroPropriedadeDirective[];

    @Input() autoCarregar: boolean = true;
    @Input() colunaObj: any[] = [];
    @Input() registros: Array<any> = new Array<any>();
    @Input() descricao: string;
    @Input() rotaEdicao: string;
    @Input() permiteInclusao: boolean;
    @Input() atualizaPromise: any;
    @Input() alturaMinima: number;
    @Output() carregaPagina: EventEmitter<FiltroGrid> = new EventEmitter<FiltroGrid>();
    @Output() executaAcao: EventEmitter<EventoAcao> = new EventEmitter<EventoAcao>();
    @Output() onCelulaCriada: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(ColunasTemplateDirective) colunaConfig: ColunasTemplateDirective;
    @ContentChild(AcoesTemplateDirective) acoesConfig: AcoesTemplateDirective;
    @ContentChild(FiltrosTemplateDirective) filtrosConfig: FiltrosTemplateDirective;

    constructor() {
        super();
    }

    ngOnInit() {
        if (this.autoCarregar == true || this.autoCarregar.toString() == "true") {
            this.carregarPagina(1);
        }
    }

    ngOnChanges(changes: any) {
        let propColunas = changes['colunaObj'];
        if (propColunas && propColunas.currentValue) {
            this.colunasAtivas = propColunas.currentValue.map(col => {
                if (col.tipo == 'NUMERO')
                    col.tipo = ColunaTipo.NUMERO;
                else
                    col.tipo = ColunaTipo.TEXTO;

                return col;
            });
        }

        let propRegistros = changes['registros'];
        if (propRegistros && propRegistros.currentValue) {
            this.registros = propRegistros.currentValue.Resultado;
            this.registrosTotais = propRegistros.currentValue.Total;
            if (propRegistros.currentValue.Pagina > 0) this.paginaAtual = propRegistros.currentValue.Pagina;
            this.paginacao.paginasTotais = Math.ceil(this.registrosTotais / this.registrosPorPagina);
            this.carregarPaginacao(this.paginaAtual);
        }
    }

    ngAfterContentInit() {
        if (this.colunaConfig)
            this.colunasAtivas = this.colunaConfig.colunas || this.colunaObj;
        else
            this.colunasAtivas = this.colunaObj || [];

        if (this.acoesConfig)
            this.acoes = this.acoesConfig.acoes;

        if (this.filtrosConfig)
            this.filtros = this.filtrosConfig.filtros.map<any>(item => { return { id: item.id, text: item.text } });
    }

    get primeiroRegistroPagina() {
        if (this.registrosTotais == 0)
            return this.registrosTotais;
        else
            return (this.paginaAtual - 1) * this.registrosPorPagina + 1;
    }

    get ultimoRegistroPagina() {
        let ultimoRegistro = this.primeiroRegistroPagina + this.registrosPorPagina;

        if (this.registrosTotais <= ultimoRegistro)
            return this.registrosTotais;
        else
            return ultimoRegistro - 1;
    }

    // métodos de ordenação
    getCampoOrdenacao(coluna){
        return coluna.ordenacao || coluna.cammpo;
    }

    ehCampoOrdenado(coluna){
        if (this.ordemCampo == undefined || this.ordemCampo == '')
            return false;

        var campo = coluna.ordenacao || coluna.campo;
        return campo === this.ordemCampo;
    }

    mudarTamanhoPagina($event: any) {
        this.registrosPorPagina = $event;
        this.carregarPagina(1);
    }

    carregarPagina(numero: number, paginaAlteracao?:boolean) {
        this.paginaAtual = numero;
        var filtroGrid = new FiltroGrid();
        filtroGrid.Pagina = this.paginaAtual;
        filtroGrid.RegistrosPorPagina = this.registrosPorPagina;
        filtroGrid.AtributoFiltro = this.filtroSelecionado;
        filtroGrid.ValorFiltro = this.filtroValor;
        filtroGrid.PaginaAlteracao = paginaAlteracao ?  this.booleanConvert(paginaAlteracao) : false; // identifica evento de alteração de página
        if (this.ordemCampo) {
            filtroGrid.OrdemCampo = this.ordemCampo;
            filtroGrid.OrdemCrescente = this.ordemCrescente;
        }
        this.carregaPagina.emit(filtroGrid);
    }

    carregarPaginacao(numeroPagina: number) {
        let numeroPaginacao = Math.ceil(numeroPagina / this.paginacao.paginasPorPaginacao);
        let exibirEsquerda = this.paginaAtual > 1;
        let exibirDireita = this.paginacao.paginasTotais > this.paginaAtual;
        let primeiraPagina = (numeroPaginacao - 1) * this.paginacao.paginasPorPaginacao + 1;
        let ultimaPagina = primeiraPagina + this.paginacao.paginasPorPaginacao - 1;
        if (ultimaPagina > this.paginacao.paginasTotais)
            ultimaPagina = this.paginacao.paginasTotais;

        let pg = [];

        for (let index = primeiraPagina; index <= ultimaPagina; index++) {
            if (index == this.paginaAtual)
                pg.push({ numero: index, ativa: true });
            else
                pg.push({ numero: index, ativa: false });
        }

        this.paginacao.exibirEsquerda = exibirEsquerda;
        this.paginacao.exibirDireita = exibirDireita;
        this.paginacao.paginas = pg;
    }

    avancarPaginacao() {
        this.carregarPagina(++this.paginaAtual, true);
    }

    voltarPaginacao() {
        this.carregarPagina(--this.paginaAtual, true);
    }

    ordernar(campo: string) {
        if (campo == this.ordemCampo)
            this.ordemCrescente = !this.ordemCrescente;
        else {
            this.ordemCrescente = true;
            this.ordemCampo = campo;
        }

        this.carregarPagina(1);
    }

    executarAcao(nome: string, modelo: any) {
        this.executaAcao.emit({ nome: nome, modelo: modelo });
    }

    celulaExibicaoCriada(vlr: string, col: any, reg: any, elem: any) {
        this.onCelulaCriada.emit({ valor: vlr, coluna: col, registro: reg, elementoHtml: elem });
    }

    private getColunaTipo(col: ColunaBase): any {
        return ColunaTipo[col.tipo];
    }
}