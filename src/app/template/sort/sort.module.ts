/**
 * 排序機制
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortBtnDirective } from './sort-btn.directive';


/**
 * 模組清單
 */
const Modules = [
  CommonModule
];
const Provider = [
];
const DIRECTIVES = [
  SortBtnDirective
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
export class SortModule { }
