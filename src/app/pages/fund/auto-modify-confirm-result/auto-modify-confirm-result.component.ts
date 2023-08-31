/**
 *  理財妙管家 修改(確認,結果頁)
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormateService } from '@template/formate/formate.service';
import { Logger } from '@systems/system/logger/logger.service';
import { AutoFundRedeemService } from '@pages/fund/shared/auto-fund-redeem.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';

@Component({
    selector: 'app-auto-modify-confirm-result',
    templateUrl: './auto-modify-confirm-result.component.html',
    styleUrls: []
})

export class AutoModifyConfirmResultComponent implements OnInit {
    @Input() setReq: any; // 結果頁req
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();
    nowPage = 'confirm'; // 當前頁面
    // SPEC11060301-理財妙管家-設定
    confirmShow = {
        license: '', // 憑證號碼
        fundCode: '', // 基金編號
        oldStopBene: '', // 舊的停利標準
        oldStopLoss: '', // 舊的停損標準
        accountID: '', // 自動贖回入帳帳號
        inputBene: '', // 設定新的停利標準
        inputLoss: '', // 設定新的停損標準
        fundName: '', // 基金名稱
        showFundName: '', // 組合過的名稱: 基金代號 + 基金名稱
        amount: '', // 信託餘額
        currency: '' // 信託金額幣別
    };
    // 判斷停利損點需顯示 'notSet': 不設定, 'notUse': 不適用, 'normal': 顯示設定的值
    showBalanceStatus = {
        inputBene: '',
        inputLoss: ''
    };
    resultReq = {
        license: '', // 憑證號碼
        fundCode: '', // 基金編號
        oldStopBene: '', // 舊的停利標準
        oldStopLoss: '', // 舊的停損標準
        accountID: '', // 自動贖回入帳帳號
        inputBene: '', // 設定新的停利標
        inputLoss: '' // 設定新的停損標準
    };
    //------ 安控相關 ------
    // 安控設定檔
    setSecurity = {
        transServiceId: '', // 交易結果電文
        nameOfSecurity: 'AUTOMREDEEMODIFY', // 交易權限設定 (輸入,快速登入)
        signText: {},
        inAccount: '', // 轉入帳號
        outAccount: '', // 轉出帳號
        currency: '', // 幣別
        amount: '', // 轉帳金額
    };
    setSecurityError: any = {}; // 安控錯誤變數
    // 控制安控送出的變數
    securityAction: any = { method: 'init' };
    // 目前安控方法的物件 { name: '手機確認碼認證', id: '2', checkList: [ 'otp'], inputValue: true  },
    securityObj: any; // 安控回傳物件
    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj

    constructor(
        private mainService: AutoFundRedeemService,
        private _formateServcie: FormateService,
        private _logger: Logger,
        private _headerCtrl: HeaderCtrlService
    ) { }

    ngOnInit() {
        this._initEvent();
    }

    private _initEvent() {
        this._logger.log("into AutoModifyConfirmResultComponent, setReq:", this.setReq);
        // 設定左側返回
        this._headerCtrl.setLeftBtnClick(() => {
            this.onBack();
        });
        // 確認頁顯示
        let fundCode = this._formateServcie.checkField(this.setReq, 'fundCode');
        let fundName = this._formateServcie.checkField(this.setReq, 'fundName');
        this.confirmShow = {
            license: this._formateServcie.checkField(this.setReq, 'license'), // 憑證號碼
            fundCode: fundCode, // 基金編號
            oldStopBene: this._formateServcie.checkField(this.setReq, 'oldStopBene'), // 舊的停利標準
            oldStopLoss: this._formateServcie.checkField(this.setReq, 'oldStopLoss'), // 舊的停損標準
            accountID: this._formateServcie.checkField(this.setReq, 'accountID'), // 自動贖回入帳帳號
            inputBene: this._formateServcie.checkField(this.setReq, 'inputBene'), // 設定新的停利標準
            inputLoss: this._formateServcie.checkField(this.setReq, 'inputLoss'), // 設定新的停損標準
            fundName: fundName, // 基金名稱
            showFundName: fundCode + fundName,
            amount: this._formateServcie.checkField(this.setReq, 'amount'),
            currency: this._formateServcie.checkField(this.setReq, 'currency')
        };
        this.setSecurity.transServiceId = 'SPEC11060301';
        this.setSecurity.currency = this._formateServcie.checkField(this.setReq, 'currency');
        this.setSecurity.inAccount = this._formateServcie.checkField(this.setReq, 'accountID');
        this.setSecurity.amount = this._formateServcie.checkField(this.setReq, 'amount');
        this.formateBalanceStatus(); // 處理停利損點需顯示 'notSet': 不設定, 'notUse': 不適用, 'normal': 顯示設定的值
        // 設定交易req
        this.resultReq = {
            license: this._formateServcie.checkField(this.confirmShow, 'license'), // 憑證號碼
            fundCode: this._formateServcie.checkField(this.confirmShow, 'fundCode'), // 基金編號
            oldStopBene: this._formateServcie.checkField(this.confirmShow, 'oldStopBene'), // 舊的停利標準
            oldStopLoss: this._formateServcie.checkField(this.confirmShow, 'oldStopLoss'), // 舊的停損標準
            accountID: this._formateServcie.checkField(this.confirmShow, 'accountID'), // 自動贖回入帳帳號
            inputBene: this._formateServcie.checkField(this.confirmShow, 'inputBene'), // 設定新的停利標
            inputLoss: this._formateServcie.checkField(this.confirmShow, 'inputLoss') // 設定新的停損標準
        };
    }

    // 接收安控返回
    submitSecurity(bakSecurityObj?) {
        if (!bakSecurityObj) {
            this._logger.log("!bakSecurityObj");
            let securityReq: any;
            this._logger.log("onCommit, resultReq:", this.resultReq);
            securityReq = this.mainService.modifyResult(this.resultReq);
            this.resultReq = securityReq;
            // 送出按鈕
            this.securityAction = { method: 'submit', signText: securityReq };
            this._logger.log("submitSecurity, securityAction:", this.securityAction);
        } else {
            this._logger.log("security back, bakSecurityObj:", bakSecurityObj);
            // // 送出後回傳安控物件一路帶回 (待之後開啟, 安控回傳完成會走進else)
            this.securityObj = bakSecurityObj;
            this.onCommit();
        }
    }

    /**
     * 點擊取消
     */
    onCancel() {
        this.onBackPageEvent('confirm-page', 'home');
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    private onCommit() {
        this.sendResultData();
    }

    private sendResultData() {
        this.mainService.sendResultData(this.resultReq, {
            security: this.securityObj
        }).then(
            (result) => {
                this._logger.log("sendResultData, result:", result);
                // api response 不會回傳交易欄位資料,只有成功與否,因此使用確認頁資料呈現
                this.nowPage = 'result';
                this.resStatus = result.status;
                this.statusObj = result.statusObj;
            },
            (errorObj) => {
                this._logger.log("sendResultData, errorObj:", errorObj);
                let error_type = this._formateServcie.checkField(errorObj, 'resultType');
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
     * 回上一步(左側返回)
     */
    private onBack() {
        this.onBackPageEvent('confirm-page', 'back', {});
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

    // 處理停利損點需顯示 'notSet': 不設定, 'notUse': 不適用, 'normal': 顯示設定的值
    private formateBalanceStatus() {
        // 停利點
        if (this.confirmShow.inputBene != '' && this.confirmShow.inputBene != '0') {
            this.showBalanceStatus.inputBene = 'normal'; // 顯示設定的值
        } else if (this.confirmShow.inputBene == '') {
            this.showBalanceStatus.inputBene = 'notSet'; // 不設定
        } else if (this.confirmShow.inputBene == '0') {
            this.showBalanceStatus.inputBene = 'notUse'; // 不適用
        }
        // 停損點
        if (this.confirmShow.inputLoss != '' && this.confirmShow.inputLoss != '0') {
            this.showBalanceStatus.inputLoss = 'normal'; // 顯示設定的值
        } else if (this.confirmShow.inputLoss == '') {
            this.showBalanceStatus.inputLoss = 'notSet'; // 不設定
        } else if (this.confirmShow.inputLoss == '0') {
            this.showBalanceStatus.inputLoss = 'notUse'; // 不適用
        }
    }
}
