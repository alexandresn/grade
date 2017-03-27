import {Directive, ContentChildren, AfterContentInit, QueryList} from '@angular/core';
import {FiltroPropriedadeDirective} from './filtro-propriedade.directive';

@Directive({
    selector: 'filtros'
})
export class FiltrosTemplateDirective implements AfterContentInit {
    @ContentChildren(FiltroPropriedadeDirective) 
    private filtrosList: QueryList<FiltroPropriedadeDirective>;
    
    public filtros:any[];

    ngAfterContentInit() {
        this.filtros = this.filtrosList.map((filtro) => filtro);         
    }
}