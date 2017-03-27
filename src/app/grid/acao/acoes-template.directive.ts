import {Directive, Input, ContentChildren, AfterContentInit, QueryList} from '@angular/core';
import {AcaoComandoDirective} from './acao-comando.directive';

@Directive({
    selector: 'acoes'
})
export class AcoesTemplateDirective implements AfterContentInit {
    @ContentChildren(AcaoComandoDirective, { descendants: true }) 
    private acoesList: QueryList<AcaoComandoDirective>;

    public acoes:any[];

    ngAfterContentInit() { 
        this.acoes = this.acoesList.map( (acao) => acao );
    }
}