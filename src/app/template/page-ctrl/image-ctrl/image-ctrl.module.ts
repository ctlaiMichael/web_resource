/**
 * 圖片控制機制
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCtrlDirective } from '@template/page-ctrl/image-ctrl/image-ctrl.directive';

/**
 * 模組清單
 */
const Modules = [
  CommonModule
];
const Provider = [
];
const DIRECTIVES = [
  ImageCtrlDirective
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
export class ImageCtrlModule { }
