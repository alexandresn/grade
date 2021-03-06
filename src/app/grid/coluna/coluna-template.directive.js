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
var ColunaTemplateComponent = (function (_super) {
    __extends(ColunaTemplateComponent, _super);
    function ColunaTemplateComponent() {
        return _super.call(this, interfaces_1.ColunaTipo.TEMPLATE) || this;
    }
    ColunaTemplateComponent.prototype.ngAfterContentInit = function () {
    };
    return ColunaTemplateComponent;
}(coluna_base_class_1.ColunaBase));
__decorate([
    core_1.ContentChild(core_1.TemplateRef),
    __metadata("design:type", Object)
], ColunaTemplateComponent.prototype, "itemTmpl", void 0);
ColunaTemplateComponent = __decorate([
    core_1.Component({
        selector: 'coluna-template',
        inputs: coluna_base_class_1.ColunaBase.baseInputs.slice(),
        template: ''
    }),
    __metadata("design:paramtypes", [])
], ColunaTemplateComponent);
exports.ColunaTemplateComponent = ColunaTemplateComponent;
//# sourceMappingURL=coluna-template.directive.js.map