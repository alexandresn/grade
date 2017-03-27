import { Directive, OnInit, OnChanges, SimpleChange, Input, ViewContainerRef, Renderer } from '@angular/core';
import { Observable, SubscribableOrPromise, Subscribable, ObservableInput } from 'rxjs/Observable';

/** 
 * Diretiva para aplicar modo "Aguarde" em panel específico
 * durante execução de um método promise/observable
 * 
 * ### Funcionamento
 * 
 * Panel marcado com a diretiva será atualizado com estilo css "Aguarde" 
 * para indicar chamada de requisição definida pelo atributo 'assinante'.
 * 
 * Ao final da requisição, css "Aguarde" aplicado é removido.  
 * 
 * ### Parâmetros
 * [assinante] = define objeto Subscriber que deve ser escutado para identificar a realização de chamada promise/observable 
 *   
 * ### Utilização
 *    
 * ```typescript
 * @Component({
 *      selector: "pagina",
 *      directives: [AguardeDirective],
 *      template: '<button [aguarde]="metodoPromise"></button>'
 *  })
 *  
 * class GenericComp {
 *  metodoPromise: any; // objeto ao qual será atribuído Subscriber de método promise/observable a ser escutado. 
 * 
 *  chamadaMetodoPromiseObservable(){
 *      // atribui a objeto Subsciber a ser escutado
 *      this.metodoPromisse = servico.get('http:///url.exemplo').subscribe(...);
 *      // após a conclusão dessa requisição GET o css "Aguarde" é removido do panel 
 *  }
 *    
 * }
 *  ```
 *  
 */
@Directive({
    selector: '[aguarde]',
})
export class AguardeDirective implements OnChanges {
    private ativo: boolean = false;

    // parâmetro de entrada que define Subscriber a ser escutado para identificar chamada de requisição 
    @Input() aguarde: any;

    constructor(private _viewContainerRef: ViewContainerRef, private _renderer:Renderer) {        
    }

    /**
     * Exibi css "Aguarde" em panel marcado pela diretiva
     */
    private exibir() {
        var el = this._viewContainerRef.element.nativeElement;

        if (el.nodeName == 'BUTTON') {
            this._renderer.setElementAttribute(el, 'disabled', 'true');
            $(el).append(`<span class="button-loading-container"><i class="fa fa-spin fa-spinner m-l-md"></i></span>`);
            $(el).css('position', 'relative');
            $(el).addClass('disabled');
            
        } else {
            $(el).append(`
            <div class="panel-loading-container">
                <div class="panel-loading-content"></div>
                <div class="panel-loading-spinner">
                    <span><i class="fa fa-spin fa-spinner"></i> Aguarde.... </span>
                    </div>
                </div>
            `);
            $(el).css('position', 'relative');
        }
    }

    /**
     * Remove css "Aguarde" do panel marcado pela diretiva
     */
    private ocultar() {
        var el = this._viewContainerRef.element.nativeElement;     

        this._renderer.setElementAttribute(el, 'disabled', 'false');        
        
        $(el).find('.button-loading-container').remove();
        $(el).find('.panel-loading-container').remove();
        $(el).removeClass('disabled');
        $(el).removeAttr('disabled');
        
    }

    ngOnChanges(changes: { [key: string]: SimpleChange; }) {
        let aguarde = changes["aguarde"];
        if (aguarde && aguarde.currentValue) {

            if (aguarde.currentValue.isStopped != undefined) {
                this.ativo = !aguarde.currentValue.isStopped;
                if (this.ativo)
                    this.exibir();
                    
                aguarde.currentValue.add((res) => {
                    this.ativo = false;
                    this.ocultar();
                });
            }

        }
    }

}