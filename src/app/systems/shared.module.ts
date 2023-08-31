/**
 * 共用模組，所有功能模組都需要各別import的模組
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';

// system template
import { SecurityInterfaceModule } from './security-interface/security-interface.module';
import { PageCtrlModule } from '@template/page-ctrl/page-ctrl.module'; // 頁面控制模組

// template
import { SortModule } from '@template/sort/sort.module'; // [樣版] 排序按鈕控制
import { NoteModule } from '@template/note/note.module'; // [樣版] 注意資訊
import { ErrorBoxModule } from '@template/msg/error-box/error-box.module'; // [樣版] 錯誤訊息(白箱)
import { InputDateComponentModule } from '@template/date/input-date/input-date-component.module'; // [樣版] 日期input
import { StepBarModule } from '@template/stepbar/step-bar.module'; // [樣版] 步驟列
import { ResultStatusTempModule } from '@template/result/result-temp.module'; // [樣版] 結果顯示
import { BookmarkModule } from '@template/bookmark/bookmark.module'; // [樣版] 頁籤

// Formate Pipe
// import { OverAmountStyleModule } from '@shared/layout/over-amount-style/over-amount-style.module'; // 長度樣式處理


/**
 * 模組清單
 */
const Modules = [
    CommonModule,
    FormsModule,
    // system template
    TranslateModule,
    FormateModule,
    ErrorBoxModule,
    PageCtrlModule,
    SecurityInterfaceModule,
    // template
    InputDateComponentModule,
    StepBarModule,
    NoteModule,
    SortModule,
    ResultStatusTempModule,
    BookmarkModule
];

@NgModule({
    imports: [
        ...Modules
    ],
    exports: [
        ...Modules
    ],
    declarations: [
    ]
})
export class SharedModule { }