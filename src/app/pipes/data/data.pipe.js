"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var DataPipe = (function () {
    function DataPipe() {
        this.formatadorDataPtBr = Intl.DateTimeFormat('pt-BR');
    }
    DataPipe.prototype.transform = function (value, args) {
        if (value != undefined)
            return this.formatadorDataPtBr.format(new Date(value));
    };
    return DataPipe;
}());
DataPipe = __decorate([
    core_1.Pipe({
        name: 'data'
    })
], DataPipe);
exports.DataPipe = DataPipe;
//# sourceMappingURL=data.pipe.js.map