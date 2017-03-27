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
var _ = require("lodash");
/**
 * Diretiva para máscara de moeda
 *
 * @export
 * @class CurrencyMaskDirective
 */
var CurrencyMaskDirective = (function () {
    function CurrencyMaskDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.maskedValue = '';
        this.change = new core_1.EventEmitter();
        this.currency = '$';
        this.digitPattern = /\d/g;
        this.formatadorNumeroPtBr = Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 });
    }
    CurrencyMaskDirective.prototype.ngOnInit = function () {
        this.$element = jQuery(this.elementRef.nativeElement);
        this.mask(this.$element.val());
        //this.change.emit({ valor: this.unmaskedValue });
    };
    CurrencyMaskDirective.prototype.click = function ($event) {
        var that = this;
        setTimeout((function (el) {
            that.mask($event.target.value);
            $event.target.unmaskedValue = that.unmaskedValue;
        }(this)), 1);
    };
    CurrencyMaskDirective.prototype.onKeyUp = function ($event) {
        this.mask($event.target.value);
        $event.target.unmaskedValue = this.unmaskedValue;
        this.change.emit($event);
    };
    CurrencyMaskDirective.prototype.mask = function (value) {
        this.unmaskedValue = this.getUnmaskedValue(value);
        this.maskedValue = this.getMaskedValue(this.unmaskedValue);
        this.renderer.setElementProperty(this.elementRef.nativeElement, 'value', this.maskedValue);
    };
    CurrencyMaskDirective.prototype.getUnmaskedValue = function (currentValue) {
        if (typeof currentValue == "number")
            return currentValue;
        var result = "";
        if (currentValue && currentValue.length > 0) {
            // Verifica se o valor digitado é negativo
            if (currentValue.indexOf('-') > -1) {
                result += '-';
            }
            var digits = currentValue.match(/\d/g);
            _.forEach(digits, function (value) {
                result += value;
            });
            result = result.substring(0, result.length - 2) + "." + result.substr(-2);
        }
        return parseFloat(result) || 0;
    };
    CurrencyMaskDirective.prototype.getMaskedValue = function (actualValue) {
        return this.formatadorNumeroPtBr.format(actualValue);
    };
    return CurrencyMaskDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CurrencyMaskDirective.prototype, "change", void 0);
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CurrencyMaskDirective.prototype, "click", null);
__decorate([
    core_1.HostListener('keyup', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CurrencyMaskDirective.prototype, "onKeyUp", null);
CurrencyMaskDirective = __decorate([
    core_1.Directive({
        selector: '[currency-mask]'
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], CurrencyMaskDirective);
exports.CurrencyMaskDirective = CurrencyMaskDirective;
//# sourceMappingURL=currency-mask.directive.js.map