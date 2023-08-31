/**
 * Route定義
 * 立即轉定存
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { CompositToTimeMainComponent } from './composit-to-time-main/composit-to-time-main.component';
import { CompositToTimeModifyComponent } from './composit-to-time-modify/composit-to-time-modify.component';

const routes: Routes = [
  {
    path: 'main', component: CompositToTimeMainComponent,
  },
  {
    path: 'modify', component: CompositToTimeModifyComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompositToTimeRoutingModule { }
