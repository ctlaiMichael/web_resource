/**
 * 投資總覽
 */
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { FundOverviewService } from '@pages/fund/shared/fund-overview.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { FormateService } from '@template/formate/formate.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { AuthService } from '@systems/system/auth/auth.service';

@Component({
    selector: 'app-fund-overview',
    templateUrl: './fund-overview.component.html',
    styleUrls: []
})

export class FundOverviewComponent implements OnInit {
    haveFund = false; // 信託戶判斷
    infoData: any; // 所有資訊
    sumupInfo: any; // 合計資料(寫入我的基金資訊)
    hasData = false; // 是否取得資料
    errorMsg = ''; // 錯誤訊息

    // 選單設定
    menuList = {
        quick: [], // 快捷
        menu: [] // 選單
    };

    constructor(
        private _logger: Logger,
        private _mainService: FundOverviewService,
        private navgator: NavgatorService,
        private _formateService: FormateService,
        private _handleError: HandleErrorService,
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.menuList = this._mainService.getMenuList();
        if (this.auth.checkIsLoggedIn()) {
            this.haveFund = this.auth.checkAllowAuth('fundAllow');
            if (!!this.haveFund) {
                // 投資組合
                this.getInvestHealthy();
            } else {
                // 非信託戶
                this.checkIsEmpty();
            }
        } else {
            // 沒登入
            this.haveFund = false;
            this.checkIsEmpty();
        }

    }

    /**
     * 轉址事件
     * @param menu 選單事件 
     */
    onGoEvent(menu) {
        let go_path = this._formateService.checkField(menu, 'url');
        if (!go_path) {
            this._handleError.handleError({}, 'EMPTY_PATH');
            return false;
        }
        this.navgator.push(go_path);
    }


    // 發送投資合計/組合分析API 取得我的基金資料
    private getInvestHealthy() {
        this._mainService.getInvestHealthy({}, {background: true}).then(
            (result) => {
                this._logger.log("getInvestHealthy, result:", result);
                this.infoData = result.infoData;
                this.sumupInfo = result.sumupInfo; // 合計資料
                this._logger.log("getInvestHealthy, sumupInfo:", this.sumupInfo);
                this.checkIsEmpty();
            },
            (errorObj) => {
                this.hasData = false;
                this._logger.log("getInvestHealthy, errorObj:", errorObj);
                // this._handleError.handleError(errorObj);
                this.errorMsg = errorObj.content;
                this.checkIsEmpty();
            }
        );
    }

    
    /**
     * 檢核無匯率資料
     */
    private checkIsEmpty() {
        if (!this.haveFund) {
            // 非信託戶顯示
            this.hasData = false;
            return false;
        }
        // 錯誤資料
        if (!this.sumupInfo || this.sumupInfo.length <= 0) {
            this.hasData = false;
        } else {
            this.hasData = true;
        }
    }

}
