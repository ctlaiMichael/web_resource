/**
 * 系統核心載入程式
 */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ---------------- Service Module Start ---------------- //
import { ApiServiceModule } from '@api/base/api-service.module'; // api模組
import { LayoutCtrlServiceModule } from '@systems/route/layout/layout-ctrl-service.module'; // 頁面控制模組
import { AuthModule } from './system/auth/auth.module';
// ---------------- Template Module Start ---------------- //
import { ConfirmModule } from '@template/msg/confirm/confirm.module';
import { AlertModule } from '@template/msg/alert/alert.module';
import { InitModule } from './system/init/init.module';

// ---------------- Service Start ---------------- //
import { Logger } from '@systems/system/logger/logger.service';
import { SelectivePreloadingStrategy } from './route/selective-preloading-strategy';
import { InAppBrowserService } from '@lib/link/plugins/in-app-browser/in-app-browser.service';
import { AppCtrlService } from './system/app-ctrl/app-ctrl.service';
// ---------------- Storage Service Start ---------------- //
import { CacheService } from '@systems/system/cache/cache.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { SessionStorageService } from '@lib/storage/session-storage.service';
// ---------------- System Service Start ---------------- //
// import { SystemParameterService } from '@systems/system/system-parameter/system-parameter.service';
import { DeviceService } from '@lib/device/device.service';
import { LoginRequired } from './system/auth/login-required.service';
import { LogoutRequired } from './system/auth/logout-required.service';
import { PushPluginService } from '@lib/push/plugins/push-plugin.service'; // Push
import { SystemParameterServiceModule } from './system/system-parameter/system-parameter.service.module';
import { CryptoService } from '@lib/crypto/crypto.service';
import { ExitAppService } from '@lib/exit-app/exit-app.service';

const PROVIDERS = [
  Logger,
  SelectivePreloadingStrategy,
  InAppBrowserService,
  LoginRequired,
  LogoutRequired,
  AppCtrlService,
  // ---------------- System Service Start ---------------- //
  // SystemParameterService,
  DeviceService,
  PushPluginService,
  CryptoService,
  ExitAppService,
  // ---------------- Storage Service Start ---------------- //
  LocalStorageService,
  SessionStorageService,
  CacheService
];
  
const COMPONENTS = [
];

const DIRECTIVES = [
];

const LIBRARY = [
  ApiServiceModule,
  LayoutCtrlServiceModule,
  AuthModule,
  InitModule
];

const LIB_COMPONENT = [
  ConfirmModule,
  AlertModule,
  SystemParameterServiceModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ...LIBRARY,
    ...LIB_COMPONENT,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  providers: [
    ...PROVIDERS
  ],
  declarations: [
    ...COMPONENTS
  ],
  // For AppComponent
  exports: [
    ...DIRECTIVES
  ]
})
export class SystemsModule { }