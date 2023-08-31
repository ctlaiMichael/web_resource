/**
 * 取得伺服器系統參數與APP系統參數資訊
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SPEC00050101ApiService } from '@api/spec00/spec00050101/spec00050101-api.service';
import { SystemParameterService } from './system-parameter.service';



@NgModule({
  imports: [CommonModule],
  providers: [
    SPEC00050101ApiService,
    SystemParameterService
  ],
  declarations: [  ]
})
export class SystemParameterServiceModule {}
