/**
 * 啟動 module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiometricModule } from '@lib/biometric/biometric.module';

import { InitService } from '@systems/system/init/init.service';
import { UrlSchemeHandlerService } from './url-scheme-handler.service';
// -- 版本檢核 -- //
import { CheckVersionService } from './check-version.service';
import { SPEC01030101ApiService } from '@api/spec01/spec01030101/spec01030101-api.service'; // 版本同步
// -- 裝置檢核 -- //
import { CheckDeviceBindService } from './check-device-bind.service';
import { SPEC03040101ApiService } from '@api/spec03/spec03040101/spec03040101-api.service'; // 裝置檢核
import { TrustedDeviceService } from '@lib/security/trusted-device/trusted-device.service';
import { DeviceListService } from '@pages/setting/shared/service/device-list.service';
import { SPEC03020101ApiService } from '@api/spec03/spec03020101/spec03020101-api.service';
import { SPEC03020201ApiService } from '@api/spec03/spec03020201/spec03020201-api.service';
import { SPEC03030101ApiService } from '@api/spec03/spec03030101/spec03030101-api.service';

@NgModule({
  imports: [
    CommonModule,
    BiometricModule
  ],
  providers: [
    UrlSchemeHandlerService,
    // -- check version -- //
    CheckVersionService,
    SPEC01030101ApiService,
    // -- device-bind -- //
    CheckDeviceBindService,
    SPEC03040101ApiService,
    InitService,
    TrustedDeviceService,
    DeviceListService,
    SPEC03020101ApiService,
    SPEC03020201ApiService,
    SPEC03030101ApiService
  ],
  declarations: [  ]
})
export class InitModule {}
