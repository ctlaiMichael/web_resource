/**
 * 國外匯入匯款 Service Module
 */
import { NgModule } from '@angular/core';

// ---------------- Service Start ---------------- //
import { ForeignIrService } from '@pages/deposit/shared/foreign-ir.service';
// ---------------- API Start ---------------- //
import { SPEC06010101ApiService } from '@api/spec06/spec06010101/spec06010101-api.service';
import { SPEC06010102ApiService } from '@api/spec06/spec06010102/spec06010102-api.service';


@NgModule({
    imports: [
    ],
    providers: [
        // ---------------- API Start ---------------- //
        SPEC06010101ApiService,
        SPEC06010102ApiService,
        // ---------------- Service Start ---------------- //
        ForeignIrService
    ],
    declarations: [
    ]
})
export class ForeignIrServiceModule { }
