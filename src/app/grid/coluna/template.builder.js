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
var common_1 = require("@angular/common");
var _ = require("lodash");
// referência http://stackoverflow.com/questions/38888008/how-can-i-use-create-dynamic-template-to-compile-dynamic-component-with-angular
var TemplateBuilder = (function () {
    function TemplateBuilder(compiler) {
        this.compiler = compiler;
        // this object is singleton - so we can use this as a cache
        this._cacheOfFactories = {};
    }
    TemplateBuilder.prototype.createComponent = function (template, campo, modelo) {
        var _this = this;
        var factory = this._cacheOfFactories[template];
        var type = compileToComponent(template, [], campo, modelo);
        var module = createComponentModule(type);
        return new Promise(function (resolve) {
            _this.compiler
                .compileModuleAndAllComponentsAsync(module)
                .then(function (moduleWithFactories) {
                factory = _.find(moduleWithFactories.componentFactories, { componentType: type });
                _this._cacheOfFactories[template] = factory;
                resolve(factory);
            });
        });
    };
    return TemplateBuilder;
}());
TemplateBuilder = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Compiler])
], TemplateBuilder);
exports.TemplateBuilder = TemplateBuilder;
function compileToComponent(template, directives, campo, modelo) {
    var RuntimeComponent = (function () {
        function RuntimeComponent() {
        }
        Object.defineProperty(RuntimeComponent.prototype, "campo", {
            get: function () {
                return campo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RuntimeComponent.prototype, "modelo", {
            get: function () {
                return modelo;
            },
            enumerable: true,
            configurable: true
        });
        return RuntimeComponent;
    }());
    RuntimeComponent = __decorate([
        core_1.Component({
            selector: 'runtimeComponent',
            template: template
        })
    ], RuntimeComponent);
    ;
    return RuntimeComponent;
}
function createComponentModule(componentType) {
    var RuntimeComponentModule = (function () {
        function RuntimeComponentModule() {
        }
        return RuntimeComponentModule;
    }());
    RuntimeComponentModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                componentType
            ],
        })
    ], RuntimeComponentModule);
    // a module for just this Type
    return RuntimeComponentModule;
}
//# sourceMappingURL=template.builder.js.map