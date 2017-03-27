import { Directive, Input } from '@angular/core';
import { ColunaBase } from './coluna-base.class';
import { ColunaTipo, IGridColunaDate } from './interfaces';

/**
 * Coluna do Grid para o formato Data
 *
 * ### Usage 
 *
 *  ```typescript 
 *
 *  <coluna-data titulo="" campo="" [formato="hora"]></coluna-data>
 *     
 *  ```
 */
@Directive({
    selector: 'coluna-data',
    inputs: [...ColunaBase.baseInputs]
})
export class ColunaDateDirective extends ColunaBase implements IGridColunaDate {
    @Input() formato: string;
    @Input() css: string;

    constructor() {
        super(ColunaTipo.DATA);
    }
}
