/**
 * 語言Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { LanguageRoutingModule } from './language-routing.module';
import { TranslateModule } from '@ngx-translate/core';

// ---------------- Pages Start ---------------- //
import { LanguageChangeComponent } from './language-change/language-change.component';

// ---------------- API Start ---------------- //

// ---------------- Service Start ---------------- //
import { SharedModule } from '@systems/shared.module';

@NgModule({
    imports: [
        SharedModule,
        LanguageRoutingModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        LanguageChangeComponent
    ]
})
export class LanguageModule { }