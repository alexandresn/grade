import {Directive, Input} from '@angular/core';

@Directive({
    selector: 'filtro'
})
export class FiltroPropriedadeDirective {
    @Input() id: string;
    @Input() text: string;
}