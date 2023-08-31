/**
 *  登入首頁-投資理財
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// -- Other Lib -- //
import { FormateService } from '@template/formate/formate.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { FundOverviewService } from '@pages/fund/shared/fund-overview.service';

@Component({
    selector: 'app-home-fund',
    templateUrl: './home-fund.component.html',
    styleUrls: [],
    providers: []
})
export class HomeFundComponent implements OnInit {
    @Input() templateType = ''; // 顯示畫面模式
    mainData = {
        "show": false,
        "emptyFund": false, // 有無基金資料
        "totccy": "TWD", // 目前固定
        "totosamt": "", // 信託餘額
        "totPrice": "", // 參考現值
        "noProc": "", // 未實現損益
        "apdint": "", // 累計配息
        "baoChou": "", // 報酬率
        "intretn": "" // 含息報酬率
    };
    showData = false;
    showErrorMsg = ''; // 整體錯誤訊息
    haveFund = false; // 信託戶判斷
    haveFundAllow = true; // 允許顯示基金資料
    private loginFlag = false; // 是否已登入
    private allData: any;
    private loadingStr = 'HOME.INFO.LOADING'; // 載入中

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private mainService: FundOverviewService,
        private navavgator: NavgatorService,
        private auth: AuthService
    ) { 
    }

    ngOnInit() {
        if (this.auth.checkIsLoggedIn()) {
            this.loginFlag = true;
            this.haveFund = true;
            this.haveFundAllow = this.auth.checkAllowAuth('fundService');
            this._logger.error('111', this.haveFundAllow);
            if (this.haveFundAllow) {
                if (!!this.haveFund) {
                    this.getData();
                } else {
                    // 非信託戶
                    this.checkIsEmpty();
                }
            }

        } else {
            // 沒登入
            this.loginFlag = false;
            this.haveFund = false;
            this.checkIsEmpty();
        }
    }

    
    /**
     * 看更多
     */
    onMore(type?: string) {
        if (this.mainData.emptyFund || type == 'finance') {
            // 得獎基金
            this.navavgator.push('fund-finance');
        } else {
            // 基金首頁
            this.navavgator.push('fund-overview');
        }
    }

    /**
     * 立即申購
     */
    onInvest() {
        this.navavgator.push('fund-invest');
    }

    /**
     * 立即申購
     * 待網銀提供鏈結後開放
     */
    onApply() {
        // 目前APP沒有，網銀要登入才能線上開戶(網銀可提供連結後引導登入的位置，待提供)
        this.navavgator.push('fund-apply-open');
    }

    /**
     * 取資料
     */
    private async getData() {
        this._logger.step('Home', 'HomeFund getData');
        this.showData = false;
        this.showErrorMsg = this.loadingStr;
        try {
            let resObj = await this.mainService.getFundTotal({ background: true });
            this._logger.step('Home', 'HomeFund success', resObj);
            this.allData = resObj;
            this.mainData.show = (!!resObj.status) ? true : false;
            let tmp_main = this._formateService.checkObjectList(resObj, 'data');
            let have_fund_allow = this._formateService.checkObjectList(tmp_main, 'haveFundAllow');
            if (!have_fund_allow) {
                this.haveFund = false;
            }
            if (!!resObj.status) {
                // 有資料
                this.mainData.emptyFund = (!!tmp_main.emptyFund) ? true : false;
                this.mainData.totccy = this._formateService.checkField(tmp_main, 'totccy');
                this.mainData.totosamt = this._formateService.checkField(tmp_main, 'totosamt');
                this.mainData.totPrice = this._formateService.checkField(tmp_main, 'totPrice');
                this.mainData.noProc = this._formateService.checkField(tmp_main, 'noProc');
                this.mainData.apdint = this._formateService.checkField(tmp_main, 'apdint');
                this.mainData.baoChou = this._formateService.checkField(tmp_main, 'baoChou');
                this.mainData.intretn = this._formateService.checkField(tmp_main, 'intretn');
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
        if (!this.loginFlag) {
            // 未登入
            this._logger.step('Home', 'HomeFund no Login');
            this.showData = false;
            this.showErrorMsg = 'HOME.MSG.NOLOGIN';
            return false;
        }
        if (!this.haveFund) {
            // 非信託戶顯示
            this._logger.step('Home', 'HomeFund no Fund');
            this.showData = false;
            this.showErrorMsg = 'HOME.FUND.NOFUND';
            return false;
        }
        if (!this.haveFundAllow) {
            // 非信託戶顯示
            this._logger.step('Home', 'HomeFund no Fund');
            this.showData = false;
            this.showErrorMsg = 'HOME.FUND.NOFUND';
            return false;
        }
        // 錯誤資料
        if (!this.mainData.show) {
            this.showData = false;
            this.showErrorMsg = 'HOME.FUND.ERROR';
        } else if (this.mainData.emptyFund) {
            // 沒基金資料
            this.showData = false;
            this.showErrorMsg = 'HOME.FUND.EMPTY';
        } else {
            this.showData = true;
        }
        this._logger.step('Home', 'HomeFund End', this.showData);
    }



}
