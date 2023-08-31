/**
 * 列表展開機制
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandListDirective } from './expand-list.directive';

/**
 * 模組清單
 */
const Modules = [
  CommonModule
];
const Provider = [
];
const DIRECTIVES = [
  ExpandListDirective
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
export class ExpandListModule { }
