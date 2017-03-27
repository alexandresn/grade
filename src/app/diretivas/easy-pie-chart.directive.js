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
/**
 * Diretiva para gráfico Easy Pie Chart
 *
 * ### Install
 *
 * npm install easy-pie-chart
 *
 * ### Funcionamento
 *
 * Rendereiza canvas exibindo gráfico easy-pie-chart (https://rendro.github.io/easy-pie-chart/)
 *
 * ### Parâmetros
 * [easyPieChart] = define objeto com as configurações esperados pelo plugin easy-pie-chart
 *
 * ### Utilização
 *
 * ```typescript
 * @Component({
 *      selector: "pagina",
 *      directives: [EasyPieChartDirective],
 *      template: '<div [easyPieChart]="options"></div>'
 *  })
 *
 * class GenericComp {
 *  options: any; // objeto ao qual será atribuído Subscriber de método promise/observable a ser escutado.
 *
 *  ngOnOnit(){
 *     this.options = {
                barColor: '#1CA03A',
                animate: {
                    duration: 2000,
                    enabled: true
                },
                lineCap: 'circle',
                size: 90,
                value: 88 // valor a ser representado pelo gráfico
            };
 *  }
 *
 * }
 *  ```
 *
 */
var EasyPieChartDirective = (function () {
    function EasyPieChartDirective(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    EasyPieChartDirective.prototype.ngOnChanges = function (changes) {
        var change = changes['easyPieChart'];
        if (change && change.currentValue) {
            var element = this._viewContainerRef.element.nativeElement;
            var value = change.currentValue.value;
            if (value == undefined)
                console.log('easyPieChart:: value não definido');
            var pieChart = new EasyPieChart(element, change.currentValue); // função disponibilizada pelo arquivo easypiechart.js do node_modules do plugin
            pieChart.update(value);
        }
    };
    ;
    return EasyPieChartDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EasyPieChartDirective.prototype, "easyPieChart", void 0);
EasyPieChartDirective = __decorate([
    core_1.Directive({
        selector: '[easyPieChart]'
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], EasyPieChartDirective);
exports.EasyPieChartDirective = EasyPieChartDirective;
//# sourceMappingURL=easy-pie-chart.directive.js.map