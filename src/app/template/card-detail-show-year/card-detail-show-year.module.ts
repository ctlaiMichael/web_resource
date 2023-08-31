/**
 * 列表顯示年月標題(跑迴圈顯示過不會在顯示)
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { CardDetailShowYearComponent } from './card-detail-show-year.component';

// == 其他template清單 == //
const TemplateList = [
  CardDetailShowYearComponent
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
  providers: [

  ]
})
export class CardDetailShowYearModule { }
