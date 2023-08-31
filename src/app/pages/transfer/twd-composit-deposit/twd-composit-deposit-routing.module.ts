/**
 * Route定義
 * 台幣綜存及定存
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //

const routes: Routes = [
  // == 綜存開戶約定 == //
  {
    path: 'composit-deposit-agree', loadChildren: './composit-deposit-agree/composit-deposit-agree.module#CompositDepositAgreeModule'
    , data: {
      preload: false
    }
  }
  // == 立即轉定存 == //
  , {
    path: 'composit-to-time', loadChildren: './composit-to-time/composit-to-time.module#CompositToTimeModule'
    , data: {
      preload: false
    }
  }
  // == 自動轉定存 == //
  , {
    path: 'auto-composit-to-time', loadChildren: './auto-composit-to-time/auto-composit-to-time.module#AutoCompositToTimeModule'
    , data: {
      preload: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwdCompositDepositRoutingModule { }
