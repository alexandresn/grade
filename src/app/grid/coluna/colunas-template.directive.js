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
var interfaces_1 = require("./interfaces");
var coluna_text_directive_1 = require("./coluna-text.directive");
var coluna_select_directive_1 = require("./coluna-select.directive");
var coluna_date_directive_1 = require("./coluna-date.directive");
var coluna_numero_directive_1 = require("./coluna-numero.directive");
var coluna_html_directive_1 = require("./coluna-html.directive");
var coluna_template_directive_1 = require("./coluna-template.directive");
var ColunasTemplateDirective = (function () {
    function ColunasTemplateDirective(_viewRef) {
        this._viewRef = _viewRef;
        this.autoSize = false;
    }
    /**
     * Converte valor para booleano
     */
    ColunasTemplateDirective.prototype.booleanConvert = function (valor) {
        if (valor === null || valor === undefined || typeof valor === "boolean")
            return valor;
        return valor.toString() === "true";
    };
    ColunasTemplateDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        // concatena todos os elementos do temmplate em uma lista única utilizada na view            
        this.colunas = this.colunasSelect.map(function (col) { col.editavel = _this.booleanConvert(col.editavel); return col; }); // coluna do tipo select
        this.colunas = this.colunas.concat(this.colunasText.map(function (col) { col.editavel = _this.booleanConvert(col.editavel); return col; })); // colunas text
        this.colunas = this.colunas.concat(this.colunasDate.map(function (col) {
            col.editavel = _this.booleanConvert(col.editavel);
            // sobrescreve tipagem padrão DATA quando formatação definida for hora
            col.tipo = (col.formato == 'hora' ? interfaces_1.ColunaTipo.DATAHORA : interfaces_1.ColunaTipo.DATA);
            return col;
        })); // colunas date
        this.colunas = this.colunas.concat(this.colunasNumero.map(function (col) { col.editavel = _this.booleanConvert(col.editavel); return col; })); // colunas numero
        this.colunas = this.colunas.concat(this.colunasHTML.map(function (col) { col.ehHtml = true; return col; })); // colunas html
        this.colunas = this.colunas.concat(this.colunasTemplate.map(function (col) { return col; })); // colunas html
        //exibe somente
        this.colunas = this.colunas.filter(function (col) { return col.visivel == true; });
        // ordena colunas de acordo com template
        if (this._viewRef && this._viewRef.nativeElement) {
            var nos = this._viewRef.nativeElement.children;
            for (var index = 0; index < nos.length; index++) {
                var element = nos.item(index);
                var campo = element.getAttribute("titulo");
                this.colunas.filter(function (col) {
                    return col.titulo == campo;
                }).forEach(function (col) {
                    col.ordem = index;
                });
            }
            //ordena as colunas
            this.colunas = this.colunas.sort(function (a, b) {
                if (a.ordem < b.ordem)
                    return -1;
                else if (a.ordem > b.ordem)
                    return 1;
                else
                    return 0;
            });
            this.propriedadesAuto();
        }
    };
    ColunasTemplateDirective.prototype.propriedadesAuto = function () {
        var _this = this;
        var cont = this.colunas.length;
        this.colunas.forEach(function (col) {
            if (_this.booleanConvert(_this.autoSize))
                col.width = 90 / cont;
            switch (col.tipo) {
                case interfaces_1.ColunaTipo.NUMERO:
                    col.css = "text-right";
                    break;
                case interfaces_1.ColunaTipo.DATA:
                    col.css = "text-center";
                    break;
                default:
                    break;
            }
        });
    };
    return ColunasTemplateDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ColunasTemplateDirective.prototype, "autoSize", void 0);
__decorate([
    core_1.ContentChildren(coluna_text_directive_1.ColunaTextDirective),
    __metadata("design:type", core_1.QueryList)
], ColunasTemplateDirective.prototype, "colunasText", void 0);
__decorate([
    core_1.ContentChildren(coluna_select_directive_1.ColunaSelectDirective),
    __metadata("design:type", core_1.QueryList)
], ColunasTemplateDirective.prototype, "colunasSelect", void 0);
__decorate([
    core_1.ContentChildren(coluna_date_directive_1.ColunaDateDirective),
    __metadata("design:type", core_1.QueryList)
], ColunasTemplateDirective.prototype, "colunasDate", void 0);
__decorate([
    core_1.ContentChildren(coluna_numero_directive_1.ColunaNumeroDirective),
    __metadata("design:type", core_1.QueryList)
], ColunasTemplateDirective.prototype, "colunasNumero", void 0);
__decorate([
    core_1.ContentChildren(coluna_html_directive_1.ColunaHtmlDirective),
    __metadata("design:type", core_1.QueryList)
], ColunasTemplateDirective.prototype, "colunasHTML", void 0);
__decorate([
    core_1.ContentChildren(coluna_template_directive_1.ColunaTemplateComponent),
    __metadata("design:type", core_1.QueryList)
], ColunasTemplateDirective.prototype, "colunasTemplate", void 0);
ColunasTemplateDirective = __decorate([
    core_1.Directive({
        selector: 'colunas',
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ColunasTemplateDirective);
exports.ColunasTemplateDirective = ColunasTemplateDirective;
//# sourceMappingURL=colunas-template.directive.js.map