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
/**
 * Coluna do Grid para um template HTML
 *
 * ### Usage
 *
 *  ```typescript
 *
 *  <coluna-html titulo="" campo=""></coluna-html>
 *
 *  ```
 */
var ColunaHtmlDirective = (function (_super) {
    __extends(ColunaHtmlDirective, _super);
    function ColunaHtmlDirective(_elementRef, _viewContainerRef, _renderer) {
        var _this = _super.call(this, interfaces_1.ColunaTipo.HTML) || this;
        _this._elementRef = _elementRef;
        _this._viewContainerRef = _viewContainerRef;
        _this._renderer = _renderer;
        return _this;
    }
    ColunaHtmlDirective.prototype.ngOnInit = function () {
    };
    ColunaHtmlDirective.prototype.ngAfterViewInit = function () {
    };
    ColunaHtmlDirective.prototype.ngAfterContentInit = function () {
        //this.template = `<span [ngClass]="{'label bg-success': modelo.Tipo == 'C', 'label bg-danger': modelo.Tipo == 'D'}">{{modelo.Tipo}}</span>`; 
        //this.template = this._elementRef.nativeElement.innerHTML;
        this.template = this.html;
    };
    ColunaHtmlDirective.prototype.ngAfterContentChecked = function () {
    };
    return ColunaHtmlDirective;
}(coluna_base_class_1.ColunaBase));
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ColunaHtmlDirective.prototype, "ehHtml", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaHtmlDirective.prototype, "css", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaHtmlDirective.prototype, "template", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ColunaHtmlDirective.prototype, "html", void 0);
ColunaHtmlDirective = __decorate([
    core_1.Component({
        selector: 'coluna-html',
        template: '<ng-content></ng-content>',
        inputs: coluna_base_class_1.ColunaBase.baseInputs.slice()
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.ViewContainerRef, core_1.Renderer])
], ColunaHtmlDirective);
exports.ColunaHtmlDirective = ColunaHtmlDirective;
//# sourceMappingURL=coluna-html.directive.js.map