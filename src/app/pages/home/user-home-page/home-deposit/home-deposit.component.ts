/**
 *  登入首頁-帳戶區塊
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- Other Lib -- //
import { FormateService } from '@template/formate/formate.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { UserHomeService } from '@pages/home/shared/user-home/user-home.service';

@Component({
    selector: 'app-home-deposit',
    templateUrl: './home-deposit.component.html',
    styleUrls: [],
    providers: []
})
export class HomeDepositComponent implements OnInit {
    mainData = {
        show: false,
        data: '',
        error: ''
    };
    showData = false; // 顯示判斷
    showErrorMsg = ''; // 整體錯誤訊息
    haveAcct = false; // 網銀會員判斷
    hideData = false; // 隱碼處理
    private allData: any;
    private loadingStr = 'HOME.INFO.LOADING'; // 載入中

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private mainService: UserHomeService,
        private navavgator: NavgatorService,
        private auth: AuthService
    ) { 
    }

    ngOnInit() {
        if (this.auth.checkIsLoggedIn()) {
            this.hideData = this.mainService.getHiddenAcct();
            let isCardUser = this.auth.getRole('CARDHOLDER');
            // 卡友無帳戶!!!!!
            this.haveAcct = (isCardUser != '') ? false : true;
            if (!!this.haveAcct) {
                this.getData();
            } else {
                // 無帳戶顯示
                this.checkIsEmpty();
            }
        } else {
            // 沒登入
            this.haveAcct = false;
            this.checkIsEmpty();
        }
    }
    
    /**
     * 看更多: 帳戶總覽
     */
    onMore() {
        this.navavgator.push('overview');
    }

    /**
     * 立即申請: 線上開立數位存款帳戶
     */
    onApply() {
        this.navavgator.push('acocountonline');
    }

    /**
     * 帳戶資產顯示/隱藏
     */
    onHidden() {
        let now_status = this.hideData;
        if (this.hideData) {
            now_status = false;
        } else {
            now_status = true;
        }
        this.hideData = now_status;
        this.mainService.saveHiddenAcct(now_status);
    }


    /**
     * 取資料
     */
    private async getData() {
        this._logger.step('Home', 'HomeDeposit getData');
        this.showData = true;
        try {
            let resObj = await this.mainService.getTwdTotal({ background: true });
            this._logger.step('Home', 'HomeDeposit success', resObj);
            this.allData = resObj;
            this.mainData.show = true;
            this.mainData.data = this._formateService.checkField(resObj, 'totalData');
            let emptyAct = this._formateService.checkObjectList(resObj, 'emptyAct');
            if (!!emptyAct) {
                // 實際上應該以是否有帳戶為準
                this.haveAcct = false;
            }

            this.checkIsEmpty();
        } catch (errorObj) {
            // 取不到資料的例外處理
            // let error_msg = this._formateService.checkField(errorObj, 'content');
            // if (error_msg == '') {
            //     error_msg = this._formateService.checkField(errorObj, 'msg');
            // }
            this.checkIsEmpty();
        }
    }

    /**
     * 檢核無匯率資料
     */
    private checkIsEmpty() {
        if (!this.haveAcct) {
            // 無帳戶顯示
            this._logger.step('Home', 'HomeDeposit no Card');
            this.showData = false;
            this.showErrorMsg = 'HOME.DEPOSIT.NOACCT';
            return false;
        }
        // 錯誤資料
        if (!this.mainData.show) {
            this.showData = false;
            this.showErrorMsg = 'HOME.DEPOSIT.ERROR';
        } else {
            this.showData = true;
        }
        this._logger.step('Home', 'HomeDeposit End', this.showData);
    }


}
