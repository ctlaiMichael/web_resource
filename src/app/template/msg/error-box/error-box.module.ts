/**
 * [樣版] 錯誤訊息(空箱子)
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { ErrorBoxComponent } from './error-box.component';

// == 其他template清單 == //
const TemplateList = [
  ErrorBoxComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: []
})
export class ErrorBoxModule { }