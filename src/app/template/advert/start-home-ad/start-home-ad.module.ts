/**
 * [樣版] 廣告-未登入前
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
// == Model == //
import { AdvertServiceModule } from '@template/advert/advert-service.module';
import { AdvertTxtModule } from '@template/advert/advert-txt/advert-txt.module';
// == 其他template清單 == //
import { StartHomeAdComponent } from './start-home-ad.component';

// == 其他template清單 == //
const TemplateList = [
  StartHomeAdComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule,
    AdvertServiceModule,
    AdvertTxtModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: []
})
export class StartHomeAdModule { }
