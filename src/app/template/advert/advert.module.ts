/**
 * [樣版] 廣告輪播牆
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { AdvertComponent } from './advert.component';
import { AdvertService } from './advert.service';
import { AdvertServiceModule } from '@template/advert/advert-service.module';
import { ImageCtrlModule } from '@template/page-ctrl/image-ctrl/image-ctrl.module';
import { PageCtrlModule } from '@template/page-ctrl/page-ctrl.module';
import { AdvertTxtModule } from '@template/advert/advert-txt/advert-txt.module';

// == 其他template清單 == //
const TemplateList = [
  AdvertComponent,
//   CardSwiperDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule,
    PageCtrlModule,
    AdvertServiceModule,
    ImageCtrlModule,
    AdvertTxtModule
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
export class AdvertModule { }
