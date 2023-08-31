/**
 * 注意資訊
 */
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { NotePopupService } from './note-popup.service';
import { TranslateModule } from '@ngx-translate/core';
import { NotePopupComponent } from './note-popup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormateModule } from '@template/formate/formate.module';

@NgModule({
  imports: [
    OverlayModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    FormateModule
  ],
  declarations: [
    NotePopupComponent
  ],
  providers: [
    NotePopupService
  ],
  entryComponents: [
    // Needs to be added here because otherwise we can't
    // dynamically render this component at runtime
    NotePopupComponent
  ]
})
export class NotePopupModule { }
