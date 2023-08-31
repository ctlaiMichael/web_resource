import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoMenuComponent } from '@pages/demo/demo-menu/demo-menu.component';

// ---------------- Pages Start ---------------- //


const routes: Routes = [
  { path: '', redirectTo: 'demo-menu', pathMatch: 'full' },
  // Demo選單
  { path: 'demo-menu', component: DemoMenuComponent
    , data: {}
  },
  // demo popup
  { path: 'demo-popup', loadChildren: './demo-popup/demo-popup.module#DemoPopupModule'
    , data: {
      preload: false
    }
  },
  // demo security
  { path: 'demo-security', loadChildren: './demo-security/demo-security.module#DemoSecurityModule'
    , data: {
      preload: false
    }
  },
  // demo pattern
  { path: 'demo-pattern', loadChildren: './demo-pattern/demo-pattern.module#DemoPatternModule'
    , data: {
      preload: false
    }
  },
  // demo errorcode
  { path: 'demo-errorcode', loadChildren: './demo-errorcode/demo-errorcode.module#DemoErrorCodeModule'
    , data: {
      preload: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
