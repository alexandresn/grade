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
var AcaoComandoDirective = (function () {
    function AcaoComandoDirective() {
    }
    return AcaoComandoDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AcaoComandoDirective.prototype, "nome", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AcaoComandoDirective.prototype, "descricao", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AcaoComandoDirective.prototype, "icone", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AcaoComandoDirective.prototype, "condicaoPropriedade", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AcaoComandoDirective.prototype, "condicaoValor", void 0);
AcaoComandoDirective = __decorate([
    core_1.Directive({
        selector: 'acao'
    })
], AcaoComandoDirective);
exports.AcaoComandoDirective = AcaoComandoDirective;
//# sourceMappingURL=acao-comando.directive.js.map