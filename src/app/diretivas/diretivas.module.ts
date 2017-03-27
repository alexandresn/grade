import { NgModule } from '@angular/core';

import { AguardeDirective } from './aguarde.directive';
import { EasyPieChartDirective } from './easy-pie-chart.directive';
import { MaskMoneyDirective } from './mask-money.directive';
import { CurrencyMaskDirective } from './currency-mask.directive';
import { HighlightColorDirective } from './hightlight-color.directive';
import { HighlightClassDirective } from './hightlight-class.directive';

@NgModule({
    imports: [],
    exports: [AguardeDirective, EasyPieChartDirective, MaskMoneyDirective, CurrencyMaskDirective, HighlightColorDirective, HighlightClassDirective],
    declarations: [AguardeDirective, EasyPieChartDirective, MaskMoneyDirective, CurrencyMaskDirective, HighlightColorDirective, HighlightClassDirective],
    providers: [],
})
export class DiretivasModule { }

