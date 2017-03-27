import { Directive, Input } from '@angular/core';
import { ColunaTipo, IGridColuna } from './interfaces';

export abstract class ColunaBase implements IGridColuna {
    //Campos com o decorador @Input da classe base para quem for herdar
    public static baseInputs: string[] = ['titulo', 'campo', 'ordenacao', 'editavel', 'visivel'];

    public tipo: ColunaTipo;
    @Input() titulo: string;
    @Input() campo: string;
    @Input() ordenacao: string;
    @Input() editavel: boolean;
    @Input() visivel: boolean = true;

    constructor(tipo: ColunaTipo) { 
        this.tipo = tipo;
    }
}
