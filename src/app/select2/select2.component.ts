import { Component, forwardRef, Input, Output, EventEmitter, AfterViewChecked, OnChanges, OnInit, SimpleChange, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectItem } from './select-item';
import * as _ from "lodash";

const noop = () => {
};

export const SELECT2_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Select2Component),
    multi: true
};

/**
 * Constroí componente combobox baseado no plugin select2
 *
 * ### Usage
 * 
 *  ```typescript
 * @Component({
 *      selector: "pagina",
 *      directives: [Select2Component],
 *      template: `<select2 [ngModel]="modelo" [data]="lista" [multiple]="true" [placeholder]="'texto'" (onSelecaoAlterada)="onChange($event)" (onSelecaoItem)="onSelect($event)" (onSelecaoLimpa)="onClear($event)"></select2>`
 *  })
 * 
 * class GenericComp {
 *  modelo: any;
 *  lista : Array<any>;
 *  onSelecaoAlterada: function (itens:Array<SelectItem>) { 
 *  // comportamento realizado ao mudar itens selecionados 
 *  }
 *  onSelecaoItem: function (itens:SelectItem) { 
 *  // comportamento realizado ao selecionar item  
 *  }
 *  onSelecaoLimpa: function (valor:bool) { 
 *  // comportamento realizado quando ao remover todas as seleções  
 *  }  
 * }
 *  ```
 */
@Component({
    selector: 'select2',
    template: `        
        <div style="position: relative">
            <span *ngIf="exibirCarregando" style="position: absolute;top: 0px;right: 20px;margin-right: 8px;margin-top: 8px;z-index: 10;"><i class="fa fa-spinner fa-spin"></i></span>
            <select class="form-control"></select>        
        <div>
    `,
    providers: [SELECT2_VALUE_ACCESSOR]
})
export class Select2Component implements OnInit, OnChanges, ControlValueAccessor, AfterViewChecked {

    //The internal data model
    private innerValue: any = '';

    //Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    private exibirCarregando: boolean = false;
    private initialized = false;
    private hasSelection = false;
    private _selectElement: any;

    @Input() data: Array<any> = new Array<any>();
    @Input() placeholder: string;
    @Input() multiple: boolean = false;
    @Input() allowClear: boolean = true;
    @Input() aguardePromise: any;
    @Input() disabled: boolean = false;
    @Output() onSelecaoItem: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDesselecaoItem: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSelecaoAlterada: EventEmitter<any> = new EventEmitter<any>();
    @Output() onSelecaoLimpa: EventEmitter<any> = new EventEmitter<any>();


    private _change: EventEmitter<any> = new EventEmitter<any>();

    constructor(public element: ElementRef) {
    }

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.setValueSelect2(value);
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
        this._change.subscribe(fn);
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }


    ///
    /// manipulação Select2
    ///

    private buildSelectItemList(selectElement: any, selectedValues: Array<any>) {
        var list = selectElement['options'] as Array<any>;

        var selectedItems = _.filter(list, item => {
            return selectedValues.indexOf(item['value']) > -1;
        });
        var result = selectedItems.map(item => { return new SelectItem(item['value'], item['text']); });

        return result;
    }

    private select2Destroy() {
        if (this.initialized)
            this._selectElement.html('').select2('destroy');
    }

    private initializeSelect2(data: Array<any>) {
        this.initialized = true;

        this._selectElement.select2({
            data: data,
            language: "pt-BR",
            placeholder: this.placeholder,
            disabled: this.disabled,
            multiple: this.multiple,
            allowClear: this.allowClear
        });
    }

    private setDataSelect2(data: Array<any>) {
        this.select2Destroy();
        this.initializeSelect2(data);
    }

    private setValueSelect2(value: any) {
        if (this._selectElement)
            this._selectElement.select2({
                language: "pt-BR",
                placeholder: this.placeholder,
                disabled: this.disabled,
                multiple: this.multiple,
                allowClear: this.allowClear
            }).val(value).trigger('change');
    }

    //
    // Eventos
    //
    ngOnInit() {
        this._selectElement = jQuery(this.element.nativeElement.getElementsByTagName('select'));
        this.setDataSelect2(this.data);

        this._selectElement.on('change', e => {

            var selected = $(e.target).val();
            if (selected) {
                this.hasSelection = true;

                var result = this.buildSelectItemList(e.currentTarget, selected);

                // send value to event change
                this.onSelecaoAlterada.emit(result);
                // set value ngModel 
                this._change.emit(selected);
            }
            else if (this.hasSelection == true) {
                // set value ngModel 
                this._change.emit(null);
                this.onSelecaoLimpa.emit(true);

                this.hasSelection = false;
            }

            e.preventDefault();
        });

        this._selectElement.on('select2:select', e => {
            this.onSelecaoItem.emit(e.params.data);
        });

        this._selectElement.on('select2:unselect', e => {
            this.onDesselecaoItem.emit(e.params.data);
        });
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['data']) {
            if (this._selectElement) {
                this.setDataSelect2(changes['data'].currentValue);
                this.setValueSelect2(this.value);
            }
        }

        let aguarde = changes["aguardePromise"];
        if (aguarde && aguarde.currentValue) {
            if (aguarde.currentValue.isStopped != undefined) {
                this.exibirCarregando = !aguarde.currentValue.isStopped;
                aguarde.currentValue.add((res) => {
                    this.exibirCarregando = false;
                });
            }
        }
    }

    ngAfterViewChecked() {
        let elm = $(this.element.nativeElement);
        let chd = elm.find('select').next('span');
        let cls = elm.attr('class');
        chd.removeClass('ng-touched ng-untouched ng-pristine ng-dirty ng-invalid ng-valid');
        chd.addClass(cls);
        elm.css("border", "none");
    }
}