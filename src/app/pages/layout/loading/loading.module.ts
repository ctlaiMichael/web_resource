
/**
 * loading 控制
 * ModuleWithProviders => 不需使用
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '@pages/layout/loading/loading.component';
import { LoadingService } from '@pages/layout/loading/loading.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  providers: [LoadingService]
})
export class LoadingModule {
}
