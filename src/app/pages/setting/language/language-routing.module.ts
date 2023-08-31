/**
 * Route定義
 * 語言
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// ---------------- Pages Start ---------------- //
import { LanguageChangeComponent } from './language-change/language-change.component';

const routes: Routes = [
  { path: '', redirectTo: 'language-change', pathMatch: 'full' }
  , {
    path: 'language-change', component: LanguageChangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageRoutingModule { }
