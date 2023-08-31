/**
 * [樣版] 廣告-內容
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
// == Model == //
import { ImageCtrlModule } from '@template/page-ctrl/image-ctrl/image-ctrl.module'; // 圖片顯示處理
import { AdvertServiceModule } from '@template/advert/advert-service.module';
// == 其他template清單 == //
import { AdvertTxtComponent } from './advert-txt.component';

// == 其他template清單 == //
const TemplateList = [
  AdvertTxtComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule,
    AdvertServiceModule,
    ImageCtrlModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: []
})
export class AdvertTxtModule { }
