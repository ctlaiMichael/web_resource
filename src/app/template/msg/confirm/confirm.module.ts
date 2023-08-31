import { NgModule } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ConfirmService } from './confirm.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormateModule } from '@template/formate/formate.module';

@NgModule({
  imports: [
    OverlayModule,
    TranslateModule, 
    FormateModule
  ],
  declarations: [
    ConfirmComponent
  ],
  providers: [
    ConfirmService
  ],
  entryComponents: [
    // Needs to be added here because otherwise we can't
    // dynamically render this component at runtime
    ConfirmComponent
  ]
})
export class ConfirmModule { }
