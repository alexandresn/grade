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
var ColunaBase = (function () {
    function ColunaBase(tipo) {
        this.visivel = true;
        this.tipo = tipo;
    }
    return ColunaBase;
}());
//Campos com o decorador @Input da classe base para quem for herdar
ColunaBase.baseInputs = ['titulo', 'campo', 'ordenacao', 'editavel', 'visivel'];
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaBase.prototype, "titulo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaBase.prototype, "campo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaBase.prototype, "ordenacao", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ColunaBase.prototype, "editavel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ColunaBase.prototype, "visivel", void 0);
exports.ColunaBase = ColunaBase;
//# sourceMappingURL=coluna-base.class.js.map