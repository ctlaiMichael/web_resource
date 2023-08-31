/**
 * [樣版] 安控介面
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { SecurityInterfaceComponent } from './security-interface.component';
import { SecurityInterfaceService } from './security-interface.service';
import { SecurityOptions } from './security-options';
import { MenuPopupService } from '@template/list/menu-popup/menu-popup.service';
import { CountDownComponentModule } from '@template/countdown-timer/countdown/countdown-component.module';
import { SPEC00060201ApiService } from '@api/spec00/spec00060201/spec00060201-api.service';
import { CordovaService } from '@conf/cordova/cordova.service';
import { SessionStorageService } from '@lib/storage/session-storage.service';
import { BiometricModule } from '@lib/biometric/biometric.module';
import { InputCtrlModule } from '@template/input-ctrl/input-ctrl.module';




// == 其他template清單 == //
const TemplateList = [
  SecurityInterfaceComponent,
  //   CardSwiperDirective
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule,
    CountDownComponentModule,
    BiometricModule,
    InputCtrlModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
    SessionStorageService,
    CordovaService,
    SecurityInterfaceService,
    SecurityOptions, 
    MenuPopupService,
    SPEC00060201ApiService
     
  ],
})
export class SecurityInterfaceModule { }
