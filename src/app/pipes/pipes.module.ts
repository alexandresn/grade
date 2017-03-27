import { NgModule } from '@angular/core';

import {DataPipe, DataHoraPipe} from './data';
import {NumericoPipe, MonetarioPipe, AbsolutoPipe} from './numeral';
import {OrderByPipe} from './ordenacao';
import {FilterByPipe} from './filtro';

@NgModule({
    imports: [],
    exports: [DataPipe, DataHoraPipe,
                NumericoPipe, MonetarioPipe, AbsolutoPipe,
                OrderByPipe, 
                FilterByPipe],
    declarations: [DataPipe, DataHoraPipe,
                NumericoPipe, MonetarioPipe, AbsolutoPipe,
                OrderByPipe,
                FilterByPipe],
    providers: [],
})
export class PipesModule { }
