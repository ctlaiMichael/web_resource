/**
 * 外幣資產總攬清單
 */
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CurrencyListPopupService } from './currency-list-popup.service';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyListPopupComponent } from './currency-list-popup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormateModule } from '@template/formate/formate.module';
import { FlagFormateModule } from '@template/formate/view/flag/flag-formate.module';

@NgModule({
  imports: [
    OverlayModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    FormateModule,
    FlagFormateModule
  ],
  declarations: [
    CurrencyListPopupComponent
  ],
  providers: [
    CurrencyListPopupService
  ],
  entryComponents: [
    // Needs to be added here because otherwise we can't
    // dynamically render this component at runtime
    CurrencyListPopupComponent
  ]
})
export class CurrencyListPopupModule { }
