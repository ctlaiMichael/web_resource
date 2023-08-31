import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { LogoutRequired } from '@systems/system/auth/logout-required.service';
import { LoginRequired } from '@systems/system/auth/login-required.service';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: HomePageComponent
    , canActivate: [LogoutRequired]
  }
  // 登入後首頁
  , {
    path: 'user-home', loadChildren: './user-home-page/user-home-page.module#UserHomePageModule'
    , canActivate: [LoginRequired]
    , data: {
      preload: true
    }
  }
  , {
    path: 'homepageagree', loadChildren: './home-page-agree/home-page-agree.module#HomePageAgreeModule'
    , canActivate: []
    , data: {
      preload: true
    }
  }
  , {
    path: '**', // any other
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
