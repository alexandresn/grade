"use strict";
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
var PaginacaoComponent = (function () {
    function PaginacaoComponent() {
        this.paginacao = (new modelos_1.GridParamsPaginacao());
        this.onCarregarPagina = new core_1.EventEmitter();
    }
    PaginacaoComponent.prototype.ngOnInit = function () { };
    PaginacaoComponent.prototype.ngOnChanges = function (changes) {
        if (changes['data'] && changes['data'].currentValue) {
            var dados = changes['data'].currentValue;
            this.pagina = parseInt(dados.pagina);
            this.registrosTotais = parseInt(dados.registrosTotais);
            this.registrosPorPagina = parseInt(dados.registrosPorPagina);
            this.carregarPaginacao(this.pagina);
        }
    };
    Object.defineProperty(PaginacaoComponent.prototype, "primeiroRegistroPagina", {
        get: function () {
            if (this.registrosTotais == 0)
                return this.registrosTotais;
            else
                return (this.pagina - 1) * this.registrosPorPagina + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginacaoComponent.prototype, "ultimoRegistroPagina", {
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
    PaginacaoComponent.prototype.avancarPaginacao = function () {
        this.onCarregarPagina.emit(++this.pagina);
    };
    PaginacaoComponent.prototype.voltarPaginacao = function () {
        this.onCarregarPagina.emit(--this.pagina);
    };
    PaginacaoComponent.prototype.carregarPagina = function (pagina) {
        this.onCarregarPagina.emit(pagina);
    };
    PaginacaoComponent.prototype.carregarPaginacao = function (numeroPagina) {
        var numeroPaginacao = Math.ceil(numeroPagina / this.paginacao.paginasPorPaginacao);
        var exibirEsquerda = numeroPagina > 1;
        var exibirDireita = this.paginacao.paginasTotais > numeroPagina;
        var primeiraPagina = (numeroPaginacao - 1) * this.paginacao.paginasPorPaginacao + 1;
        var ultimaPagina = primeiraPagina + this.paginacao.paginasPorPaginacao - 1;
        if (ultimaPagina > this.paginacao.paginasTotais)
            ultimaPagina = this.paginacao.paginasTotais;
        var pg = [];
        for (var index = primeiraPagina; index <= ultimaPagina; index++) {
            if (index == numeroPagina)
                pg.push({ numero: index, ativa: true });
            else
                pg.push({ numero: index, ativa: false });
        }
        this.paginacao.paginasTotais = Math.ceil(this.registrosTotais / this.registrosPorPagina);
        this.paginacao.exibirEsquerda = exibirEsquerda;
        this.paginacao.exibirDireita = exibirDireita;
        this.paginacao.paginas = pg;
    };
    return PaginacaoComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PaginacaoComponent.prototype, "data", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PaginacaoComponent.prototype, "onCarregarPagina", void 0);
PaginacaoComponent = __decorate([
    core_1.Component({
        selector: 'paginacao',
        template: require('./paginacao.component.html')
    }),
    __metadata("design:paramtypes", [])
], PaginacaoComponent);
exports.PaginacaoComponent = PaginacaoComponent;
//# sourceMappingURL=paginacao.component.js.map