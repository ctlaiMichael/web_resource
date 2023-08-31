/**
 * 廣告取得機制
 */
import { NgModule } from '@angular/core';
import { SPEC01010101ApiService } from '@api/spec01/spec01010101/spec01010101-api.service';
import { SPEC01010102ApiService } from '@api/spec01/spec01010102/spec01010102-api.service';
import { AdvertService } from './advert.service';

// == 其他template清單 == //
const TemplateList = [
];

@NgModule({
  imports: [
  ],
  providers: [
    SPEC01010101ApiService,
    SPEC01010102ApiService,
    AdvertService
  ],
  declarations: [
  ]
})
export class AdvertServiceModule { }
