import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Select2Component }   from './select2.component';

@NgModule({
    imports: [FormsModule, CommonModule],
    exports: [FormsModule, CommonModule, Select2Component],
    declarations: [Select2Component],
    providers: [],
})
export class Select2Module { }
