/**
 * 國外匯入款查詢Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';
// ---------------- Module Start ---------------- //
import { ForeignIrRoutingModule } from './foreign-ir-routing.module';
import { SharedModule } from '@systems/shared.module';
import { BookmarkModule } from '@template/bookmark/bookmark.module';
import { ExpandListModule } from '@template/expand/expand-list.module';
import { DateRangeSearchComponentModule } from '@template/date-range-search/date-range-search-component.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';
// ---------------- Pages Start ---------------- //
import { IrMainComponent } from './ir-main/ir-main.component';
import { IrDetailComponent } from './ir-detail/ir-detail.component';

// ---------------- API Start ---------------- //
// ---------------- Service Start ---------------- //
import { ForeignIrServiceModule } from '@pages/deposit/shared/foreign-ir-service.module';


@NgModule({
    imports: [
        SharedModule,
        ForeignIrRoutingModule,
        ExpandListModule,
        BookmarkModule, // 頁籤套件
        FlagFormateModule,
        DateRangeSearchComponentModule,
        ForeignIrServiceModule
    ],
    providers: [
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        IrMainComponent,
        IrDetailComponent
    ]
})
export class ForeignIrModule { }
