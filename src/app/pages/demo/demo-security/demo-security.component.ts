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
import { BiometricInterfaceService } from '@lib/biometric/biometric-interface.service';

@Component({
  selector: 'app-demo-security',
  templateUrl: './demo-security.component.html',
  styleUrls: []
})

export class DemoSecurityComponent implements OnInit, OnDestroy, AfterViewInit {
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
  oobject = {'body':{detail:[{key:'1',value:'2'},{key:'2',value:'3'},{key:'3',value:'4'}]}};
  constructor(
    private _logger: Logger,
    private auth: AuthService,
    private BioService:BiometricInterfaceService
  ) { }

  ngOnInit() {
  }


  ngOnDestroy() {

  }

  ngAfterViewInit() {

  }

  submitSecurity() {
    this.securityAction = { method: 'submit' };
  }

  // 安控反回現在選擇類型 
  getCurrentTypeObj(currentTypeObj) {
    this.currentSecurityObj = currentTypeObj;
  }


  async queryBioService(){
    try {
      let aa = await this.BioService.queryBioService();
      this._logger.log(aa);
    } catch (error) {
      this._logger.log(error);
    }
  }


  async registerBiometric(){
    try {
      let aa = await this.BioService.registerBiometric();
      this._logger.log('1',aa);
    } catch (error) {
      this._logger.log('2',error);
    }
  }


  

  async requestBioService(singnobj){
    try {
      let aa = await this.BioService.requestBioService(singnobj);
      this._logger.log(aa);
    } catch (error) {
      this._logger.log(error);
    }
  }

  async identifyByBiometric(){
    try {
      let aa = await this.BioService.identifyByBiometric();
      this._logger.log(aa);
    } catch (error) {
      this._logger.log(error);
    }
  }

  async enableBioService(){
    try {
      let aa = await this.BioService.enableBioService();
      this._logger.log(aa);
    } catch (error) {
      this._logger.log(error);
    }
  }

  async disableBioService(){
    try {
      let aa = await this.BioService.disableBioService();
      this._logger.log(aa);
    } catch (error) {
      this._logger.log(error);
    }
  }

}
