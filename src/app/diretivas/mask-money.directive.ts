import { Directive, HostListener, forwardRef, Input, Output, EventEmitter, Renderer, OnInit, SimpleChange, ElementRef } from '@angular/core';
import { FormControl, FormControlName, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as _ from "lodash";
const noop = () => { };

export const MASK_MONEY_DIRECTIVE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaskMoneyDirective),
    multi: true
};

@Directive({
    selector: '[ngModel][mask-money]',
    // host: {
    //     "(input)": "input($event.target.value)",
    //     "(blur)": "blur()"
    // },
    providers: [MASK_MONEY_DIRECTIVE_VALUE_ACCESSOR]
})
export class MaskMoneyDirective implements ControlValueAccessor {
    private innerValue: any = '';
    private sinalDigitado: string = '';
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @Output() masked: EventEmitter<any> = new EventEmitter();

    private formatadorNumeroPtBr = Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 });

    constructor(private renderer: Renderer, private elementRef: ElementRef) { }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    @HostListener('click', ['$event.target.value'])
    focus(value: string) {
        var that = this;
        setTimeout(function () { that.elementRef.nativeElement.selectionStart = that.elementRef.nativeElement.selectionEnd = value.length; }, 0);
    }

    @HostListener('blur')
    blur() {
        this.onTouchedCallback();
    }

    @HostListener('keyup', ['$event.target.value'])
    input(value: string) {
        let unmaskedValue = this.getUnmaskedValue(value);
        //let maskedValue = this.getMaskedValue(unmaskedValue);
        //value = unmaskedValue.toFixed(2);
        this.writeValue(value);
        this.onTouchedCallback();
        this.onChangeCallback(unmaskedValue);
    }

    writeValue(value: any): void {
        let unmaskedValue = this.getUnmaskedValue(value);
        let maskedValue = this.getMaskedValue(unmaskedValue);

        if (unmaskedValue == 0 && this.sinalDigitado == '-')
            maskedValue = this.sinalDigitado + maskedValue;

        this.innerValue = maskedValue;
        value = this.innerValue;
        this.renderer.setElementProperty(this.elementRef.nativeElement, 'value', this.innerValue);
        this.masked.emit(this.innerValue);
    }

    getUnmaskedValue(currentValue: any): number {
        if (typeof currentValue == "number")
            return currentValue;

        let result = "";

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