/**
 * [樣版] 注意事項
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { NotePopupModule } from '@template/msg/note-popup/note-popup.module';
// == 其他template清單 == //
import { NoteComponent } from '@template/note/note.component';
import { AfterTransNoteComponent } from '@template/note/after-trans-note/after-trans-note.component';
import { TransNoteComponent } from '@template/note/trans-note/trans-note.component';

// == 其他template清單 == //
const TemplateList = [
  NoteComponent
  , AfterTransNoteComponent // 交易結果注意資訊
  , TransNoteComponent // 營業日注意資訊
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule,
    NotePopupModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: []
})
export class NoteModule { }
