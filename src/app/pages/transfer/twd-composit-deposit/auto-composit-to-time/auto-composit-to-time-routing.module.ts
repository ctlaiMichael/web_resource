/**
 * Route定義
 * 自動轉定存
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { AutoCompositToTimeMainComponent } from './auto-composit-to-time-main/auto-composit-to-time-main.component';
import { AutoCompositToTimeModifyComponent } from './auto-composit-to-time-modify/auto-composit-to-time-modify.component';

const routes: Routes = [
  {
    path: 'main', component: AutoCompositToTimeMainComponent,
  },
  {
    path: 'modify', component: AutoCompositToTimeModifyComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoCompositToTimeRoutingModule { }
