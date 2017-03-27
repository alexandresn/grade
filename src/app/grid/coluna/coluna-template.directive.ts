import { Directive, Component, Input, ViewChild, ContentChild, QueryList, AfterContentInit, Renderer, TemplateRef } from '@angular/core';
import { ColunaBase } from './coluna-base.class';
import { ColunaTipo, IGridColuna } from './interfaces';
import { TdTemplate } from './td-template.component';

@Component({
    selector: 'coluna-template',
    inputs: [...ColunaBase.baseInputs],
    template: ''
})
export class ColunaTemplateComponent extends ColunaBase {

    @ContentChild(TemplateRef) itemTmpl;

    constructor() {
        super(ColunaTipo.TEMPLATE);
    }

    ngAfterContentInit() {
    }
}