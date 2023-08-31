/**
 *  理財妙管家
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormateService } from '@template/formate/formate.service';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AutoFundRedeemService } from '@pages/fund/shared/auto-fund-redeem.service';
import { FundAcctPopupService } from '@template/list/fund-acct-popup/fund-acct-popup.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { CheckService } from '@template/check/check.service';

@Component({
    selector: 'app-auto-fund-redeem-modify',
    templateUrl: './auto-fund-redeem-modify.component.html',
    styleUrls: []
})

export class FundRedeemModifyComponent implements OnInit {
    @Input() setData: any; // 修改頁req
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    acctData: any; // 入帳帳號
    infoData: any; // 編輯資訊
    nowPage = ''; // 當前頁面
    // 編輯頁request
    modifyReq = {
        inqueryKey: '' // 編碼過後的憑證號碼與產品編號
    };
    // 發送SPEC11060301
    reqData = {
        license: '', // 憑證號碼
        fundCode: '', // 基金編號
        oldStopBene: '', // 舊的停利標準
        oldStopLoss: '', // 舊的停損標準
        accountID: '', // 自動贖回入帳帳號
        inputBene: '', // 設定新的停利標準
        inputLoss: '' // 設定新的停損標準
    };
    errorBoxMsg = ''; // 錯誤訊息
    // 畫面顯示相關
    showData = {
        fundName: '', // 基金標的
        license: '', // 憑證號碼
        amount: '', // 信託金額
        currency: '', // 幣別
        inputBene: '', // 設定新的停利標準
        inputLoss: '', // 設定新的停損標準
        accountID: '' // 自動贖回入帳帳號
    };
    popupOption = {
        data: [],
        select: '', // 選擇之帳號，帳號打勾使用
        type: '4'
    };
    // SPEC11060301-理財妙管家-設定 確認頁需要
    confirmReq = {
        license: '', // 憑證號碼
        fundCode: '', // 基金編號
        oldStopBene: '', // 舊的停利標準
        oldStopLoss: '', // 舊的停損標準
        accountID: '', // 自動贖回入帳帳號
        inputBene: '', // 設定新的停利標準
        inputLoss: '', // 設定新的停損標準
        fundName: '', // 基金名稱
        currency: '', // 信託金額幣別
        amount: '' // 信託餘額
    };
    // 顯示畫面上錯誤訊息(紅框)
    errorMsg = {
        inputLoss: '', // 停損點
        inputBene: '' // 停利點
    };
    // 控制disabled
    hasdisabled = {
        inputBeneplus: false, // 停利+號
        inputBeneless: false, // 停利-號
        inputLossplus: false, // 停損+號
        inputLossless: false, // 停損-號
        hasNotUseBene: false, // 停利點(不適用)
        hasNotUseLoss: false  // 停損點(不適用)
    };
    // 是否設定（不設定）
    checkedSet = {
        inputLoss: false,
        inputBene: false
    };

    constructor(
        private mainService: AutoFundRedeemService,
        private _formateServcie: FormateService,
        private _logger: Logger,
        private _handleError: HandleErrorService,
        private _headerCtrl: HeaderCtrlService,
        private popupService: FundAcctPopupService,
        private confirm: ConfirmService,
        private navgator: NavgatorService,
        private _checkService: CheckService
    ) { }

    ngOnInit() {
        this._initEvent();
    }

    private _initEvent() {
        this._logger.log("into FundRedeemModifyComponent, setData:", this.setData);
        // 設定左側返回
        this._headerCtrl.setLeftBtnClick(() => {
            this.onBack();
        });
        // 將查詢頁資料帶入畫面顯示
        this.showData.fundName = this.setData.fundCode + this.setData.fundName1;
        this.showData.license = this.setData.licenno1;
        this.showData.amount = this.setData.osAmt;
        this.showData.currency = this.setData.viewEngCurrency;
        let inputBene = this.setData.stopBene;
        let inputLoss = this.setData.stopLoss;
        this.showData.inputBene = this.mainService.formateBeneLoss(inputBene);
        this.showData.inputLoss = this.mainService.formateBeneLoss(inputLoss);
        this.modifyReq.inqueryKey = this.setData.key; // req
        this._logger.log("into FundRedeemModifyComponent, modifyReq:", this.modifyReq);
        this.getModifyData(this.modifyReq);
    }

    onSelectInAcct() {
        // 回傳使用者選擇之帳號
        this.popupService.show(this.popupOption).then(
            (result) => {
                this._logger.log("result:", result);
                this.showData.accountID = result['accno'];
                // 回來將預設帳號帶入，顯示下次開啟視窗之選擇帳號
                this.popupOption.select = this.showData.accountID;
            },
            (cancel) => {
                this._logger.log("into cancel");
            }
        );
    }

    /**
     * 點擊取消
     */
    onCancel() {
        this.onBackPageEvent('modify-page', 'home');
    }

    /**
     * 點擊下一步
     */
    onNext() {
        this._logger.log("into onNext");
        // 處理SPEC11060301-理財妙管家-設定 確認頁需要
        let formateBene = this.mainService.formateBeneLoss(this.setData['stopBene']);
        let formateLoss = this.mainService.formateBeneLoss(this.setData['stopLoss']);
        let checkOldBene = this._checkService.checkNumber(formateBene);
        let checkOldLoss = this._checkService.checkNumber(formateLoss);
        let checkNumberBene = this._checkService.checkNumber(this.showData['inputBene']);
        let checkNumberLoss = this._checkService.checkNumber(this.showData['inputLoss']);
        this.confirmReq = {
            license: this._formateServcie.checkField(this.showData, 'license'), // 憑證號碼
            fundCode: this._formateServcie.checkField(this.setData, 'fundCode'), // 基金編號
            // oldStopBene: !checkOldBene.status ? '' : checkOldBene.data, // 舊的停利標準
            // oldStopLoss: !checkOldLoss.status ? '' : checkOldLoss.data, // 舊的停損標準
            oldStopBene: '', // 舊的停利標準
            oldStopLoss: '', // 舊的停損標準
            accountID: this._formateServcie.checkField(this.showData, 'accountID'), // 自動贖回入帳帳號
            // inputBene: !checkNumberBene.status ? '' : this.showData['inputBene'], // 設定新的停利標準
            // inputLoss: !checkNumberLoss.status ? '' : this.showData['inputLoss'], // 設定新的停損標準
            inputBene: '', // 設定新的停利標準
            inputLoss: '', // 設定新的停損標準
            fundName: this._formateServcie.checkField(this.setData, 'fundName1'), // 基金名稱
            currency: this._formateServcie.checkField(this.setData, 'viewEngCurrency'), // 信託金額幣別
            amount: this._formateServcie.checkField(this.setData, 'osAmt') // 信託餘額
        }
        // 停利點(新):
        // 不設定
        if (!checkNumberBene.status && !this.hasdisabled.hasNotUseBene) {
            this.confirmReq.inputBene = '';
        // 不適用
        } else if (!!this.hasdisabled.hasNotUseBene) {
            this.confirmReq.inputBene = '0';
        } else {
            this.confirmReq.inputBene = this.showData['inputBene'];
        }
        // 停損點(新):
        // 不設定
        if (!checkNumberLoss.status && !this.hasdisabled.hasNotUseLoss) {
            this.confirmReq.inputLoss = '';
        // 不適用
        } else if (!!this.hasdisabled.hasNotUseLoss) {
            this.confirmReq.inputLoss = '0';
        } else {
            this.confirmReq.inputLoss = this.showData['inputLoss'];
        }
        // 停利點(舊):
        // 不設定
        if (!checkOldBene.status && !this.hasdisabled.hasNotUseBene) {
            this.confirmReq.oldStopBene = '';
        // 不適用
        } else if (!!this.hasdisabled.hasNotUseBene) {
            this.confirmReq.oldStopBene = '0';
        } else {
            this.confirmReq.oldStopBene = checkOldBene.data;
        }
        // 停損點(舊):
        // 不設定
        if (!checkOldLoss.status && !this.hasdisabled.hasNotUseLoss) {
            this.confirmReq.oldStopLoss = '';
        // 不適用
        } else if (!!this.hasdisabled.hasNotUseLoss) {
            this.confirmReq.oldStopLoss = '0';
        } else {
            this.confirmReq.oldStopLoss = checkOldLoss.data;
        }
        
        // 檢核停損,利點須介於-5~-30
        let checkData = this.mainService.checkData(this.confirmReq);
        if (checkData.status == false) {
            this.errorMsg.inputLoss = checkData.error_list.inputLoss;
            this.errorMsg.inputBene = checkData.error_list.inputBene;
        } else {
            this.errorMsg.inputLoss = '';
            this.errorMsg.inputBene = '';
            this.nowPage = 'confirm';
        }
    }

    /**
     * 取得修改資料
     * @param reqData 請求
     */
    private getModifyData(reqData) {
        this._logger.log("into getModifyData, reqData:", reqData);
        this.mainService.getModifyData(reqData).then(
            (result) => {
                this._logger.log("getModifyData, result:", result);
                this.acctData = result.faccountProfitData; // 入帳帳號
                this.infoData = result.infoData; // 編輯資訊
                this.showData.accountID = result.defaultAcct; // 畫面顯示帳號
                this.popupOption.select = result.defaultAcct; // popup顯示帳號打勾
                this.popupOption.data = result.faccountProfitData; // 帶入帳號popup清單
                this.nowPage = 'edit'; // 顯示修改頁
                this.doNotUse();
            },
            (errorObj) => {
                this._logger.log("getModifyData, errorObj:", errorObj);
                this._handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorBox'; // 錯誤頁面
            }
        );
    }

    /**
     * 點擊修改停損停利
     * @param tune 選擇 + or - , 'plus': + , 'less': -
     * @param type 點擊欄位 'inputBene':停利標準 ,'inputLoss': 停損標準
     * @param reset 是否重設
     */
    onModifyLossBene(tune: string, type: string) {
        let inputValue = 0;
        let reset = false; // 是否重新設定
        let checkNumber = this._checkService.checkNumber(this.showData[type]);
        if(!checkNumber.status) {
            // inputValue = 5;
            reset = true;
        } else {
            inputValue = parseInt(this.showData[type]);
        }
        // 點擊 +
        if (tune == 'plus') {
            inputValue = inputValue + 1;
            // 點擊 -
        } else if (tune == 'less') {
            inputValue = inputValue - 1;
        }
        if(!!reset && tune == 'plus') {
            inputValue = 5;
            this.errorMsg[type] = '';
            this.checkedSet[type] = false;
        } else if(!!reset && tune == 'less') {
            inputValue = 30;
            this.errorMsg[type] = '';
            this.checkedSet[type] = false;
        } 
        if(inputValue < 5 || inputValue > 30) {
            this.errorMsg[type] = type == 'inputBene' ? 'AUTO_REDEEM_MODIFY.CHECK.BENE_RANGE' : 'AUTO_REDEEM_MODIFY.CHECK.LOSS_RANGE';
            this.hasdisabled[type+tune] = true;
        }
         else if ((inputValue == 5 || inputValue == 30) && !reset) {
            this.showData[type] = inputValue.toString();
            this.errorMsg[type] = '';
            this.hasdisabled[type+tune] = true;
        } else {
            this.showData[type] = inputValue.toString();
            this.errorMsg[type] = '';
            this.hasdisabled[type+'less'] = false; // 正確清除錯誤樣式
            this.hasdisabled[type+'plus'] = false; // 正確清除錯誤樣式
        }   
    }

    /**
     * 控制是否勾選設定 checked
     * @param type 點擊欄位 'inputBene':停利標準 ,'inputLoss': 停損標準
     */
    closeEvent(type) {
        this._logger.log("into closeEvent, type:", type);
        if(this.checkedSet[type] == true) {
            this.checkedSet[type] = false;
            this.hasdisabled[type+'less'] = false;
            this.hasdisabled[type+'plus'] = false;
            this.showData[type] = '5';
        } else {
            this.checkedSet[type] = true;
            this.hasdisabled[type+'less'] = true;
            this.hasdisabled[type+'plus'] = true;
            this.showData[type] = 'AUTO_REDEEM_MODIFY.MODIFY.NOT_SET';
            this.errorMsg[type] = '';
        }
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 回上一步(左側返回)
     */
    private onBack() {
        this.onBackPageEvent('modify-page', 'back', {});
    }

    /**
     * 返回編輯頁
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
     * 子層返回事件(分頁)
     * @param e
     */
    onPageBackEvent(e) {
        this._logger.log('Deposit', 'onPageBackEvent123', e);
        let page = 'list';
        let pageType = 'list';
        let tmp_data: any;
        if (typeof e === 'object') {
            if (e.hasOwnProperty('page')) {
                page = e.page;
            }
            if (e.hasOwnProperty('type')) {
                pageType = e.type;
            }
            if (e.hasOwnProperty('data')) {
                tmp_data = e.data;
            }
            if (e.hasOwnProperty('infoData')) {
                this.infoData = e.infoData;
            }
        }
        // 列表頁返回
        if (page === 'list-page' && pageType == 'back') {
            this._logger.log("onPageBackEvent back, tmp_data:", tmp_data);
            // 確認頁返回
        } else if (page == 'confirm-page' && pageType == 'back') {
            this.nowPage = 'edit'; // 顯示編輯頁
            // 設定左側返回
            this._headerCtrl.setLeftBtnClick(() => {
                this.onBack();
            });
            // 點擊取消 回首頁 
        } else if (pageType == 'home') {
            this.home();
        }
    }

    /**
     * 失敗回傳
     * @param error_obj 失敗物件
     */
    onErrorBackEvent(e) {
        this._logger.log('Deposit', 'onErrorBackEvent', e);
        let page = 'list';
        let pageType = 'list';
        let errorObj: any;
        if (typeof e === 'object') {
            if (e.hasOwnProperty('page')) {
                page = e.page;
            }
            if (e.hasOwnProperty('type')) {
                pageType = e.type;
            }
            if (e.hasOwnProperty('data')) {
                errorObj = e.data;
            }
        }
    }

    // 點擊 取消
    private home() {
        this._logger.log("into onCancel");
        // 是否放棄交易提示
        this.confirm.cancelEdit().then(
            () => {
                this.navgator.editBack();
            },
            () => {
                // no do
            }
        );
    }

    // 處理不適用,若為不適用不可設定(整個修改欄位dissable)
    private doNotUse() {
        let showStopLoss = this._formateServcie.checkField(this.setData, 'showStopLoss');
        let showStopBene = this._formateServcie.checkField(this.setData, 'showStopBene');
        // 停損點不適用 dissable
        if (showStopLoss == '不適用') {
            this.hasdisabled.hasNotUseLoss = true;
            this.showData.inputLoss = showStopLoss;
        }
        // 停利點不適用 dissable
        if (showStopBene == '不適用') {
            this.hasdisabled.hasNotUseBene = true;
            this.showData.inputBene = showStopBene;
        }
    }
}
