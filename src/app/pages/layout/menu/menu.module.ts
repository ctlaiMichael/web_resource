/**
 * 全部功能選單
 */
import { NgModule } from '@angular/core';
// ---------------- Model Start ---------------- //
import { SharedModule } from '@systems/shared.module';
import { ExpandListModule } from '@template/expand/expand-list.module';

// ---------------- Pages Start ---------------- //
import { MenuComponent } from './menu.component';

// ---------------- API Start ---------------- //
// ---------------- Service Start ---------------- //
// ---------------- Shared Start ---------------- //

@NgModule({
  imports: [
    SharedModule,
    ExpandListModule
  ],
  exports: [
    MenuComponent
  ],
  declarations: [
    MenuComponent
  ]
})
export class MenuModule { }
