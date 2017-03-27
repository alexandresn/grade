import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataHora'
})

export class DataHoraPipe implements PipeTransform {    
    private formatadorDataPtBr = Intl.DateTimeFormat('pt-BR', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false
    });
    
    transform(value: any, args: any[]): any {
        if (value != undefined)
            return this.formatadorDataPtBr.format(new Date(value));                         
    }
}