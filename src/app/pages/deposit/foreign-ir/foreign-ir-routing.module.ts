/**
 * Route定義
 * 國外匯入款查詢
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { IrMainComponent } from './ir-main/ir-main.component';
import { IrDetailComponent } from './ir-detail/ir-detail.component';

const routes: Routes = [
  {
    path: 'main', component: IrMainComponent
  },
  {
    path: 'detail', component: IrDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForeignIrRoutingModule { }
