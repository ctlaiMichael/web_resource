import { NgModule } from '@angular/core';
import { DemoRoutingModule } from './demo-routing.module';
import { SharedModule } from '@systems/shared.module';
import { AlertModule } from '@template/msg/alert/alert.module';
import { AutoLogoutModule } from '@template/msg/auto-logout/auto-logout.module';
import { ConfirmModule } from '@template/msg/confirm/confirm.module';
import { CurrencyFlagPopupModule } from '@template/list/currency-flag/currency-flag-popup.module';
import { DateSelectModule } from '@template/list/date-select-popup/date-select.module';
import { DatepickerPopComponentModule } from '@template/list/datepicker-pop/datepicker-pop-component.module';
import { InfomationModule } from '@template/msg/infomation/infomation.module';
import { MenuPopupModule } from '@template/list/menu-popup/menu-popup.module';
import { InputDateComponentModule } from '@template/date/input-date/input-date-component.module';
import { MenuTempModule } from '@template/list/menu/menu-temp.module';
// ---------------- Pages Start ---------------- //
import { DemoMenuComponent } from '@pages/demo/demo-menu/demo-menu.component';
import { BiometricLibService } from '@lib/biometric/biometric-lib.service';
import { BiometricInterfaceService } from '@lib/biometric/biometric-interface.service';


// ---------------- API Start ---------------- //


// ---------------- Service Start ---------------- //


@NgModule({
  imports: [
    SharedModule,
    DemoRoutingModule,
    AlertModule,
    AutoLogoutModule,
    ConfirmModule,
    CurrencyFlagPopupModule,
    DateSelectModule,
    // FormateModule,
    DatepickerPopComponentModule,
    InfomationModule,
    MenuPopupModule,
    InputDateComponentModule,
    // StepBarModule,
    MenuTempModule
  ],
  providers: [
    // ---------------- Service Start ---------------- //
    BiometricLibService,
    BiometricInterfaceService


  ],
  declarations: [
    // ---------------- Pages Start ---------------- //
    DemoMenuComponent
  ]
})
export class DemoModule { }
