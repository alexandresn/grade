import { Directive, Input } from '@angular/core';
import { ColunaBase } from './coluna-base.class';
import { ColunaTipo, IGridColuna } from './interfaces';

@Directive({
    selector: 'coluna-numero',
    inputs: [...ColunaBase.baseInputs]
})
export class ColunaNumeroDirective extends ColunaBase implements IGridColuna {
    constructor() {
        super(ColunaTipo.NUMERO);
    }
}
