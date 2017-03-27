import { Directive, HostListener, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
import * as _ from "lodash";
/**
 * Diretiva para máscara de moeda
 * 
 * @export
 * @class CurrencyMaskDirective
 */
@Directive({
    selector: '[currency-mask]'
})
export class CurrencyMaskDirective {
    private maskedValue: any = '';
    private unmaskedValue: number;
    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    private currency: string = '$';
    private digitPattern = /\d/g;
    private formatadorNumeroPtBr = Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 });
    private $element: JQuery;

    constructor(private renderer: Renderer, private elementRef: ElementRef) { }

    ngOnInit() {
        this.$element = jQuery(this.elementRef.nativeElement);
        this.mask(this.$element.val());
        //this.change.emit({ valor: this.unmaskedValue });
    }

    @HostListener('click', ['$event'])
    click($event) {
        var that = this;
        setTimeout((function (el) {
            that.mask($event.target.value);
            $event.target.unmaskedValue = that.unmaskedValue;
        } (this)), 1);
    }

    @HostListener('keyup', ['$event'])
    onKeyUp($event) {
        this.mask($event.target.value);
        $event.target.unmaskedValue = this.unmaskedValue;
        this.change.emit($event);
    }

    mask(value: string) {
        this.unmaskedValue = this.getUnmaskedValue(value);
        this.maskedValue = this.getMaskedValue(this.unmaskedValue);
        this.renderer.setElementProperty(this.elementRef.nativeElement, 'value', this.maskedValue);
    }

    getUnmaskedValue(currentValue: any): number {
        if (typeof currentValue == "number")
            return currentValue;

        let result = "";

        if (currentValue && currentValue.length > 0) {
            // Verifica se o valor digitado é negativo
            if (currentValue.indexOf('-') > -1) {
                result += '-';
            }

            let digits = currentValue.match(/\d/g);
            _.forEach(digits, function (value) {
                result += value;
            });

            result = result.substring(0, result.length - 2) + "." + result.substr(-2)
        }
        return parseFloat(result) || 0;
    }

    getMaskedValue(actualValue: number): string {
        return this.formatadorNumeroPtBr.format(actualValue);
    }
}