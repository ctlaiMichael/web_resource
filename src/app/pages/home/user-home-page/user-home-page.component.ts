/**
 * 登入後首頁
 */
import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { CommonUtil } from '@util/common-util';
import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { logger } from '@util/log-util';
import { AuthService } from '@systems/system/auth/auth.service';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: []
})

export class UserHomePageComponent implements OnInit, OnDestroy, AfterViewInit {
  // 安控設定檔
  setSecurity = {
    transServiceId: 'FC00001', // 交易結果電文
    nameOfSecurity: 'TWDTRANSFERNOAGGREMENT', // 交易權限設定
    inAccount: '', // 轉入帳號
    outAccount: '', // 轉出帳號
    currency: '', // 幣別
    amount: '', // 轉帳金額
  };

  // 控制安控送出的變數
  securityAction = { method: 'init' };
  // 目前安控方法的物件 { name: '手機確認碼認證', id: '2', checkList: [ 'otp'], inputValue: true  },
  currentSecurityObj = {};

  constructor(
    private _logger: Logger,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }


  ngOnDestroy() {

  }

  ngAfterViewInit() {

  }

  submitSecurity(bakSecurityObj?) {
    if (!bakSecurityObj){
      // 送出按鈕
      this.securityAction = { method: 'submit' };
    } else {
      // 送出後回傳安控物件一路帶回
      // EX: this.mainService.send(resdata,bakSecurityObj).......;

    }
  }

  // 安控反回現在選擇類型 
  getCurrentTypeObj(currentTypeObj) {
    this.currentSecurityObj = currentTypeObj;
  }

}
