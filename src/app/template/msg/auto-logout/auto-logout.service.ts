import { Injectable } from '@angular/core';
import { PopupBaseService } from '@conf/popup/popup-base.service';
import { AutoLogoutComponent } from './auto-logout.component';

@Injectable()
export class AutoLogoutService extends PopupBaseService<AutoLogoutComponent> {

  init() {
  }

  show(deadline: number): Promise<boolean> {
    const component = this.createComponent(AutoLogoutComponent);
    component.deadline = deadline;
    component.promise.then(this.destroy, this.destroy);
    component.start();
    return component.promise;
  }

}
