/**
 * date輸入選擇
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { InputDateComponent } from './input-date.component';
import { DatepickerPopComponentModule } from '@template/list/datepicker-pop/datepicker-pop-component.module';
import { DateService } from '../date.service';
// == 其他template清單 == //
const TemplateList = [
  InputDateComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule
    , DatepickerPopComponentModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
    DateService
  ]
})
export class InputDateComponentModule { }
