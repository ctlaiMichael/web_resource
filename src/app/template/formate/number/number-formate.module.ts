/**
 * formate Module: Number
 * 常用的formate方法與pipe
 */
import { NgModule } from '@angular/core';
// == 數值常用pipe == //
import {
    HtNumberPipe
    , HtMoneyPipe
    , HtFinancialPipe
    , HtFundSetNumberPipe
} from './number-formate.pipe';
import { RateOnlyDirective } from './rate-only.directive';
import { NumberOnlyDirective } from './number-only.directive';
import { AmountDirective } from './exchange-tool.directive';


/**
 * Pipe清單
 */
const PipeList = [
    HtNumberPipe
    , HtMoneyPipe
    , HtFinancialPipe
    , HtFundSetNumberPipe
    , RateOnlyDirective
    , NumberOnlyDirective
    , AmountDirective
];


@NgModule({
    exports: [
        ...PipeList
    ],
    declarations: [
        ...PipeList
    ],
    providers: []
})
export class NumberFormateModule { }
