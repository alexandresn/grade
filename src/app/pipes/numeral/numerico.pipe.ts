import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numerico'
})

export class NumericoPipe implements PipeTransform {    
    private formatadorNumeroPtBr = Intl.NumberFormat('pt-BR', {minimumFractionDigits: 0});
    
    transform(value: any, args: any[]): any {
        return this.formatadorNumeroPtBr.format(value);
    }
}