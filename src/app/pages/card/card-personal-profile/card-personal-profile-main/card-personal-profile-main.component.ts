/**
 * 信用卡現況查詢
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { CardPersonalProfileService } from '@pages/card/shared/card-personal-profile.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';

@Component({
  selector: 'app-card-personal-profile',
  templateUrl: './card-personal-profile-main.component.html',
  styleUrls: []
})

export class CardPersonalProfileMainComponent implements OnInit {
  infoData: any; // 現況資訊

  constructor(
    private _logger: Logger,
    private _mainSevice: CardPersonalProfileService,
    private navgator: NavgatorService
  ) { }

  ngOnInit() {
    this._logger.log("into CardPersonalProfileMainComponent");
    this.doSendProfile();
  }

  // 發送信用卡現況查詢
  doSendProfile() {
    this._logger.log("doSendProfile");
    this._mainSevice.getCardProfile({}).then(
      (result) => {
        this._logger.log("doSendProfile, result:", result);
        this.infoData = result.infoData;
      },
      (errorObj) => {
        this._logger.log("doSendProfile, errorObj:", errorObj);
      }
    );
  }

  // 繳卡費
  onCardPay() {
    this._logger.log("into onCardPay");
    this.navgator.push('pay-credit-payable');
  }

  // 帳單查詢
  onBillQuery() {
    this._logger.log("into onBillQuery");
    this.navgator.push('history-bill-main');
  }
}
