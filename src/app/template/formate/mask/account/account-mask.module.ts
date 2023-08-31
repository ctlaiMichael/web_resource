/**
 * formate Module: Date
 * 常用的formate方法與pipe
 */
import { NgModule } from '@angular/core';
import {
    AccountFormatePipe
    , AccountFormateAllPipe
    , AccountMaskPipe
    , CardMaskPipe
    , waterNumberPipe
    , socialSharingAccntPipe,
    EmvCardMaskPipe
} from './account-mask.pipe';


/**
 * Pipe清單
 */
const PipeList = [
    AccountFormatePipe
    , AccountFormateAllPipe
    , AccountMaskPipe
    , CardMaskPipe
    , waterNumberPipe
    , socialSharingAccntPipe
    , EmvCardMaskPipe
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
export class AccountMaskModule { }
