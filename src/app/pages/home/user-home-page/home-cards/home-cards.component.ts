/**
 *  登入首頁-信用卡區塊
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- Other Lib -- //
import { FormateService } from '@template/formate/formate.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AuthService } from '@systems/system/auth/auth.service';
// -- data -- //
import { CardOverviewService } from '@pages/card/shared/card-overview.service';

@Component({
    selector: 'app-home-cards',
    templateUrl: './home-cards.component.html',
    styleUrls: [],
    providers: []
})
export class HomeCardsComponent implements OnInit {
    @Input() templateType = ''; // 顯示畫面模式
    mainData = {
        // 未出帳
        unPaid: {
            show: false,
            icon: 'i_credit_money',
            data: '',
            error: ''
        },
        // 應繳餘額
        pay: {
            show: false,
            icon: 'i_credit_money',
            // icon: 'i_credit_point',
            data: '',
            error: ''
        },
        // 紅利 (第一階段無資料)
        bonus: {
            show: false,
            icon: 'i_credit_point',
            data: '',
            error: ''
        }
    };
    showData = false;
    showErrorMsg = ''; // 整體錯誤訊息
    haveCard = false; // 卡友判斷
    hideData = false; // 隱碼處理
    private loginFlag = false; // 是否已登入
    private allData: any;
    private loadingStr = 'HOME.INFO.LOADING'; // 載入中

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private mainService: CardOverviewService,
        private navgator: NavgatorService,
        private auth: AuthService
    ) { 
    }

    ngOnInit() {
        this.hideData = false;
        if (this.auth.checkIsLoggedIn()) {
            this.loginFlag = true;
            this.hideData = this.mainService.getHiddenAcct();
            this.haveCard = this.auth.checkAllowAuth('isCardUser');
            if (!!this.haveCard) {
                this.getData();
            } else {
                // 非卡友
                this.checkIsEmpty();
            }
        } else {
            // 沒登入
            this.loginFlag = false;
            this.haveCard = false;
            this.checkIsEmpty();
        }
    }

    
    /**
     * 看更多
     */
    onMore() {
        this.navgator.push('card-overview');
    }

    /**
     * 立即申請
     */
    onApply() {
        this.navgator.push('applycard');
    }

    /**
     * 點擊未出帳消費 明細按鈕
     */
    onGoDetail() {
        this.navgator.push('history-bill-unPaid');
    }

    
    /**
     * 資產顯示/隱藏: 目前不提供
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
        this._logger.step('Home', 'HomeCards getData');
        this.showData = true;
        this.showErrorMsg = this.loadingStr;
        this.setError(this.loadingStr, 'all');
        try {
            let resObj = await this.mainService.getUnpaidData();
            this._logger.step('Home', 'HomeCards success', resObj);
            this.allData = resObj;

            // 資料處理
            let total_info = this._formateService.checkObjectList(resObj, 'totalInfo');
            this.mainData.unPaid.show = (!!total_info.consume) ? true : false;
            this.mainData.unPaid.data = this._formateService.checkField(total_info, 'totalConsume');
            this.mainData.pay.data = this._formateService.checkField(total_info, 'totalStmBal');
            this.mainData.pay.show = (!!this.mainData.pay.data) ? true : false;

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
     * 檢核無資料
     */
    private checkIsEmpty() {
        if (!this.loginFlag) {
            // 未登入
            this._logger.step('Home', 'HomeFund no Login');
            this.showData = false;
            this.showErrorMsg = 'HOME.MSG.NOLOGIN';
            return false;
        }
        if (!this.haveCard) {
            // 非卡友顯示
            this._logger.step('Home', 'HomeCards no Card');
            this.showData = false;
            this.showErrorMsg = 'HOME.CARDS.NOCARD';
            return false;
        }
        // 錯誤資料
        if (!this.mainData.unPaid.show
            && !this.mainData.pay.show
            // && !this.mainData.bonus.show
        ) {
            this.showData = false;
            this.showErrorMsg = 'HOME.CARDS.ERROR';
        } else {
            this.showData = true;
        }
        this._logger.step('Home', 'HomeCards End', this.showData);
    }

    /**
     * 設定錯誤回傳
     * @param str 
     * @param indexItem 
     */
    private setError(str: string, indexItem?: string) {
        if (!!indexItem && indexItem != 'all')  {
            // 指定功能
            if (!!this.mainData[indexItem]) {
                this.mainData[indexItem]['error'] = str;
            }
        } else {
            // 全部設定
            this.mainData.unPaid.error = str;
            this.mainData.pay.error = str;
            this.mainData.bonus.error = str;
        }
    }



}
