"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
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
var AguardeDirective = (function () {
    function AguardeDirective(_viewContainerRef, _renderer) {
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this.ativo = false;
    }
    /**
     * Exibi css "Aguarde" em panel marcado pela diretiva
     */
    AguardeDirective.prototype.exibir = function () {
        var el = this._viewContainerRef.element.nativeElement;
        if (el.nodeName == 'BUTTON') {
            this._renderer.setElementAttribute(el, 'disabled', 'true');
            $(el).append("<span class=\"button-loading-container\"><i class=\"fa fa-spin fa-spinner m-l-md\"></i></span>");
            $(el).css('position', 'relative');
            $(el).addClass('disabled');
        }
        else {
            $(el).append("\n            <div class=\"panel-loading-container\">\n                <div class=\"panel-loading-content\"></div>\n                <div class=\"panel-loading-spinner\">\n                    <span><i class=\"fa fa-spin fa-spinner\"></i> Aguarde.... </span>\n                    </div>\n                </div>\n            ");
            $(el).css('position', 'relative');
        }
    };
    /**
     * Remove css "Aguarde" do panel marcado pela diretiva
     */
    AguardeDirective.prototype.ocultar = function () {
        var el = this._viewContainerRef.element.nativeElement;
        this._renderer.setElementAttribute(el, 'disabled', 'false');
        $(el).find('.button-loading-container').remove();
        $(el).find('.panel-loading-container').remove();
        $(el).removeClass('disabled');
        $(el).removeAttr('disabled');
    };
    AguardeDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var aguarde = changes["aguarde"];
        if (aguarde && aguarde.currentValue) {
            if (aguarde.currentValue.isStopped != undefined) {
                this.ativo = !aguarde.currentValue.isStopped;
                if (this.ativo)
                    this.exibir();
                aguarde.currentValue.add(function (res) {
                    _this.ativo = false;
                    _this.ocultar();
                });
            }
        }
    };
    return AguardeDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AguardeDirective.prototype, "aguarde", void 0);
AguardeDirective = __decorate([
    core_1.Directive({
        selector: '[aguarde]',
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef, core_1.Renderer])
], AguardeDirective);
exports.AguardeDirective = AguardeDirective;
//# sourceMappingURL=aguarde.directive.js.map