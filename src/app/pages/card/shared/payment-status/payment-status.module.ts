/**
 * 繳費狀況資訊(EX: 已繳)
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentStatusComponent } from './payment-status.component';
import { PaymentStatusService } from './payment-status.service';
import { SharedModule } from '@systems/shared.module';


const TemplateList = [
    PaymentStatusComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ...TemplateList
  ],
  declarations: [
    ...TemplateList
  ],
  providers: [
    PaymentStatusService
  ]
})
export class PaymentStatusModule { }
