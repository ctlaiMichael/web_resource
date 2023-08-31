/**
 * (綜存)立即轉存定存(確認,結果頁)
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
// import { TwdTransferService } from '@pages/transfer/shared/twd-transfer.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { CompositToTimeModifyService } from '@pages/transfer/shared/composit-to-time-modify.service';
import { CompositToTimeMainService } from '@pages/transfer/shared/composit-to-time-main.service';
import { FormateService } from '@template/formate/formate.service';
@Component({
    selector: 'app-composit-to-time-modify',
    templateUrl: './composit-to-time-modify.html',
    styleUrls: []
})

export class CompositToTimeModifyComponent implements OnInit {
    @Input() setData: any; // 編輯頁資料
    @Input() outData: any;
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();

    // ------ 安控相關 Start ------ //
    // 安控設定檔
    setSecurity = {
        transServiceId: 'SPEC09020203',
        nameOfSecurity: 'COMPOSITTOTIME',
        signText: {},
        inAccount: '', // 轉入帳號
        outAccount: '', // 轉出帳號
        currency: '', // 幣別
        amount: '' // 轉帳金額
    };

    setSecurityError: any = {}; // 安控錯誤變數
    // 控制安控送出的變數
    securityAction = {
        method: 'init'
    };
    // 目前安控方法的物件 { name: '手機確認碼認證', id: '2', checkList: [ 'otp'], inputValue: true  },
    securityObj: any; // 安控回傳物件
    // ------ 安控相關 End ------ //

    nowStep = 'check'; // 當前步驟

    // 步驟列data
    stepMenuData = [
        {
            id: 'edit',
            name: 'STEP_BAR.COMMON.EDIT' // 輸入資料頁
        },
        {
            id: 'check',
            name: 'STEP_BAR.COMMON.CHECK', // 確認資料頁
        },
        {
            id: 'result',
            name: 'STEP_BAR.COMMON.RESULT', // 結果頁
            // 執行此步驟時是否隱藏步驟列
            hidden: true
        }
    ];

    nowPage = 'confirm'; // 當前頁面, 'confirm': 確認頁, 'result': 結果頁
    resultData: any; // 結果頁資料
    onchangeresult: any; //
    changemodify = true; // 切換編輯頁
    changresult = false; // 切換結果頁
    showmodify = true; // 控制結果
    statusObj = {}; // 結果頁顯示結過狀態
    resStatus = false; // 判斷結果文字是否打開
    changpage = false; // 控制編輯
    // 控制結果頁欄位,眼睛
    showEye = {
        actBal: false, // 帳上餘額
        avlBal: false // 可用餘額
    };
    reqData = {
        acno: '',
        aTransSaveData: '',
        aTransSaveAmt: '',
        saveRang: '',
        aSaveType: 'type1',
        aRateTypeCht: '',
        aPayRateType: '',
        payCycleMonth: '',
        aAutoTrunCount: '',
        aAutoTrunType: '',
    };
    resData = {
        rateTypeCht: '',
        rateTypeCht_Code: '',
        autoTrunType: '',
        AutoTrunType_Code: '',
    };

    noteInfo: any; // 注意資訊
    showAutoTurnType = true;

    constructor(
        private _logger: Logger,
        // private _mainService: TwdTransferService,
        private _handleError: HandleErrorService,
        private _headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private _confirm: ConfirmService,
        private composittotimemainservice: CompositToTimeMainService,
        private composittotimemodifyservice: CompositToTimeModifyService,
        private _formateService: FormateService
    ) { }

    ngOnInit() {
        this.noteInfo = this.composittotimemainservice.getNoteInfo();
        // this._logger.log("setdata", this.setData);

        if (this.setData['autoTrunCount'] == '0') {
            this.showAutoTurnType = false;
        } else {
            this.showAutoTurnType = true;
        }

        this._headerCtrl.setLeftBtnClick(() => {
            this.onLeftBtnClick();
        });

        // set request
        this.setSecurityReq();
    }

    /**
     * 返回編輯頁
     */
    onLeftBtnClick() {
        let output = {
            page: 'confirm',
            type: '',
            data: []
        };
        this.backPageEmit.emit(output);
    }



    onCancelBtnClick() {
        this._confirm.cancelEdit({type: 'edit'}).then(
            (res) => {
                this.navgator.editBack();
            },
            (errObj) => {

            }
        );
    }

    goMainlBtnClick() {
        let output = {
            'page': "result",

        };
        this.backPageEmit.emit(output);

    }

    onNext() {
        let requestData = this.composittotimemodifyservice.modifyReqData(this.reqData);
        this.composittotimemodifyservice.getResultData(requestData, {security: this.securityObj}).then(
            (result) => {
                this.statusObj = result.statusObj;
                this.resStatus = result.status;
                this.resultData = result.infoData;

                this.resultData.rateTypeCht = this.resultData['rateTypeCht'];
                this.resultData.rateTypeCht_Code = this.resultData['rateTypeCht_Code'];
                if (this.resultData.rateTypeCht_Code == '1') {
                    this.resultData.rateTypeCht = "COMPOSIT_TO_TIME.RATE1";
                } else if (this.resultData.rateTypeCht_Code == '2') {
                    this.resultData.rateTypeCht = "COMPOSIT_TO_TIME.RATE2";
                }
                this.resultData.autoTrunType = this.resultData['autoTrunType'];
                this.resultData.AutoTrunType_Code = this.resultData['AutoTrunType_Code'];
                if (this.resultData.AutoTrunType_Code == '1') {
                    this.resultData.autoTrunType = "COMPOSIT_TO_TIME.ONSELECTTYPES1";
                } else if (this.resultData.AutoTrunType_Code == '2') {
                    this.resultData.autoTrunType = "COMPOSIT_TO_TIME.ONSELECTTYPES2";
                }

                if (this.resultData['autoTrunCount'] == '0') {
                    this.showAutoTurnType = false;
                } else {
                    this.showAutoTurnType = true;
                }

                return Promise.resolve();
            },
            (errorObj) => {
                this.resStatus = false;
                let error_type = this._formateService.checkField(errorObj, 'resultType');
                if (error_type == 'security' || error_type == 'check') {
                    this.securityAction = { method: 'error' };
                    this.setSecurityError = errorObj;
                    return Promise.reject(errorObj);
                } else {
                    // Error
                    this.statusObj = errorObj;
                    this._logger.log("失敗", errorObj);
                    return Promise.resolve();
                }
            }
        ).then(
            () => {
                this._headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                this._headerCtrl.setRightBtnClick(() => {
                    this.navgator.editBack();
                });
                this.changemodify = false;
                this.showmodify = false;
                this.changresult = true;
            },
            () => {
                // error
            }
        );


    }

    /**
     * 安控[確認]按鈕點擊事件
     */
    onSecurityClick() {
        this.securityAction = {
            method: 'submit'
        };
    }

    /**
     * 安控回傳選擇物件
     * @param data
     */
    currentType(data) {
        this.securityObj = {};
    }

    /**
     * 安控回傳驗證物件
     * @param data
     */
    bakSecurityObj(data) {
        this._logger.error("bakSecurityObj", data);
        if (!data) {
            return false;
        }
        this.securityObj = data;
        this.onNext();
    }

    /**
     * 設定安控參數
     */
    private setSecurityReq() {
        let amt = this.setData['transSaveAmt'].replace(/,/g, '');
        this.reqData = {
            acno: this.setData['accountId'],
            aTransSaveData: this.setData['transSaveDataCode'],
            aTransSaveAmt: amt,
            saveRang: this.setData['saveType'],
            aSaveType: 'type1',
            aRateTypeCht: this.setData['rateTypeCht_Code'],
            aPayRateType: this.setData['payCycle'],
            payCycleMonth: this.setData['payCycleMonth'],
            aAutoTrunCount: this.setData['autoTrunCount'],
            aAutoTrunType: this.setData['AutoTrunType_Code']
        };
        let requestData = this.composittotimemodifyservice.modifyReqData(this.reqData);

        this.setSecurity.outAccount = this.setData['accountId'];
        this.setSecurity.currency = 'NTD'; // 目前只有台幣，外幣二階才處理
        this.setSecurity.amount = amt;
        this.setSecurity.signText = requestData;
        this.securityAction = { method: 'init' };
    }

}
