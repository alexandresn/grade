import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'data'
})

export class DataPipe implements PipeTransform {    
    private formatadorDataPtBr = Intl.DateTimeFormat('pt-BR');
    
    transform(value: any, args: any[]): any {
        if (value != undefined)
            return this.formatadorDataPtBr.format(new Date(value));                         
    }
}