import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'monetario'
})

export class MonetarioPipe implements PipeTransform {    
    private formatadorNumeroPtBr = Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2});
    
    transform(value: any, args: any[]): any {
        return this.formatadorNumeroPtBr.format(value);                         
    }
}