import { Directive, Component, Input, ViewChild, ContentChild, QueryList, AfterViewInit, AfterContentInit, AfterContentChecked, ElementRef, ViewContainerRef, Renderer } from '@angular/core';
import { ColunaBase } from './coluna-base.class';
import { ColunaTipo, IGridColuna } from './interfaces';
import { TdTemplate } from './td-template.component';

/**
 * Coluna do Grid para um template HTML
 *
 * ### Usage 
 *
 *  ```typescript 
 *
 *  <coluna-html titulo="" campo=""></coluna-html>
 *     
 *  ```
 */
@Component({
    selector: 'coluna-html',
    template: '<ng-content></ng-content>',
    inputs: [...ColunaBase.baseInputs]
})
export class ColunaHtmlDirective extends ColunaBase implements IGridColuna {
    @Input() ehHtml: boolean;
    @Input() css: string;
    @Input() template: string;
    @Input() html: string;

    constructor(private _elementRef: ElementRef, private _viewContainerRef: ViewContainerRef, private _renderer: Renderer) {
        super(ColunaTipo.HTML);
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngAfterContentInit() {
        //this.template = `<span [ngClass]="{'label bg-success': modelo.Tipo == 'C', 'label bg-danger': modelo.Tipo == 'D'}">{{modelo.Tipo}}</span>`; 
        //this.template = this._elementRef.nativeElement.innerHTML;
        this.template = this.html;
    }

    ngAfterContentChecked() {
    }
}
