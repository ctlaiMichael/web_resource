/**
 * 信卡月份選擇
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormateModule } from '@template/formate/formate.module';
import { TranslateModule } from '@ngx-translate/core';
import { CardSelectMonthComponent } from './card-select-month.component';
import { CardSelectMonthService } from './card-select-month.service';
import { SPEC12010201ApiService } from '@api/spec12/spec12010201/spec12010201-api.service';


const TemplateList = [
  CardSelectMonthComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule,
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
    CardSelectMonthService,
    SPEC12010201ApiService
  ]
})
export class CardSelectMonthModule { }
