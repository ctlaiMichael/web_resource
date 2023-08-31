/**
 * [樣版] 安控介面
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';
import { PatternLockService } from './pattern-lock.service';
import { PatternLockComponent } from './pattern-lock.component';
import { PatternLockPopupService } from './pattern-lock-popup.service';


// == 其他template清單 == //
const TemplateList = [
  PatternLockComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FormateModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [PatternLockService, PatternLockPopupService]
})
export class PatternLockModule { }
