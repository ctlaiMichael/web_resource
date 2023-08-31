/**
 * Input Ctrl Module
 * 常用的directive與pipe
 */
import { NgModule } from '@angular/core';
import { NumEnOnlyDirective } from './num-en-only.directive';
import { NonSpaceDirective } from './non-space.directive';
import { MaskToolDirective } from './mask-tool.directive';
import { TwdAmtDirective } from './twd-amt.directive';

/**
 * 清單
 */
const PipeList = [
    NumEnOnlyDirective,
    NonSpaceDirective,
    MaskToolDirective,
    TwdAmtDirective
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
export class InputCtrlModule { }
