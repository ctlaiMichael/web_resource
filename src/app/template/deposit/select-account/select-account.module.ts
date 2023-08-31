/**
 * 
 */
import { NgModule } from '@angular/core';
import { SelectAccountComponent } from './select-account.component';
import { SelectAccountService } from './select-account.service';
import { SPEC00040101ApiService } from '@api/spec00/spec00040101/spec00040101-api.service';
import { SPEC00040801ApiService } from '@api/spec00/spec00040801/spec00040801-api.service';
import { SharedModule } from '@systems/shared.module';

const TemplateList = [
  SelectAccountComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
    SelectAccountService,
    SPEC00040101ApiService,
    SPEC00040801ApiService
  ]
})
export class SelectAccountModule { }
