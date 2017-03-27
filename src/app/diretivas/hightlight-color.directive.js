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
var HighlightColorDirective = (function () {
    function HighlightColorDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this._defaultColor = 'red';
    }
    Object.defineProperty(HighlightColorDirective.prototype, "defaultColor", {
        set: function (colorName) {
            this._defaultColor = colorName || this._defaultColor;
        },
        enumerable: true,
        configurable: true
    });
    HighlightColorDirective.prototype.onMouseEnter = function () {
        this.highlight(this.highlightColor || this._defaultColor);
    };
    HighlightColorDirective.prototype.onMouseLeave = function () {
        this.highlight(null);
    };
    HighlightColorDirective.prototype.highlight = function (color) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
    };
    return HighlightColorDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], HighlightColorDirective.prototype, "defaultColor", null);
__decorate([
    core_1.Input('highlight-color'),
    __metadata("design:type", String)
], HighlightColorDirective.prototype, "highlightColor", void 0);
__decorate([
    core_1.HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HighlightColorDirective.prototype, "onMouseEnter", null);
__decorate([
    core_1.HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HighlightColorDirective.prototype, "onMouseLeave", null);
HighlightColorDirective = __decorate([
    core_1.Directive({
        selector: '[highlight-color]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], HighlightColorDirective);
exports.HighlightColorDirective = HighlightColorDirective;
//# sourceMappingURL=hightlight-color.directive.js.map