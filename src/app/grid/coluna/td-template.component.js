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
var template_builder_1 = require("./template.builder");
var TdTemplate = (function () {
    function TdTemplate(_templateBuilder) {
        this._templateBuilder = _templateBuilder;
    }
    TdTemplate.prototype.refreshContent = function () {
        var _this = this;
        this._templateBuilder
            .createComponent(this.template, this.campo, this.modelo)
            .then(function (factory) {
            // Target will instantiate and inject component (we'll keep reference to it)
            _this.componentRef = _this
                .dynamicTarget
                .createComponent(factory);
            // let's inject @Inputs to component instance
            var component = _this.componentRef.instance;
        });
    };
    TdTemplate.prototype.ngOnInit = function () {
    };
    TdTemplate.prototype.ngAfterViewInit = function () {
        this.refreshContent();
    };
    return TdTemplate;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TdTemplate.prototype, "template", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TdTemplate.prototype, "campo", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TdTemplate.prototype, "modelo", void 0);
__decorate([
    core_1.ViewChild('container', { read: core_1.ViewContainerRef }),
    __metadata("design:type", Object)
], TdTemplate.prototype, "dynamicTarget", void 0);
TdTemplate = __decorate([
    core_1.Component({
        selector: 'td-template',
        template: '<div #container></div>'
    }),
    __metadata("design:paramtypes", [template_builder_1.TemplateBuilder])
], TdTemplate);
exports.TdTemplate = TdTemplate;
//# sourceMappingURL=td-template.component.js.map