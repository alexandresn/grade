import { Directive, OnChanges, ViewContainerRef, SimpleChange, Input } from '@angular/core';

declare class EasyPieChart {
    constructor(element: any, options: any);

    /**
    * Update the value of the chart
    * @param  {number} newValue Number between 0 and 100
    * @return {object}          Instance of the plugin for method chaining
    */
    update(newValue: any): any;

    /**
	 * Disable animation
	 * @return {object} Instance of the plugin for method chaining
	 */
    disableAnimation(): any;

    /**
         * Enable animation
         * @return {object} Instance of the plugin for method chaining
         */
    enableAnimation(): any;
}

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
@Directive({
    selector: '[easyPieChart]'
})
export class EasyPieChartDirective implements OnChanges {
    @Input() easyPieChart: any;

    constructor(private _viewContainerRef: ViewContainerRef) {
    }

    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any {
        let change = changes['easyPieChart'];
        if (change && change.currentValue) {
            var element = this._viewContainerRef.element.nativeElement;
            var value = change.currentValue.value;

            if (value == undefined) console.log('easyPieChart:: value não definido');

            var pieChart = new EasyPieChart(element, change.currentValue); // função disponibilizada pelo arquivo easypiechart.js do node_modules do plugin
            pieChart.update(value);
        }
    };
}