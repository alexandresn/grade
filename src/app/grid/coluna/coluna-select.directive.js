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
var coluna_base_class_1 = require("./coluna-base.class");
var interfaces_1 = require("./interfaces");
var ColunaSelectDirective = (function (_super) {
    __extends(ColunaSelectDirective, _super);
    function ColunaSelectDirective() {
        return _super.call(this, interfaces_1.ColunaTipo.COMBO) || this;
    }
    return ColunaSelectDirective;
}(coluna_base_class_1.ColunaBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaSelectDirective.prototype, "formato", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaSelectDirective.prototype, "css", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaSelectDirective.prototype, "modelo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaSelectDirective.prototype, "dados", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaSelectDirective.prototype, "valor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaSelectDirective.prototype, "texto", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaSelectDirective.prototype, "chaveFonteDados", void 0);
ColunaSelectDirective = __decorate([
    core_1.Directive({
        selector: 'coluna-select',
        inputs: coluna_base_class_1.ColunaBase.baseInputs.slice()
    }),
    __metadata("design:paramtypes", [])
], ColunaSelectDirective);
exports.ColunaSelectDirective = ColunaSelectDirective;
//# sourceMappingURL=coluna-select.directive.js.map