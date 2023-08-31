/**
 * poput information
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuPopupService } from './menu-popup.service';
import { TranslateModule } from '@ngx-translate/core';
import { MenuPopupComponent } from './menu-popup.component';
import { FormateModule } from '@template/formate/formate.module';
import { ErrorBoxModule } from '@template/msg/error-box/error-box.module';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , TranslateModule
    , FormateModule
    , ErrorBoxModule
  ],
  declarations: [
    MenuPopupComponent
  ],
  providers: [
    MenuPopupService
  ],
  exports: [
    MenuPopupComponent
  ],
  entryComponents: [
    // Needs to be added here because otherwise we can't
    // dynamically render this component at runtime
    MenuPopupComponent
  ]
})
export class MenuPopupModule { }
