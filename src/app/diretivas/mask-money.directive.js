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
var forms_1 = require("@angular/forms");
var _ = require("lodash");
var noop = function () { };
exports.MASK_MONEY_DIRECTIVE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MaskMoneyDirective; }),
    multi: true
};
var MaskMoneyDirective = (function () {
    function MaskMoneyDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.innerValue = '';
        this.sinalDigitado = '';
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.masked = new core_1.EventEmitter();
        this.formatadorNumeroPtBr = Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 });
    }
    MaskMoneyDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    MaskMoneyDirective.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    MaskMoneyDirective.prototype.focus = function (value) {
        var that = this;
        setTimeout(function () { that.elementRef.nativeElement.selectionStart = that.elementRef.nativeElement.selectionEnd = value.length; }, 0);
    };
    MaskMoneyDirective.prototype.blur = function () {
        this.onTouchedCallback();
    };
    MaskMoneyDirective.prototype.input = function (value) {
        var unmaskedValue = this.getUnmaskedValue(value);
        //let maskedValue = this.getMaskedValue(unmaskedValue);
        //value = unmaskedValue.toFixed(2);
        this.writeValue(value);
        this.onTouchedCallback();
        this.onChangeCallback(unmaskedValue);
    };
    MaskMoneyDirective.prototype.writeValue = function (value) {
        var unmaskedValue = this.getUnmaskedValue(value);
        var maskedValue = this.getMaskedValue(unmaskedValue);
        if (unmaskedValue == 0 && this.sinalDigitado == '-')
            maskedValue = this.sinalDigitado + maskedValue;
        this.innerValue = maskedValue;
        value = this.innerValue;
        this.renderer.setElementProperty(this.elementRef.nativeElement, 'value', this.innerValue);
        this.masked.emit(this.innerValue);
    };
    MaskMoneyDirective.prototype.getUnmaskedValue = function (currentValue) {
        if (typeof currentValue == "number")
            return currentValue;
        var result = "";
        if (currentValue && currentValue.length > 0) {
            // Verifica se o valor digitado é negativo
            if (currentValue.indexOf('-') > -1) {
                this.sinalDigitado = '-';
                result = this.sinalDigitado;
            }
            // Verifica se o valor digitado é positivo
            if (currentValue.indexOf('+') > -1) {
                this.sinalDigitado = '';
                result = this.sinalDigitado;
            }
            var digits = currentValue.match(/\d/g);
            _.forEach(digits, function (value) {
                result += value;
            });
            result = result.substring(0, result.length - 2) + "." + result.substr(-2);
        }
        return parseFloat(result) || 0;
    };
    MaskMoneyDirective.prototype.getMaskedValue = function (actualValue) {
        return this.formatadorNumeroPtBr.format(actualValue);
    };
    return MaskMoneyDirective;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MaskMoneyDirective.prototype, "masked", void 0);
__decorate([
    core_1.HostListener('click', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaskMoneyDirective.prototype, "focus", null);
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaskMoneyDirective.prototype, "blur", null);
__decorate([
    core_1.HostListener('keyup', ['$event.target.value']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaskMoneyDirective.prototype, "input", null);
MaskMoneyDirective = __decorate([
    core_1.Directive({
        selector: '[ngModel][mask-money]',
        // host: {
        //     "(input)": "input($event.target.value)",
        //     "(blur)": "blur()"
        // },
        providers: [exports.MASK_MONEY_DIRECTIVE_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], MaskMoneyDirective);
exports.MaskMoneyDirective = MaskMoneyDirective;
//# sourceMappingURL=mask-money.directive.js.map