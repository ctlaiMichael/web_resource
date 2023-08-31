/**
 * 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CountdownComponent } from './countdown.component';
import { CountdownService } from '../countdown.service';
// == 其他template清單 == //
const TemplateList = [
  CountdownComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
    CountdownService
  ]
})
export class CountDownComponentModule { }
