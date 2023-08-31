/**
 * 條款清單
 */
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
// import { NotePopupService } fro./term-popupserviceice';
import { TranslateModule } from '@ngx-translate/core';
// import { NotePopupComponent } from './note-popup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormateModule } from '@template/formate/formate.module';
import { SharedModule } from '@systems/shared.module';
import { TermPopupComponent } from './term-popup.component';
import { TermPopupService } from './term-popup.service';
import { FundInvestService } from '@pages/fund/shared/fund-invest.service';

@NgModule({
  imports: [
    OverlayModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    FormateModule,
    SharedModule
  ],
  declarations: [
    TermPopupComponent
  ],
  providers: [
    TermPopupService,
    FundInvestService
  ],
  entryComponents: [
    // Needs to be added here because otherwise we can't
    // dynamically render this component at runtime
    TermPopupComponent
  ]
})
export class TermPopupModule { }
