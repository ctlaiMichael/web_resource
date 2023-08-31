import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FooterOptions } from './footer-options';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';

@Injectable({
  providedIn: 'root'
})
export class FooterCtrlService {
  changeFooterOption: Subject<any> = new Subject<any>();

  constructor(
    private headerCtrl: HeaderCtrlService
  ) {
    
  }

  /**
   * 設定Footer樣式
   * @param option Footer設定
   */
  setFooterOption(option, isCreate?: boolean) {
    this.changeFooterOption.next(option);
  }

  /**
   * 開啟footer
   */
  openFooter() {
    let option = {
      displayFooter: true
    };
    this.changeFooterOption.next(option);
  }

  /**
   * 關閉footer
   */
  closeFooter() {
    let option = {
      displayFooter: false
    };
    this.changeFooterOption.next(option);
  }

}
