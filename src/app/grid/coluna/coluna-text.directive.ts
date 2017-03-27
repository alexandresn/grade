import { Directive, Input } from '@angular/core';
import { ColunaBase } from './coluna-base.class';
import { ColunaTipo, IGridColunaText } from './interfaces';

@Directive({
    selector: 'coluna-texto',
    inputs: [...ColunaBase.baseInputs]
})
export class ColunaTextDirective extends ColunaBase implements IGridColunaText {
    @Input() formato: string;
    @Input() css: string;
    @Input() link: string;

    private tipoText: boolean = true;

    public get ehCombo(): boolean {
        return this.tipo == ColunaTipo.COMBO;
    }

    public get ehText(): boolean {
        return this.tipo == ColunaTipo.TEXTO;
    }

    constructor() {
        super(ColunaTipo.TEXTO);
    }
}
