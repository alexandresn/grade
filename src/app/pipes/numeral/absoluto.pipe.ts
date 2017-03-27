import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'abs'
})

export class AbsolutoPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        return Math.abs(value);
    }
}