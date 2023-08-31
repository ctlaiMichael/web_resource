/**
 * 信用卡-謹慎理財資訊
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '@systems/shared.module';
import { CardNoticeComponent } from './card-notice.component';


const TemplateList = [
  CardNoticeComponent
];

@NgModule({
  imports: [
    SharedModule
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
export class CardNoticeModule { }
