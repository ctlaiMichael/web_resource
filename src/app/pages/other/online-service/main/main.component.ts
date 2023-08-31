/**
 * 線上客服
 */
import { Component, OnInit } from '@angular/core';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { Tels } from '@conf/tel';
import { Logger } from '@systems/system/logger/logger.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})

export class MainComponent implements OnInit {

  constructor(
    private navgator: NavgatorService,
    private confirm: ConfirmService,
    private log : Logger,
  ) { }

  ngOnInit() {

  }

  //外連智能客服
  click1(){
    this.navgator.push("robot");
  }
  
  //客服專線    設定檔案為tel.ts
  click2(){
    let tel = {
      name: '',
      show_tel: '',
      tel: ''
    };
    if (!!Tels.custServiceTel) {
      tel = Tels.custServiceTel;
    }
    this.confirm.show('POPUP.TELPHONE.TEL_NOTICE', {
      title: 'POPUP.TELPHONE.TEL_TITEL',
      btnYesTitle : 'POPUP.TELPHONE.BTNYESTITLE',
      contentParam: {
        telName: tel.name,
        telnumber: tel.tel
      }
    }).then(
      (res) => {
        window.open('tel:' + tel.tel);
      },
      (error) => { });
  }

}
