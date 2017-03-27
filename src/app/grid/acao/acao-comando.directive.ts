import {Directive, Input} from '@angular/core';

@Directive({
    selector: 'acao'
})
export class AcaoComandoDirective {
    @Input() nome: string;
    @Input() descricao: string;
    @Input() icone: string;
    /**
     * Propriedade do modelo a ser verificada para definir condição de visualização da ação
     */
    @Input() condicaoPropriedade:string;
    /**
     * Valor da propriedade do modelo a ser verificada para definir condição de visualização da ação
     */
    @Input() condicaoValor:string;
}