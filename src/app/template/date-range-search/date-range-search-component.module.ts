/**
 * 時間選擇區間(查詢)
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DateRangeSearchComponent } from './date-range-search.component';
import { FormateModule } from '@template/formate/formate.module';
import { DepositMaskModule } from '@template/formate/mask/account/deposit-mask.module';
import { InputDateComponentModule } from '@template/date/input-date/input-date-component.module';
import { NoteModule } from '@template/note/note.module';
import { PageCtrlModule } from '@template/page-ctrl/page-ctrl.module';

const TemplateList = [
  DateRangeSearchComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule,
    DepositMaskModule,
    InputDateComponentModule,
    NoteModule,
    PageCtrlModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
  ]
})
export class DateRangeSearchComponentModule { }
