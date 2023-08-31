import { NgModule } from '@angular/core';
import { CountDownComponent } from './count-down.component';

@NgModule({
  imports: [
    
  ],
  declarations: [
    CountDownComponent
  ],
  providers: [
    
  ],
  entryComponents: [
    // Needs to be added here because otherwise we can't
    // dynamically render this component at runtime
    CountDownComponent
  ],
  exports: [
    CountDownComponent
  ]
})
export class CountDownModule { }
