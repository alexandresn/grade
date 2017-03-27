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
var FiltroPropriedadeDirective = (function () {
    function FiltroPropriedadeDirective() {
    }
    return FiltroPropriedadeDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FiltroPropriedadeDirective.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FiltroPropriedadeDirective.prototype, "text", void 0);
FiltroPropriedadeDirective = __decorate([
    core_1.Directive({
        selector: 'filtro'
    })
], FiltroPropriedadeDirective);
exports.FiltroPropriedadeDirective = FiltroPropriedadeDirective;
//# sourceMappingURL=filtro-propriedade.directive.js.map