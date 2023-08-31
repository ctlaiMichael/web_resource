/**
 * 快速設定Module
 */
// == 基本設定 == //
import { NgModule } from '@angular/core';

// ---------------- Module Start ---------------- //
import { FastSettingRoutingModule } from './fast-setting-routing.module';
import { SharedModule } from '@systems/shared.module';
import { StepBarModule } from '@template/stepbar/step-bar.module';
import { ResultStatusTempModule } from '@template/result/result-temp.module';
import { CountDownModule } from '@template/count-down/count-down.module';
import { PatternLockModule } from '@lib/pattern/pattern-lock.module';
import { BiometricModule } from '@lib/biometric/biometric.module';

// ---------------- Pages Start ---------------- //
import { FastSettingComponent } from './main/fast-setting-main.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceBindComponent } from './device-bind/device-bind.component';

// ---------------- API Start ---------------- //
import { SPEC03010101ApiService } from '@api/spec03/spec03010101/spec03010101-api.service';
import { SPEC03020101ApiService } from '@api/spec03/spec03020101/spec03020101-api.service';
import { SPEC03020201ApiService } from '@api/spec03/spec03020201/spec03020201-api.service';
import { SPEC03030101ApiService } from '@api/spec03/spec03030101/spec03030101-api.service';

// ---------------- Service Start ---------------- //
import { DeviceBindService } from '../shared/service/device-bind.service';
import { DeviceListService } from '../shared/service/device-list.service';
import { CheckDeviceBindService } from '@systems/system/init/check-device-bind.service';

@NgModule({
    imports: [
        SharedModule,
        FastSettingRoutingModule,
        StepBarModule,
        ResultStatusTempModule,
        CountDownModule,
        PatternLockModule,
        BiometricModule
    ],
    providers: [
        // ---------------- Service Start ---------------- //
        DeviceBindService,
        DeviceListService,
        CheckDeviceBindService,
        SPEC03010101ApiService,
        SPEC03020101ApiService,
        SPEC03020201ApiService,
        SPEC03030101ApiService
    ],
    declarations: [
        // ---------------- Pages Start ---------------- //
        FastSettingComponent,
        DeviceListComponent,
        DeviceBindComponent
    ]
})
export class FastSettingModule { }