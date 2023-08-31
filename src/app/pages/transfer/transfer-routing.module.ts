/**
 * Route定義
 * 轉帳交易服務
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ---------------- Pages Start ---------------- //

const routes: Routes = [
  // == 台幣轉帳 == //
  {
    path: 'twd-transfer', loadChildren: './twd-transfer/twd-transfer.module#TwdTransferModule'
    , data: {
      preload: false
    }
  }
  // == 台幣綜存及定存 == //
  , {
    path: 'twd-composit-deposit', loadChildren: './twd-composit-deposit/twd-composit-deposit.module#TwdCompositDepositModule'
    , data: {
      preload: false
    }
  }
  // == 外幣轉帳 == //
  , {
    path: 'foreign-transfer', loadChildren: './foreign-transfer/foreign-transfer.module#ForeignTransferModule'
    , data: {
      preload: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
