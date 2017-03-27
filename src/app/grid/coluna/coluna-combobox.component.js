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
var ColunaComboboxComponent = (function (_super) {
    __extends(ColunaComboboxComponent, _super);
    function ColunaComboboxComponent() {
        var _this = _super.call(this, interfaces_1.ColunaTipo.COMBO) || this;
        _this.dados = new Array();
        _this.onSelecaoItem = new core_1.EventEmitter();
        _this.modelo = null;
        return _this;
    }
    ColunaComboboxComponent.prototype.setCampo = function ($event) {
        var obj = {};
        obj[this.propriedadeValor] = $event.id;
        obj[this.propriedadeTexto] = $event.text;
        this.onSelecaoItem.emit(obj);
    };
    return ColunaComboboxComponent;
}(coluna_base_class_1.ColunaBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ColunaComboboxComponent.prototype, "obj", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ColunaComboboxComponent.prototype, "modelo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaComboboxComponent.prototype, "propriedadeTexto", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaComboboxComponent.prototype, "propriedadeValor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ColunaComboboxComponent.prototype, "dados", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ColunaComboboxComponent.prototype, "onSelecaoItem", void 0);
ColunaComboboxComponent = __decorate([
    core_1.Component({
        selector: 'coluna-select2',
        template: "<select2 [(ngModel)]=\"modelo\" [data]=\"dados\" [multiple]=\"false\" [placeholder]=\"'Selecione'\" (onSelecaoItem)=\"setCampo($event)\"></select2>",
        inputs: coluna_base_class_1.ColunaBase.baseInputs.slice()
    }),
    __metadata("design:paramtypes", [])
], ColunaComboboxComponent);
exports.ColunaComboboxComponent = ColunaComboboxComponent;
//# sourceMappingURL=coluna-combobox.component.js.map