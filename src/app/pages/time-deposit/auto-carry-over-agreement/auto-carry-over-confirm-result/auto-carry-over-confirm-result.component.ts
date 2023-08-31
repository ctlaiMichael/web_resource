/**
 * 自動轉期約定確認頁和結果頁
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { AutoCarryOverService } from '@pages/time-deposit/shared/auto-carry-over.service';
import { Logger } from '@systems/system/logger/logger.service';

@Component({
    selector: 'app-auto-carry-over-confirm-result',
    templateUrl: './auto-carry-over-confirm-result.component.html',
    styleUrls: []
})

export class AutoCarryOverConfirmResultComponent implements OnInit {

    @Input() inputData;

    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();

    setSecurity = {
        transServiceId: '',
        nameOfSecurity: 'AUTOCARRYOVER'
    };
    securityAction = {
        method: 'init' 
    };
    securityObj = {};

    nowPage = 'check'; // 當前頁面
    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj

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

    turnTypeStr = '';

    reqData = {
        accountId: '', // 定存帳號
        turnCount: '', // 轉期次數
        turnType: '', // 轉期方法 1:本金 2:本金及利息
        interestAcc: '', // 利息轉入帳號
        isCompositeAccount: '' // 是否為綜定存 0:否 1:是
    };

    resData = {
        accountId: '',
        amount: '',
        rateType: '',
        rate: '',
        savingsRange: '',
        startDate: '',
        endDate: '',
        payCycle: '',
        turnCount: '',
        finalEndDate: '',
        turnType: '',
        interestAcc: ''
    };

    showInterestAcc = false; // 是否顯示利息轉入帳號

    constructor(
        private headerCtrl: HeaderCtrlService,
        private confirm: ConfirmService,
        private navgator: NavgatorService,
        private autoCarryOverService: AutoCarryOverService,
        private logger: Logger
    ) { }

    ngOnInit() {
        this.headerCtrl.setLeftBtnClick(() => {
            this.onLeftBtnClick();
        });

        if (this.inputData.action == 'create') {
            this.setSecurity.transServiceId = 'SPEC07030101';
        } else if (this.inputData.action == 'delete') {
            this.setSecurity.transServiceId = 'SPEC07030201';
        }

        if (this.inputData.turnType == '1') {
            this.turnTypeStr = 'TIME_DEPOSIT.AUTO_CARRY_OVER.PRINCIPAL';
        } else if (this.inputData.turnType == '2') {
            this.turnTypeStr = 'TIME_DEPOSIT.AUTO_CARRY_OVER.PRINCIPAL_INTEREST';
        }
    }

    /**
     * Header左側按鈕點擊事件
     */
    onLeftBtnClick() {
        this.backToEdit();
    }

    /**
     * 返回編輯頁
     */
    backToEdit() {
        let output = {
            page: 'check'
        };

        this.onBackPageEvent(output);
    }

    /**
     * 返回編輯頁面
     */
    onBackPageEvent(output) {
        this.backPageEmit.emit(output);
    }

    /**
     * [取消]按鈕點擊事件
     */
    onCancel() {
        this.confirm.cancelEdit({ type: 'edit' }).then(
            (res) => {
                this.navgator.editBack();
            },
            (errObj) => {

            }
        );
    }

    /**
     * 確認後發送約定電文
     */
    onConfirm() {
        this.reqData.accountId = this.inputData.accountId;
        this.reqData.turnCount = this.inputData.turnCount;
        this.reqData.turnType = this.inputData.turnType;
        this.reqData.isCompositeAccount = this.inputData.isCompositeAccount;
        if (this.inputData.turnType == '1' && this.inputData.isCompositeAccount == '0') {
            this.reqData.interestAcc = this.inputData.interestAcc;
        }

        let requestData = this.autoCarryOverService.modifyReqData(this.reqData);

        this.autoCarryOverService.sendData(requestData, {security: this.securityObj}).then(
            (res) => {
                this.resStatus = res.status;
                this.statusObj = res.statusObj;
                this.resData = res.data;

                if (this.resData.rateType == '1') {
                    this.resData.rateType = "TIME_DEPOSIT.AUTO_CARRY_OVER.FIXED";
                } else if (this.resData.rateType == '2') {
                    this.resData.rateType = "TIME_DEPOSIT.AUTO_CARRY_OVER.VARIABLE";
                }

                if (this.resData.payCycle == 'cycle1') {
                    this.resData.payCycle = "TIME_DEPOSIT.AUTO_CARRY_OVER.MATURITY";
                } else if (this.resData.payCycle == 'cycle2') {
                    this.resData.payCycle = "TIME_DEPOSIT.AUTO_CARRY_OVER.MONTHLY";
                }

                if (this.resData.turnType == '1') {
                    this.resData.turnType = "TIME_DEPOSIT.AUTO_CARRY_OVER.PRINCIPAL";
                } else if (this.resData.turnType == '2') {
                    this.resData.turnType = "TIME_DEPOSIT.AUTO_CARRY_OVER.PRINCIPAL_INTEREST";
                }

                if (this.resData.turnType == '1' && this.inputData.isCompositeAccount == '0') {
                    this.showInterestAcc = true;
                } else {
                    this.showInterestAcc = false;
                }

                return Promise.resolve();
            },
            (errObj) => {
                // Error
                this.resStatus = false;
                this.statusObj = errObj;
                return Promise.resolve();
            }
        ).then(
            () => {
                this.nowPage = 'result';
                this.headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                this.headerCtrl.setRightBtnClick(() => {
                    this.navgator.editBack();
                });
            }
        );

    }

    /**
     * 確認後發送解除約定電文
     */
    onDelete() {
        this.reqData.accountId = this.inputData.accountId;
        this.reqData.turnCount = this.inputData.turnCount;
        this.reqData.turnType = this.inputData.turnType;

        let requestData = this.autoCarryOverService.modifyReqData(this.reqData);

        this.autoCarryOverService.deleteData(requestData, {security: this.securityObj}).then(
            (res) => {
                this.resStatus = res.status;
                this.statusObj = res.statusObj;
                this.resData = res.data;
                return Promise.resolve();
            },
            (errObj) => {
                // Error
                this.resStatus = false;
                this.statusObj = errObj;
                return Promise.resolve();
            }
        ).then(
            () => {
                this.nowPage = 'result';
                this.headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                this.headerCtrl.setRightBtnClick(() => {
                    this.navgator.editBack();
                });
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
        this.logger.error("bakSecurityObj", data);
        if (!data) {
            return false;
        }
        this.securityObj = data;

        if (this.inputData.action == 'create') {
            this.onConfirm();
        } else if (this.inputData.action == 'delete') {
            this.onDelete();
        }
        
    }

}
