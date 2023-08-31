import { Injectable } from '@angular/core';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {
  public isOpened: boolean;
  public setOpened: boolean;
  constructor(
    private headerCtrl: HeaderCtrlService
  ) {
    this.isOpened = false;
    this.setOpened = false;
  }

  open() {
    this.isOpened = true;
    // this.headerCtrl.displayNavSliderFrame(true);
    document.body.classList.add('menu_open');
  }

  close() {
    this.isOpened = false;
    // this.headerCtrl.displayNavSliderFrame(false);
    document.body.classList.remove('menu_open');
  }

  toggle() {
    if (this.isOpened) {
      this.close();
    } else {
      this.open();
    }
  }

  headerSetOpen() {
    this.setOpened = true;
  }

  headerSetClose() {
    this.setOpened = false;
  }
}
