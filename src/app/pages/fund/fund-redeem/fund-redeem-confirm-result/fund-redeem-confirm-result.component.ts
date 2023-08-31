/**
 * 基金贖回(確認,結果頁)
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { FundRedeemService } from '@pages/fund/shared/fund-redeem.service';
import { FormateService } from '@template/formate/formate.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { LayoutCtrlService } from '@systems/route/layout/layout-ctrl.service';
import { TranslateService } from '@ngx-translate/core';
import { CheckService } from '@template/check/check.service';

@Component({
    selector: 'app-fund-redeem-confirm-result',
    templateUrl: './fund-redeem-confirm-result.component.html',
    styleUrls: []
})

export class FundRedeemConfirmResultComponent implements OnInit {
    @Input() setData: any; // 投資現值查詢帶入之基金標的資訊
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    private isTwdFlag = false;
    nowPage = ''; // 目前頁面, 'confirm': 確認頁, 'result': 結果頁
    errorBoxMsg = ''; // 確認頁錯誤訊息
    // 確認頁request
    confirmReq = {
        license: '', // 信託憑證
        fundCode: '', // 基金代號
        fundName: '', // 基金名稱
        fundCcy: '', // 基金幣別
        fundAmt: '', // 基金金額
        fundFlag: '', // 是否須繳回憑證
        accountID: '', // 回贖帳號
        fundUnitcnt: '', // 基金單位數
        higthRedeemAmt: '', // 最高回贖額
        lowestRedeemAmt: '', // 最低回贖額
        redeemRadio: '', // 回贖方式
        redeemAmt: '', // 回贖單位數
        optRowcnt: '' // opt
    };
    confirmData: any; // 確認頁api回傳資料
    // 結果頁request
    resultReq = {
        license: '',
        fundCode: '',
        fundAmt: '',
        fundFlag: '',
        accountID: '',
        fundUnitcnt: '',
        redeemRadio: '',
        redeemAmt: '',
        redeemUnitcnt: '',
        optRowcnt: '',
        shartTradeComfirm: ''
    };
    resultData: any; // 結果頁api回傳資料
    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj

    // ------ 安控相關 ------
    // 安控設定檔
    setSecurity = {
        transServiceId: '', // 交易結果電文
        nameOfSecurity: 'FUNDINVEST', // 交易權限設定
        signText: {},
        inAccount: '', // 轉入帳號
        outAccount: '', // 轉出帳號
        currency: '', // 幣別
        amount: '' // 轉帳金額
    };
    setSecurityError: any = {}; // 安控錯誤變數
    // 控制安控送出的變數
    securityAction: any = { method: 'init' };
    // 目前安控方法的物件 { name: '手機確認碼認證', id: '2', checkList: [ 'otp'], inputValue: true  },
    securityObj: any; // 安控回傳物件
    private haveDoneSecurity = false; // 是否已驗證過
    // ------ 安控相關 End ------
    shartTrade = ''; // 是否為短線交易, 'Y':是, 'N':不是
    successCount = 0; // 結果頁api成功次數
    shartContent = ''; // 短線交易本文(中台直接回傳條款)

    constructor(
        private _logger: Logger,
        private _mainService: FundRedeemService,
        private _handleError: HandleErrorService,
        private _headerCtrl: HeaderCtrlService,
        private confirm: ConfirmService,
        private navgator: NavgatorService,
        private _formateService: FormateService,
        private layoutCtrlService: LayoutCtrlService,
        private translate: TranslateService,
        private _checkService: CheckService
    ) { }

    ngOnInit() {
        this.layoutCtrlService.closeFooter();
        this._logger.log("into FundRedeemConfirmResultComponent, setData:", this.setData);
        this._initEvent();
    }

    // 初始動作
    private _initEvent() {
        this._logger.log("into goInit");
        // 設定header
        this._headerCtrl.setOption({
            'leftBtnIcon': 'back',
            'title': 'FUNC.WEALTH_INVEST.REDEMPTION'
        });
        // 設定左側返回
        this._headerCtrl.setLeftBtnClick(() => {
            this.onBack();
        });
        // 判斷資料類別
        this.isTwdFlag = this._checkService.checkIsTwd(this.setData['fundCcy']);
        // 設定確認頁request
        this.confirmReq = {
            license: this.setData['license'], // 信託憑證
            fundCode: this.setData['fundCode'], // 基金代號
            fundName: this.setData['fundName'], // 基金名稱
            fundCcy: this.setData['fundCcy'], // 基金幣別
            fundAmt: this.setData['oldFundAmt'], // 基金金額
            fundFlag: this.setData['fundFlag'], // 是否須繳回憑證
            accountID: this.setData['accountID'], // 回贖帳號
            fundUnitcnt: this.setData['fundUnitcnt'], // 基金單位數
            higthRedeemAmt: this.setData['higthRedeemAmt'], // 最高回贖額
            lowestRedeemAmt: this.setData['lowestRedeemAmt'], // 最低回贖額
            redeemRadio: this.setData['redeemRadio'], // 回贖方式
            redeemAmt: this.setData['fundAmt'], // 回贖金額
            optRowcnt: this.setData['optRowcnt'] // opt
        };
        // 先設定交易電文 安控物件api編號
        this.setSecurity.transServiceId = (!this.isTwdFlag) ? 'SPEC11020302' : 'SPEC11020301';
        this.setSecurity.outAccount = this.setData['accountID'];
        this.setSecurity.currency = this.setData['fundCcy'];
        this.setSecurity.amount = this.setData['redeemAmt'];
        this.securityAction = { method: 'init' };
        this.haveDoneSecurity = false;
        this.decideSendApi('confirm'); // 發送確認頁api
    }

    /**
     * 回上一步
     */
    onBack() {
        this.onBackPageEvent('confirm', 'back', this.setData);
    }

    /**
     * 點擊 取消
     */
    onCancel() {
        this._logger.log("into onCancel");
        this.onBackPageEvent('confirm', 'home', this.setData);
    }

    /**
     * 點擊 確定
     */
    onCommit() {
        // ***待補安控
        // 檢查是否為短線交易，並決定發送哪知api
        // this.checkShartTrade(this.confirmData['shartTrade']);
        this.decideSendApi('result'); // 發送結果頁api
    }

    /**
     * 點擊 再做一筆
     */
    onAgainBtnClick() {
        this.layoutCtrlService.openFooter();
        // 參數 'result': 結果頁, 'retry': 再試一次
        this.onBackPageEvent('result', 'retry', {});
    }

    /**
     * 短線交易頁 取消
     */
    onShartCancel() {
        this._logger.log("shartTrade Y click cancel");
        this.onCancel();
    }

    /**
     * 短線交易頁 確認
     */
    onShartConfirm() {
        this._logger.log("shartTrade Y click continue, ready to send result api");
        this.decideSendApi('result', true); // 發送結果頁api
    }

    /**
     * 返回現值查詢
     */
    onBackPageEvent(page?, type?, data?) {
        this._logger.log("into onBackPageEvent, page type data", page, type, data);
        let output = {
            'page': page,
            'type': type,
            'data': data
        };
        this.backPageEmit.emit(output);
    }

    /**
     * 決定發送哪知api
     * @param nowPage confirm: 發確認頁api, result: 發結果頁api
     * @param isShartTrade 是否為短線交易 true: 是, false: 不是, true時 api req短線交易欄位須帶入
     */
    decideSendApi(nowPage, isShartTrade?: boolean) {
        // 發確認頁電文
        if (nowPage == 'confirm') {
            if (this.isTwdFlag) {
                this.getConfirmTwdData(this.confirmReq); // 發台幣確認頁api
            } else {
                this.getConfirmForeignData(this.confirmReq); // 發外幣確認頁api
            }
            // 發結果頁電文
        } else {
            let shartTrade = (isShartTrade == true) ? this.shartTrade : 'N';
            this.resultReq['shartTradeComfirm'] = shartTrade;
            this._logger.log("resultReq:", this.resultReq);
            if (this.isTwdFlag) {
                this.getResultTwdData(this.resultReq); // 發台幣結果頁api
            } else {
                this.getResultForeignData(this.resultReq); // 發外幣結果頁api
            }
        }
    }

    /**
     * 發送 贖回台幣確認 api SPEC11020201
     * @param reqData 請求資料
     */
    private getConfirmTwdData(reqData) {
        this._logger.log("into getConfirmTwdData, reqData:", reqData);
        this._mainService.getConfirmTwd(reqData, {}).then(
            (result) => {
                this._logger.log("getConfirmTwdData, result:", result);
                this.confirmData = result.infoData;
                this.nowPage = 'confirm'; // 切換至確認頁
            },
            (errorObj) => {
                this._logger.log("getConfirmTwdData, errorObj:", errorObj);
                this._handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorBox'; // 錯誤頁面
            }
        );
    }

    /**
     * 發送 贖回外幣確認 api SPEC11020202
     * @param reqData 請求資料
     */
    private getConfirmForeignData(reqData) {
        this._logger.log("into getConfirmForeignData, reqData:", reqData);
        this._mainService.getConfirmForeign(reqData, {}).then(
            (result) => {
                this._logger.log("getConfirmForeignData, result:", result);
                this.confirmData = result.infoData;
                this.nowPage = 'confirm'; // 切換至確認頁
            },
            (errorObj) => {
                this._logger.log("getConfirmForeignData, errorObj:", errorObj);
                this._handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorBox'; // 錯誤頁面
            }
        );
    }

    /**
     * 發送 贖回台幣結果 api SPEC11020301
     * @param reqData 請求資料
     */
    private getResultTwdData(reqData) {
        this._logger.log("into getResultTwdData, reqData:", reqData);
        let options: any = {
            security: this.securityObj
        };
        // 已驗證安控註記
        options.haveDoneSecurity = (this.haveDoneSecurity) ? true : false;
        this._logger.log("options:", options);
        this.haveDoneSecurity = true;
        this._mainService.getResultTwd(reqData, options).then(
            (result) => {
                this._logger.log("getResultTwdData, result:", result);
                this.resultData = result.infoData; // 結果頁資料
                this.nowPage = 'result'; // 顯示結果頁
                this.resStatus = result.status;
                this.statusObj = result.statusObj;
                this.successCount++; // 計算結果頁api發送次數, 不是第一次就不會判斷短險交易alert(已跳過)
                this.shartTrade = this._formateService.checkField(this.resultData, 'isShartTrade');
                this.shartContent = this._formateService.checkField(this.resultData, 'tradeDate');
                if (this.successCount <= 1) {
                    this.checkShartTrade(this.shartTrade);
                }
            },
            (errorObj) => {
                this._logger.log("getResultTwdData, errorObj:", errorObj);
                let error_type = this._formateService.checkField(errorObj, 'resultType');
                if (error_type == 'security' || error_type == 'check') {
                    this.securityAction = { method: 'error' };
                    this.setSecurityError = errorObj;
                } else {
                    this.nowPage = 'result';
                    this.resStatus = false;
                    this.statusObj = errorObj;
                }
            }
        );
    }

    /**
     * 發送 贖回外幣結果 api SPEC11020302
     * @param reqData 請求資料
     */
    private getResultForeignData(reqData) {
        this._logger.log("into getResultForeignData, reqData:", reqData);
        let options: any = {
            security: this.securityObj
        };
        // 已驗證安控註記
        options.haveDoneSecurity = (this.haveDoneSecurity) ? true : false;
        this._logger.log("options:", options);
        this.haveDoneSecurity = true;
        this._mainService.getResultForeign(reqData, options).then(
            (result) => {
                this._logger.log("getResultForeignData, result:", result);
                this.resultData = result.infoData; // 結果頁資料
                this.nowPage = 'result'; // 顯示結果頁
                this.resStatus = result.status;
                this.statusObj = result.statusObj;
                this.successCount++; // 計算結果頁api發送次數, 不是第一次就不會判斷短險交易alert(已跳過)
                this.shartTrade = this._formateService.checkField(result.infoData, 'isShartTrade');
                this.shartContent = this._formateService.checkField(this.resultData, 'tradeDate');
                if (this.successCount <= 1) {
                    this.checkShartTrade(this.shartTrade);
                }
            },
            (errorObj) => {
                this._logger.log("errorObj, errorObj:", errorObj);
                let error_type = this._formateService.checkField(errorObj, 'resultType');
                if (error_type == 'security' || error_type == 'check') {
                    this.securityAction = { method: 'error' };
                    this.setSecurityError = errorObj;
                } else {
                    this.nowPage = 'result';
                    this.resStatus = false;
                    this.statusObj = errorObj;
                }

            }
        );
    }

    /**
     * 檢查短線交易
     */
    private checkShartTrade(shartTrade) {
        // 短線交易 跳提示
        if (shartTrade == 'Y') {
            this.nowPage = 'shartTrade'; // 若為短線交易切換至短線交易確認頁
            // 設定左側返回
            this._headerCtrl.setLeftBtnClick(() => {
                this.onCancel();
            });
        } else {
            this._logger.log("shartTrade N ready to send result api");
        }
    }


    // 接收安控返回
    submitSecurity(bakSecurityObj?) {
        if (!bakSecurityObj) {
            // 按下送出按鈕
            this._logger.log("!bakSecurityObj");
            
            let shartTrade = 'N';
            let redeem_unit = this._formateService.checkField(this.confirmData, 'redeemUnit');
            this.resultReq = {
                license: this.confirmReq['license'],
                fundCode: this.confirmReq['fundCode'],
                fundAmt: this.confirmReq['fundAmt'],
                fundFlag: this.confirmReq['fundFlag'],
                accountID: this.confirmReq['accountID'],
                fundUnitcnt: this.confirmReq['fundUnitcnt'], 
                redeemRadio: this.confirmReq['redeemRadio'],
                redeemAmt: this.confirmReq['redeemAmt'],
                redeemUnitcnt: redeem_unit, // 帶入確認頁回傳之單位數
                optRowcnt: this.confirmReq['optRowcnt'],
                shartTradeComfirm: shartTrade
            };
            let option = {};
            // 處理安控signText與request, 資料出入口需為相同方法回傳
            let securityReq: any = this._mainService.modifyReq(this.resultReq, option, this.isTwdFlag);
            // this.setSecurity.signText = securityReq; // 快速交易使用
            // 送出按鈕
            this.securityAction = { 'method': 'submit', 'signText': securityReq };
        } else {
            this._logger.log("security back, bakSecurityObj:", bakSecurityObj);
            // 送出後回傳安控物件一路帶回
            this.securityObj = bakSecurityObj;
            this.onCommit();
        }
    }
}
