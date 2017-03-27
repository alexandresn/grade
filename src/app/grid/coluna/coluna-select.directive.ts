import { Directive, Input } from '@angular/core';
import { ColunaBase } from './coluna-base.class';
import { ColunaTipo, IGridColunaText, IGridColunaSelect } from './interfaces';

@Directive({
    selector: 'coluna-select',
    inputs: [...ColunaBase.baseInputs]
})
export class ColunaSelectDirective extends ColunaBase implements IGridColunaText, IGridColunaSelect {
    @Input() formato: string;
    @Input() css: string;

    @Input() modelo: string;
    @Input() dados: string;
    @Input() valor: string;
    @Input() texto: string;
    @Input() chaveFonteDados: string;

    constructor() {
        super(ColunaTipo.COMBO);
    }
}
