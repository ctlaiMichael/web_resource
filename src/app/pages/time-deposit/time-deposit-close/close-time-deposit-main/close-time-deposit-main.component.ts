/**
 * 定存結清
 */
import { Component, OnInit } from '@angular/core';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { TransAcctPopupService } from '@template/list/trans-acct-popup/trans-acct-popup.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { CloseTimeDepositService } from '@pages/time-deposit/shared/close-time-deposit.service';
import { ObjectCheckUtil } from '@util/check/object-check-util';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Component({
    selector: 'app-close-time-deposit-main',
    templateUrl: './close-time-deposit-main.component.html',
    styleUrls: []
})

export class CloseTimeDepositMainComponent implements OnInit {

    nowPage = 'edit'; // 當前頁面

    nowStep = 'edit'; // 當前步驟

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

    timeDepositAccount = []; // 定存帳號Data
    selectTimeDepositAcc = ''; // 已選定存帳號

    // 定存帳號當前選擇物件
    chooseTimeDepositAccountObj = {
        accountId: "",
        nickName: "",
        combinedAcc: "",
        combinedAccNickname: "",
        currencyCode: "",
        finalBalance: "",
        principal: "",
        interestAmt: "",
        taxPayable: "",
        interestPayable: ""
    };

    outputData = {
        action: '',
        accountId: '',
        turnCount: '',
        turnType: '',
        interestAcc: ''
    };

    checkData = {
        status: false,
        errMsgObj: {}
    };

    constructor(
        private confirm: ConfirmService,
        private navgator: NavgatorService,
        private headerCtrl: HeaderCtrlService,
        private transAccPop: TransAcctPopupService,
        private alert: AlertService,
        private closeTimeDepositService: CloseTimeDepositService,
        private handleError: HandleErrorService
    ) { }

    ngOnInit() {
        this.headerCtrl.setLeftBtnClick(() => {
            this.onCancel();
        });

        this.getAccountData();
    }

    /**
     * 打開定存帳號選單popup
     */
    timeDepositAccPopOpen() {
        this.transAccPop.show({
            title: 'TIME_DEPOSIT.AUTO_CARRY_OVER.SELECT_TIME_DEPOSIT_ACC',
            data: this.timeDepositAccount,
            select: this.selectTimeDepositAcc,
            type: '7'
        }).then(
            (accountItem) => {
                this.onTransAccChange(accountItem);
            },
            () => {
                // 使用者取消

            }
        );
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
     * [下一步]按鈕點擊事件
     */
    onNext() {
        this.outputData.accountId = this.selectTimeDepositAcc;

        // this.checkData = this.autoCarryOverService.checkData(this.outputData);

        if (this.checkData.status) {
            this.nowPage = 'confirm';
        } else {
            this.alert.show('ERROR.DATA_FORMAT_ERROR');
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
     * 取得帳號data
     */
    private getAccountData() {
        this.closeTimeDepositService.getData().then(
            (res) => {
                this.timeDepositAccount = res.timeDepositAccount;
                if (ObjectCheckUtil.checkEmpty(res.timeDepositAccount, true)) {
                    this.onTransAccChange(this.timeDepositAccount[0]);
                }
            },
            (errObj) => {
                // Error
                this.handleError.handleError(errObj);
            }
        );
    }

    /**
     * 變更成選擇完後的帳號物件
     * @param item popup選單返回的帳號物件
     */
    private onTransAccChange(item) {
            this.selectTimeDepositAcc = item.accountId;
            this.chooseTimeDepositAccountObj = {
                accountId: item.accountId,
                nickName: item.nickName,
                combinedAcc: item.combinedAcc,
                combinedAccNickname: item.combinedAccNickname,
                currencyCode: item.currencyCode,
                finalBalance: item.finalBalance,
                principal: item.principal,
                interestAmt: item.interestAmt,
                taxPayable: item.taxPayable,
                interestPayable: item.interestPayable
            };
    }

}
