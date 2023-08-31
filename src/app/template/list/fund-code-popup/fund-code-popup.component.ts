/**
 * 基金標的popup
 */
import { Component, OnInit } from '@angular/core';
import { FundCodeService } from './fund-code.service';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { TranslateService } from '@ngx-translate/core';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { StringCheckUtil } from '@util/check/string-check-util';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';

@Component({
    selector: 'app-fund-code-popup',
    templateUrl: './fund-code-popup.component.html',
    styleUrls: [],
    providers: []
})

export class FundCodePopupComponent implements OnInit {
    /**
     * 參數處理
     */
    title: string; // popup標題
    data?: Array<any> = [];
    promise: Promise<any>;
    selectComp: string; // 選擇之基金公司
    selectFund: string; // 選擇之基金標的
    investType: string; // '1': 台幣, '2': 外幣
    type: string;
    // 本頁相關
    info: any; // 資訊
    hasDetail = false; // 是否查詢到基金標的
    nowPage = 'comp'; // 現在選擇階段, 'comp': 公司, 'fund': 標的
    // 基金標的清單
    fundData = {
        fundCompId: '',
        fundCompName: '',
        data: []
    };
    foreignFundlist: any; // 外幣標的清單
    twdFundlist: any; // 台幣標的清單
    errorBoxMsg = ''; // 查詢錯誤訊息
    custIdRisk = 0; // 客戶風險等級
    custIdRiskName = ''; // 客戶風險等級(中文)
    // riskNotEnough = true; // 客戶風險等級是否符合, true: 符合, false: 不符合
    private riskNameList = {};
    searchText = ''; // 搜尋文字(ngModel)
    searchTwdData = []; // 搜尋台幣基金
    searchForeignData = []; // 搜尋外幣基金
    hasSearch = false;

    constructor(
        private mainService: FundCodeService,
        private _logger: Logger,
        private _handleError: HandleErrorService,
        private _formateService: FormateService,
        private confirm: ConfirmService,
        private translate: TranslateService,
        private layoutCtrl: LayoutCtrlService
    ) {
        this.promise = this.doPromise();
    }

    ngOnInit() {
        this._logger.log("FundCodePopupComponent, selectComp:", this.selectComp);
        this._logger.log("FundCodePopupComponent, selectFund:", this.selectFund);
        // 發api
        this.mainService.getFundCode().then(
            (result) => {
                this._logger.log("result:", result);
                this.foreignFundlist = result.foreignFundlist;
                this.twdFundlist = result.twdFundlist;
                // 處理搜尋相關資料
                let allTwd = result.allTwd;
                this.searchTwdData = this._formateService.checkObjectList(allTwd, 'fund_data'); // 台幣基金搜尋資料
                let allForeign = result.allForeign;
                this.searchForeignData = this._formateService.checkObjectList(allForeign, 'fund_data'); // 外幣基金搜尋資料
                this._logger.log("investType:", this.investType);
                this.data = this.investType == '1' ? this.twdFundlist : this.foreignFundlist;
                this.hasDetail = true; // 查詢到才顯示
                let infoData = result.infoData;
                let risk = this._formateService.checkField(infoData, 'custIdRisk'); // 客戶風險等級
                this.custIdRisk = parseInt(risk);
                switch (this.custIdRisk) {
                    case 1:
                        this.custIdRiskName = 'FUND_INVEST.FUND_RISK.LEVEL1';
                        break;
                    case 2:
                        this.custIdRiskName = 'FUND_INVEST.FUND_RISK.LEVEL2';
                        break;
                    case 3:
                        this.custIdRiskName = 'FUND_INVEST.FUND_RISK.LEVEL3';
                        break;
                    case 4:
                        this.custIdRiskName = 'FUND_INVEST.FUND_RISK.LEVEL4';
                        break;
                    default:
                        this._logger.log("has not custIdRiskName");
                        break;
                }

                // this.nowPage ='comp'; // api成功 顯示基金公司頁面
            },
            (errorObj) => {
                this._handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorBox'; // 錯誤頁面
                // return Promise.reject(errorObj);
            }
        );
    }

    chooseOver(item, type?) {
    }

    cancelClick() {
    }

    backClick() {
        if (this.nowPage == 'comp') {
            this.cancelClick();
        } else {
            this.nowPage = 'comp';
        }
    }

