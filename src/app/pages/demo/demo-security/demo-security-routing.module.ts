import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoSecurityComponent } from './demo-security.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  // 登入後首頁
  {
    path: 'main', component: DemoSecurityComponent
    , data: {}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoSecurityRoutingModule { }
