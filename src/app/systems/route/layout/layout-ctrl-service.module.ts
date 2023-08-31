/**
 * 頁面控制 模組
 */
import { NgModule } from '@angular/core';

// ---------------- Service Start ---------------- //
import { HeaderCtrlService } from './header/header-ctrl.service';
import { UiContentService } from './ui-content/ui-content.service';
import { LayoutCtrlService } from './layout-ctrl.service';
import { FooterCtrlService } from './footer/footer-ctrl.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

import { LeftMenuModule } from './left-menu/left-menu.module';

const PROVIDERS = [
    HeaderCtrlService,
    UiContentService,
    FooterCtrlService,
    HandleErrorService,
    LayoutCtrlService,
    NavgatorService
];

@NgModule({
    imports: [
        LeftMenuModule
    ],
    providers: [
        ...PROVIDERS
    ],
    declarations: [
    ]
})
export class LayoutCtrlServiceModule { }
