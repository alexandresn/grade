"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var modelos_1 = require("../modelos");
var acoes_template_directive_1 = require("../acao/acoes-template.directive");
var filtros_template_directive_1 = require("../filtro/filtros-template.directive");
var interfaces_1 = require("../coluna/interfaces");
var colunas_template_directive_1 = require("../coluna/colunas-template.directive");
var grid_template_base_1 = require("../grid-view-edit/grid-template-base");
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
var GridViewListComponent = (function (_super) {
    __extends(GridViewListComponent, _super);
    function GridViewListComponent() {
        var _this = _super.call(this) || this;
        _this.ordemCrescente = true;
        _this.paginaAtual = 1;
        _this.registrosPorPagina = 25;
        _this.paginacao = (new modelos_1.GridParamsPaginacao());
        _this.autoCarregar = true;
        _this.colunaObj = [];
        _this.registros = new Array();
        _this.carregaPagina = new core_1.EventEmitter();
        _this.executaAcao = new core_1.EventEmitter();
        _this.onCelulaCriada = new core_1.EventEmitter();
        return _this;
    }
    GridViewListComponent.prototype.ngOnInit = function () {
        if (this.autoCarregar == true || this.autoCarregar.toString() == "true") {
            this.carregarPagina(1);
        }
    };
    GridViewListComponent.prototype.ngOnChanges = function (changes) {
        var propColunas = changes['colunaObj'];
        if (propColunas && propColunas.currentValue) {
            this.colunasAtivas = propColunas.currentValue.map(function (col) {
                if (col.tipo == 'NUMERO')
                    col.tipo = interfaces_1.ColunaTipo.NUMERO;
                else
                    col.tipo = interfaces_1.ColunaTipo.TEXTO;
                return col;
            });
        }
        var propRegistros = changes['registros'];
        if (propRegistros && propRegistros.currentValue) {
            this.registros = propRegistros.currentValue.Resultado;
            this.registrosTotais = propRegistros.currentValue.Total;
            if (propRegistros.currentValue.Pagina > 0)
                this.paginaAtual = propRegistros.currentValue.Pagina;
            this.paginacao.paginasTotais = Math.ceil(this.registrosTotais / this.registrosPorPagina);
            this.carregarPaginacao(this.paginaAtual);
        }
    };
    GridViewListComponent.prototype.ngAfterContentInit = function () {
        if (this.colunaConfig)
            this.colunasAtivas = this.colunaConfig.colunas || this.colunaObj;
        else
            this.colunasAtivas = this.colunaObj || [];
        if (this.acoesConfig)
            this.acoes = this.acoesConfig.acoes;
        if (this.filtrosConfig)
            this.filtros = this.filtrosConfig.filtros.map(function (item) { return { id: item.id, text: item.text }; });
    };
    Object.defineProperty(GridViewListComponent.prototype, "primeiroRegistroPagina", {
        get: function () {
            if (this.registrosTotais == 0)
                return this.registrosTotais;
            else
                return (this.paginaAtual - 1) * this.registrosPorPagina + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridViewListComponent.prototype, "ultimoRegistroPagina", {
        get: function () {
            var ultimoRegistro = this.primeiroRegistroPagina + this.registrosPorPagina;
            if (this.registrosTotais <= ultimoRegistro)
                return this.registrosTotais;
            else
                return ultimoRegistro - 1;
        },
        enumerable: true,
        configurable: true
    });
    // métodos de ordenação
    GridViewListComponent.prototype.getCampoOrdenacao = function (coluna) {
        return coluna.ordenacao || coluna.cammpo;
    };
    GridViewListComponent.prototype.ehCampoOrdenado = function (coluna) {
        if (this.ordemCampo == undefined || this.ordemCampo == '')
            return false;
        var campo = coluna.ordenacao || coluna.campo;
        return campo === this.ordemCampo;
    };
    GridViewListComponent.prototype.mudarTamanhoPagina = function ($event) {
        this.registrosPorPagina = $event;
        this.carregarPagina(1);
    };
    GridViewListComponent.prototype.carregarPagina = function (numero, paginaAlteracao) {
        this.paginaAtual = numero;
        var filtroGrid = new modelos_1.FiltroGrid();
        filtroGrid.Pagina = this.paginaAtual;
        filtroGrid.RegistrosPorPagina = this.registrosPorPagina;
        filtroGrid.AtributoFiltro = this.filtroSelecionado;
        filtroGrid.ValorFiltro = this.filtroValor;
        filtroGrid.PaginaAlteracao = paginaAlteracao ? this.booleanConvert(paginaAlteracao) : false; // identifica evento de alteração de página
        if (this.ordemCampo) {
            filtroGrid.OrdemCampo = this.ordemCampo;
            filtroGrid.OrdemCrescente = this.ordemCrescente;
        }
        this.carregaPagina.emit(filtroGrid);
    };
    GridViewListComponent.prototype.carregarPaginacao = function (numeroPagina) {
        var numeroPaginacao = Math.ceil(numeroPagina / this.paginacao.paginasPorPaginacao);
        var exibirEsquerda = this.paginaAtual > 1;
        var exibirDireita = this.paginacao.paginasTotais > this.paginaAtual;
        var primeiraPagina = (numeroPaginacao - 1) * this.paginacao.paginasPorPaginacao + 1;
        var ultimaPagina = primeiraPagina + this.paginacao.paginasPorPaginacao - 1;
        if (ultimaPagina > this.paginacao.paginasTotais)
            ultimaPagina = this.paginacao.paginasTotais;
        var pg = [];
        for (var index = primeiraPagina; index <= ultimaPagina; index++) {
            if (index == this.paginaAtual)
                pg.push({ numero: index, ativa: true });
            else
                pg.push({ numero: index, ativa: false });
        }
        this.paginacao.exibirEsquerda = exibirEsquerda;
        this.paginacao.exibirDireita = exibirDireita;
        this.paginacao.paginas = pg;
    };
    GridViewListComponent.prototype.avancarPaginacao = function () {
        this.carregarPagina(++this.paginaAtual, true);
    };
    GridViewListComponent.prototype.voltarPaginacao = function () {
        this.carregarPagina(--this.paginaAtual, true);
    };
    GridViewListComponent.prototype.ordernar = function (campo) {
        if (campo == this.ordemCampo)
            this.ordemCrescente = !this.ordemCrescente;
        else {
            this.ordemCrescente = true;
            this.ordemCampo = campo;
        }
        this.carregarPagina(1);
    };
    GridViewListComponent.prototype.executarAcao = function (nome, modelo) {
        this.executaAcao.emit({ nome: nome, modelo: modelo });
    };
    GridViewListComponent.prototype.celulaExibicaoCriada = function (vlr, col, reg, elem) {
        this.onCelulaCriada.emit({ valor: vlr, coluna: col, registro: reg, elementoHtml: elem });
    };
    GridViewListComponent.prototype.getColunaTipo = function (col) {
        return interfaces_1.ColunaTipo[col.tipo];
    };
    return GridViewListComponent;
}(grid_template_base_1.GridTemplateBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GridViewListComponent.prototype, "autoCarregar", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], GridViewListComponent.prototype, "colunaObj", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], GridViewListComponent.prototype, "registros", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GridViewListComponent.prototype, "descricao", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GridViewListComponent.prototype, "rotaEdicao", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], GridViewListComponent.prototype, "permiteInclusao", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GridViewListComponent.prototype, "atualizaPromise", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], GridViewListComponent.prototype, "alturaMinima", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GridViewListComponent.prototype, "carregaPagina", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GridViewListComponent.prototype, "executaAcao", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GridViewListComponent.prototype, "onCelulaCriada", void 0);
__decorate([
    core_1.ContentChild(colunas_template_directive_1.ColunasTemplateDirective),
    __metadata("design:type", colunas_template_directive_1.ColunasTemplateDirective)
], GridViewListComponent.prototype, "colunaConfig", void 0);
__decorate([
    core_1.ContentChild(acoes_template_directive_1.AcoesTemplateDirective),
    __metadata("design:type", acoes_template_directive_1.AcoesTemplateDirective)
], GridViewListComponent.prototype, "acoesConfig", void 0);
__decorate([
    core_1.ContentChild(filtros_template_directive_1.FiltrosTemplateDirective),
    __metadata("design:type", filtros_template_directive_1.FiltrosTemplateDirective)
], GridViewListComponent.prototype, "filtrosConfig", void 0);
GridViewListComponent = __decorate([
    core_1.Component({
        selector: 'grid-view-list',
        template: require('./grid-view-list.component.html')
    }),
    __metadata("design:paramtypes", [])
], GridViewListComponent);
exports.GridViewListComponent = GridViewListComponent;
//# sourceMappingURL=grid-view-list.component.js.map