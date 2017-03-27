import { Directive, Input, AfterContentInit, ContentChildren, QueryList, ElementRef } from '@angular/core';
import { ColunaTipo, IGridColunaSelect, IGridColuna } from './interfaces';
import { ColunaTextDirective } from './coluna-text.directive';
import { ColunaSelectDirective } from './coluna-select.directive';
import { ColunaDateDirective } from './coluna-date.directive';
import { ColunaNumeroDirective } from './coluna-numero.directive';
import { ColunaHtmlDirective } from './coluna-html.directive';
import { ColunaTemplateComponent } from './coluna-template.directive';

/**
 * Tipagem customizada para definir contrato de objeto 
 */
interface IArrayElemento {
    item(index: number): any;
    length: number;
}

@Directive({
    selector: 'colunas',
})
export class ColunasTemplateDirective implements AfterContentInit {
    @Input() autoSize: boolean = false;

    @ContentChildren(ColunaTextDirective)
    private colunasText: QueryList<ColunaTextDirective>;

    @ContentChildren(ColunaSelectDirective)
    private colunasSelect: QueryList<ColunaSelectDirective>;

    @ContentChildren(ColunaDateDirective)
    private colunasDate: QueryList<ColunaDateDirective>;

    @ContentChildren(ColunaNumeroDirective)
    private colunasNumero: QueryList<ColunaNumeroDirective>;

    @ContentChildren(ColunaHtmlDirective)
    private colunasHTML: QueryList<ColunaHtmlDirective>;

    @ContentChildren(ColunaTemplateComponent)
    private colunasTemplate: QueryList<ColunaTemplateComponent>;

    public colunas: any[];

    constructor(private _viewRef: ElementRef) {
    }

    /**
     * Converte valor para booleano
     */
    booleanConvert(valor: any): boolean {
        if (valor === null || valor === undefined || typeof valor === "boolean")
            return valor;

        return valor.toString() === "true";
    }

    ngAfterContentInit() {

        // concatena todos os elementos do temmplate em uma lista única utilizada na view            
        this.colunas = this.colunasSelect.map((col) => { col.editavel = this.booleanConvert(col.editavel); return col; }); // coluna do tipo select
        this.colunas = this.colunas.concat(this.colunasText.map((col) => { col.editavel = this.booleanConvert(col.editavel); return col; })); // colunas text
        this.colunas = this.colunas.concat(this.colunasDate.map((col) => {
            col.editavel = this.booleanConvert(col.editavel);
            // sobrescreve tipagem padrão DATA quando formatação definida for hora
            col.tipo = (col.formato == 'hora' ? ColunaTipo.DATAHORA : ColunaTipo.DATA);
            return col;
        })); // colunas date
        this.colunas = this.colunas.concat(this.colunasNumero.map((col) => { col.editavel = this.booleanConvert(col.editavel); return col; })); // colunas numero
        this.colunas = this.colunas.concat(this.colunasHTML.map((col) => { col.ehHtml = true; return col; })); // colunas html
        this.colunas = this.colunas.concat(this.colunasTemplate.map((col) => { return col; })); // colunas html

        //exibe somente
        this.colunas = this.colunas.filter((col) => col.visivel == true);

        // ordena colunas de acordo com template
        if (this._viewRef && this._viewRef.nativeElement) {
            let nos: IArrayElemento = this._viewRef.nativeElement.children;

            for (var index = 0; index < nos.length; index++) {
                var element = nos.item(index);

                var campo = element.getAttribute("titulo");
                this.colunas.filter((col) => {
                    return col.titulo == campo;
                }).forEach((col) => {
                    col.ordem = index;
                });
            }
            //ordena as colunas
            this.colunas = this.colunas.sort((a, b) => {
                if (a.ordem < b.ordem)
                    return -1;
                else if (a.ordem > b.ordem)
                    return 1;
                else return 0;
            });

            this.propriedadesAuto();
        }
    }

    private propriedadesAuto() {
        var cont = this.colunas.length;
        this.colunas.forEach((col) => {

            if (this.booleanConvert(this.autoSize))
                col.width = 90 / cont;

            switch (col.tipo) {
                case ColunaTipo.NUMERO:
                    col.css = "text-right";
                    break;
                case ColunaTipo.DATA:
                    col.css = "text-center";
                    break;
                default:
                    break;
            }
        });

    }
}