/**
 * (綜存)自動轉存(確認,結果頁)
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AutoCompositToTimeModifyService } from '@pages/transfer/shared/auto-composit-to-time-modify.service';
import { NgIf } from '@angular/common';
import { FormateService } from '@template/formate/formate.service';
@Component({
    selector: 'app-auto-composit-to-time-modify',
    templateUrl: './auto-composit-to-time-modify.html',
    styleUrls: []
})

export class AutoCompositToTimeModifyComponent implements OnInit {
    @Input() setData: any; // 編輯頁資料
    @Input() outData: any;
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();

    // ------ 安控相關 Start ------ //
    // 安控設定檔
    setSecurity = {
        transServiceId: 'SPEC09020302',
        nameOfSecurity: 'AUTOCOMPOSITTOTIME',
        signText: {}
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
    changemodify = false; // 切換編輯頁
    changresult = false; // 切換結果頁
    showmodify = false; // 控制結果
    statusObj = {}; // 結果頁顯示結過狀態
    resStatus = false; // 判斷結果文字是否打開
    changpage = false; // 控制編輯
    liftmodify = false; // 控制解除編輯
    showliftmodify = false; // 控制解除編輯按鈕
    liftresult = false; // 控制解除結果頁

    // 控制結果頁欄位,眼睛
    showEye = {
        actBal: false, // 帳上餘額
        avlBal: false // 可用餘額
    };
    requestData = {};
    reqData = {
        acno: '',
        modifyType: '',
        transDepositAmt: '',
        rateFunction: '',
        payCycle: '',
        payCycleMonth: '',
        savingsRange: '',
        notifyData: '',
        owndData: '',
    };
    reqLiftData = {
        acno: '',
        transDepositAmt: '',
        // transSaveData: '',
        despoitType: '',
        rateFunction: '',
        savingsRange: '',
        payRateRange: '',
        payCycleMonth: '',
        notifyData: '',
        owndData: '',
    };
    reqChData = {
        ChadespoitType: '',
        CharateFunction: '',
        ChapayRateRange: '',
    };

    constructor(
        private _logger: Logger,
        private _handleError: HandleErrorService,
        private _headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private confirm: ConfirmService,
        private autocomposittotimemodifyservice: AutoCompositToTimeModifyService,
        private _formateService: FormateService
    ) { }

    ngOnInit() {
        this._headerCtrl.setLeftBtnClick(() => {
            this.onLeftBtnClick('confirm');
        });
        if (this.setData.type == "DEL") {
            this.liftmodify = true;
            this.changemodify = false;
            this.showliftmodify = true;
            this.showmodify = false;

            this.reqLiftData = {
                acno: this.setData['acno'],
                transDepositAmt: this.setData['transDepositAmt'].replace(/\,/g, ''),
                // transSaveData: this.setData['transSaveData'],
                despoitType: this.setData['despoitType'],
                rateFunction: this.setData['rateFunctionCode'],
                savingsRange: this.setData['savingsRange'],
                payRateRange: this.setData['payCycleCode'],
                payCycleMonth: this.setData['payCycleMonth'],
                notifyData: this.setData['notifyData'],
                owndData: this.setData['owndData'],
            };
            this.requestData = this.autocomposittotimemodifyservice.modifyReqLiftData(this.reqLiftData);
            this.setSecurity.signText = this.requestData;
        } else {
            this.liftmodify = false;
            this.changemodify = true;
            this.showmodify = true;
            this.showliftmodify = false;

            this.reqData = {
                acno: this.setData['acno'],
                modifyType: this.setData['modifyType'],
                transDepositAmt: this.setData['transDepositAmt'],
                rateFunction: this.setData['rateFunctionCode'],
                payCycle: this.setData['payCycleCode'],
                payCycleMonth: this.setData['payCycleMonth'],
                savingsRange: this.setData['savingsRange'],
                notifyData: this.setData['notifyData'],
                owndData: this.setData['owndData'],
            };
            this.requestData = this.autocomposittotimemodifyservice.modifyReqData(this.reqData);
            this.setSecurity.signText = this.requestData;
        }
    }

    /**
     * 返回編輯頁
     */
    onLeftBtnClick(page?, type?, data?) {
        this._logger.log("into onBackPageEvent, page type data", page, type, data);
        let output = {
            'page': page,
            'type': type,
            'data': data
        };
        this.backPageEmit.emit(output);
    }



    onCancelBtnClick() {
        this.navgator.editBack();
    }

    goMainlBtnClick() {
        let output = {
            'page': "result",

        };
        this.backPageEmit.emit(output);

    }

    onNext() {
        this.autocomposittotimemodifyservice.getResultData(this.requestData, { security: this.securityObj }).then(
            (result) => {
                this.statusObj = result.statusObj;
                this.resStatus = result.status;
                this.resultData = result.infoData;
                switch (this.resultData.despoitType) {
                    case '1':
                        this.reqChData.ChadespoitType = "定期存款";
                        break;
                    case '2':
                        this.reqChData.ChadespoitType = "存本取息";
                        break;
                    case '3':
                        this.reqChData.ChadespoitType = "整存整付";
                        break;
                }
                switch (this.resultData.rateFunction) {
                    case '1':
                        this.reqChData.CharateFunction = "COMPOSIT_TO_TIME.RATE1";
                        break;
                    case '2':
                        this.reqChData.CharateFunction = "COMPOSIT_TO_TIME.RATE2";
                        break;
                }
                switch (this.resultData.payRateRange) {
                    case 'cycle1':
                        this.reqChData.ChapayRateRange = "COMPOSIT_TO_TIME.CYCLE1";
                        break;
                    case 'cycle2':
                        this.reqChData.ChapayRateRange = "COMPOSIT_TO_TIME.CYCLE2";
                        break;
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
                this.liftmodify = false;
                this.showliftmodify = false;
                this.liftresult = false;
            },
            () => {
                // error
            }
        );


    }

    onNextLift() {
        this.autocomposittotimemodifyservice.getResultLiftData(this.requestData, { security: this.securityObj }).then(
            (result) => {
                this.statusObj = result.statusObj;
                this.resStatus = result.status;
                this.resultData = result.infoData;
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
                this.changresult = false;
                this.liftresult = true;
                this.liftmodify = false;
                this.showliftmodify = false;
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
        if (this.setData.type == "DEL") {
            this.onNextLift();
        } else {
            this.onNext();
        }
    }

}
