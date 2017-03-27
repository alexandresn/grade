import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColunaBase } from './coluna-base.class';
//import { Select2Component } from '../../select2';
import { ColunaTipo } from './interfaces';
@Component({
    selector: 'coluna-select2',
    template: `<select2 [(ngModel)]="modelo" [data]="dados" [multiple]="false" [placeholder]="'Selecione'" (onSelecaoItem)="setCampo($event)"></select2>`,
    inputs: [...ColunaBase.baseInputs]
})
export class ColunaComboboxComponent extends ColunaBase {
    @Input() obj: any;
    @Input() modelo: any;
    @Input() propriedadeTexto: string;
    @Input() propriedadeValor: string;

    @Input() dados: any[] = new Array<any>();

    @Output() onSelecaoItem: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        super(ColunaTipo.COMBO);
        this.modelo = null;
    }

    private setCampo($event) {
        let obj = {};

        obj[this.propriedadeValor] = $event.id;
        obj[this.propriedadeTexto] = $event.text;

        this.onSelecaoItem.emit(obj);
    }
}