    private doPromise(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.chooseOver = (item, type?) => {
                // 若為公司popup點擊一筆,開啟標的頁面
                if (type == 'comp') {
                    this._logger.log("chooseOver, type comp, item:", item);
                    // 儲存該筆公司之基金標的清單
                    this.fundData.fundCompId = item.fundCompId;
                    this.fundData.fundCompName = item.fundCompName;
                    this.fundData.data = item.fundData;
                    this._logger.log("chooseOver, fundData.data:", this.fundData.data);
                    this.hasSearch = false;
                    this.nowPage = 'fund'; // 切換至標的頁面
                    this.doScrollTop(); // 畫面拉至最上層
                    // 若為標的popup點擊一筆,帶入選擇之標的
                } else {
                    this._logger.log("chooseOver, type fund, item:", item);
                    this._logger.log("chooseOver, custIdRisk:", this.custIdRisk);
                    let fundRisk = item['riskNumber'];
                    if (fundRisk > this.custIdRisk) {
                        item['riskNotEnough'] = true; // 不符合
                        this._logger.log("fundRisk error");
                        let show_msg = 'FUND_INVEST.CHECK_DATA.INVEST_MONEY.RISK_NOT_ALLOW';
                        let show_str1 = this.getRiskName(this.custIdRiskName);
                        let show_str2 = this.getRiskName(item.riskName);

                        this.translate.get('FUND_INVEST.CHECK_DATA.INVEST_MONEY.RISK_NOT_ALLOW', {
                            custIdRiskName: show_str1,
                            riskName: show_str2
                        }).subscribe((i18nval) => {
                            show_msg = i18nval;
                        });
                        this._handleError.handleError({
                            title: 'ERROR.TITLE',
                            content: show_msg
                        });
                        return false; // 風險等級不符合,強制結束
                        // 標的風險屬性為「無屬性」,不可繼續流程
                    } else if (typeof fundRisk == 'undefined' || fundRisk == 0) {
                        this._handleError.handleError({
                            title: 'ERROR.TITLE',
                            content: 'FUND_INVEST.CHECK_DATA.INVEST_MONEY.HAS_NOT_FUNDCODE'
                        });
                        return false;
                    } else {
                        item['riskNotEnough'] = false; // 符合
                        item['custIdRiskName'] = this.custIdRiskName;
                        this._logger.log("fundRisk success");
                    }
                    resolve(item);
                }
            };

            this.cancelClick = () => {
                reject();
            };

        });
    }

    /**
     * 顯示風險名稱
     * @param name 
     */
    private getRiskName(name) {
        if (ObjectCheckUtil.checkObject(this.riskNameList, name)) {
            return this.riskNameList[name];
        }
        let show = name;
        this.translate.get(show).subscribe((i18nval) => {
            show = i18nval;
        });
        this.riskNameList[name] = show;
        return show;
    }

    /**
     * 搜尋
     */
    onSearch() {
        let fundFlag = false;
        let comFlag = false;
        this._logger.log("onSearch, searchText:", this.searchText);
        this.hasSearch = true;
        let checkEnglish = StringCheckUtil.checkEnglish(this.searchText, 'english_number');
        // 輸入非英數字,其他特殊字元前面已檢核,此為輸入中文 (公司)
        if (checkEnglish['status'] == false) {
            fundFlag = false;
            comFlag = true;
            this._logger.log("into chinese");
            // 英數字 (標的)
        } else {
            fundFlag = true;
            comFlag = false;
            this._logger.log("into english");
        }
        // 標的
        if (!!fundFlag) {
            this._logger.log("into search fundFlag");
            let check_fund = this.searchFund();
            if (check_fund.status) {
                this.fundData.data = check_fund.data; // 畫面顯示搜尋資料
                this.nowPage = 'fund'; // 切換至標的頁面
                this.doScrollTop(); // 畫面拉至最上層
                return true; // 顯示查詢到之標的
            } else {
                comFlag = true; // 查無標的資料,去查公司資料
                this._logger.log("ready to search comp", comFlag);
            }
        }
        // 公司
        if (!!comFlag) {
            this._logger.log("into search comFlag");
            let check_com = this.searchCom();
            if (check_com.status) {
                this.data = check_com.data; // 畫面顯示搜尋資料
                this.nowPage = 'comp'; // 切換至公司頁面
                this.doScrollTop(); // 畫面拉至最上層
                return true;
            }
        }
        // final show search error
        this.errorBoxMsg = 'FUND_INVEST.CODE_POPUP.HAS_NOT_QUERY';
        this.nowPage = 'errorBox'; // 查無(空箱)
    }

    // 查詢基金標的
    private searchFund() {
        let output = {
            status: false,
            data: []
        };
        let fundSearch = this.investType == '1' ? this.searchTwdData : this.searchForeignData;
        fundSearch.forEach(item => {
            let reg = new RegExp(this.searchText, 'g');
            let fundId = this._formateService.checkField(item, 'fundId');
            if (reg.test(fundId) == true) {
                output.data.push(item);
            }
        });
        if (output.data.length > 0) {
            output.status = true;
        }
        return output;
    }

    // 查詢公司
    private searchCom() {
        let output = {
            status: false,
            data: []
        };
        let compSearch = this.investType == '1' ? this.twdFundlist : this.foreignFundlist;
        compSearch.forEach(item => {
            let reg = new RegExp(this.searchText, 'g');
            let compName = this._formateService.checkField(item, 'fundCompName');
            if (reg.test(compName)) {
                output.data.push(item);
            }
        });
        if (output.data.length > 0) {
            output.status = true;
        }
        return output;
    }

    searchEventBack(searchText) {
        this.onSearch();
    }

    // 將頁面拉回最上方。
    private doScrollTop() {
        this.layoutCtrl.scrollTop();
    }
}
