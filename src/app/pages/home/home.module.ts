/**
 * 啟動首頁(未登入前首頁)
 */
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@systems/shared.module';

import { HomePageComponent } from './home-page/home-page.component';
// -- other component -- //
import { StartHomeAdModule } from '@template/advert/start-home-ad/start-home-ad.module'; // 廣告

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    StartHomeAdModule
  ],
  providers: [
  ],
  declarations: [
    HomePageComponent
  ]
})
export class HomeModule { }
