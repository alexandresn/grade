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
var HighlightClassDirective = (function () {
    function HighlightClassDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this._defaultClass = 'active';
        this._hightlightClassOnSelect = 'active';
    }
    Object.defineProperty(HighlightClassDirective.prototype, "defaultClass", {
        get: function () {
            return this.highlightClass || this._defaultClass;
        },
        set: function (className) {
            this._defaultClass = className || this._defaultClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HighlightClassDirective.prototype, "hightlightClassOnSelect", {
        set: function (className) {
            this._hightlightClassOnSelect = className || this._hightlightClassOnSelect;
        },
        enumerable: true,
        configurable: true
    });
    HighlightClassDirective.prototype.onClick = function () {
        this.selected();
    };
    HighlightClassDirective.prototype.onMouseEnter = function () {
        this.highlight(this.defaultClass, true);
    };
    HighlightClassDirective.prototype.onMouseLeave = function () {
        this.highlight(this.defaultClass, false);
    };
    HighlightClassDirective.prototype.highlight = function (className, hover) {
        if (hover)
            this.renderer.setElementClass(this.el.nativeElement, className, hover);
        else
            this.renderer.setElementClass(this.el.nativeElement, className, hover);
    };
    HighlightClassDirective.prototype.selected = function () {
        if (!this.el.nativeElement.classList.contains('st-selected'))
            this.renderer.setElementClass(this.el.nativeElement, "st-selected", true);
        else
            this.renderer.setElementClass(this.el.nativeElement, "st-selected", false);
    };
    return HighlightClassDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], HighlightClassDirective.prototype, "defaultClass", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], HighlightClassDirective.prototype, "hightlightClassOnSelect", null);
__decorate([
    core_1.Input('highlight-class'),
    __metadata("design:type", String)
], HighlightClassDirective.prototype, "highlightClass", void 0);
__decorate([
    core_1.HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HighlightClassDirective.prototype, "onClick", null);
__decorate([
    core_1.HostListener('mouseover'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HighlightClassDirective.prototype, "onMouseEnter", null);
__decorate([
    core_1.HostListener('mouseout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HighlightClassDirective.prototype, "onMouseLeave", null);
HighlightClassDirective = __decorate([
    core_1.Directive({
        selector: '[highlight-class]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], HighlightClassDirective);
exports.HighlightClassDirective = HighlightClassDirective;
//# sourceMappingURL=hightlight-class.directive.js.map