/**
 * 頁面控制機制
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtShowDirective } from './page-ctrl.directive';
import { BottomBtnDirective } from '@template/page-ctrl/bottom-btn.directive';
import { SwiperCtrlDirective } from '@template/page-ctrl/swiper-ctrl.directive';

/**
 * 模組清單
 */
const Modules = [
  CommonModule
];
const Provider = [
];
const DIRECTIVES = [
  // 畫面區塊display控制
  HtShowDirective,
  // footer btn 按鈕控制
  BottomBtnDirective,
  // swiper 控制
  SwiperCtrlDirective
];

@NgModule({
  imports: [
    ...Modules
  ],
  providers: [
    ...Provider
  ],
  declarations: [
    ...DIRECTIVES
  ],
  exports: [
    ...DIRECTIVES
  ]
})
export class PageCtrlModule { }
