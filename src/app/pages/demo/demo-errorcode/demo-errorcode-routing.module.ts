import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoErrorCodeComponent } from './demo-errorcode.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // 登入後首頁
  {
    path: 'main', component: DemoErrorCodeComponent
    , data: {}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoErrorCodeRoutingModule { }
