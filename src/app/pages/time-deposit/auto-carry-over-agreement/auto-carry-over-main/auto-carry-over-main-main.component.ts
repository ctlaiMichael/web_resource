/**
 * 自動轉期約定
 */
import { Component, OnInit } from '@angular/core';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { auto_carry_over_content } from '@pages/time-deposit/shared/notePopup-content';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { TransAcctPopupService } from '@template/list/trans-acct-popup/trans-acct-popup.service';
import { AutoCarryOverService } from '@pages/time-deposit/shared/auto-carry-over.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { ObjectCheckUtil } from '@util/check/object-check-util';

@Component({
    selector: 'app-auto-carry-over-main',
    templateUrl: './auto-carry-over-main.component.html',
    styleUrls: []
})

export class AutoCarryOverMainComponent implements OnInit {

    // 注意事項設定
    notePopupOption = {
        title: 'POPUP.NOTE.TITLE',
        content: auto_carry_over_content
    };

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

    nowBookMark = 'principal'; // 當前分頁

    // 頁籤data
    bookmarkData = [
        {
            id: 'principal',
            name: 'TIME_DEPOSIT.AUTO_CARRY_OVER.PRINCIPAL',
            sort: 1
        },
        {
            id: 'principal-interest',
            name: 'TIME_DEPOSIT.AUTO_CARRY_OVER.PRINCIPAL_INTEREST',
            sort: 2
        }
    ];

    timeDepositAccount = []; // 定存帳號Data
    selectTimeDepositAcc = ''; // 已選定存帳號
    interestAccount = []; // 利息轉入帳號Data
    selectInterestAcc = ''; // 已選利息轉入帳號
    turnCount = ''; // 轉期次數
    turnType = '1'; // 轉期方法 1:本金 2:本金及利息
    turnTypeStr = '';

    // 定存帳號當前選擇物件
    chooseTimeDepositAccountObj = {
        accountId: '',
        nickName: '',
        currencyCode: '',
        balance: '',
        isSetted: '',
        turnCount: '',
        turnType: '',
        interestAcc: '',
        isCompositeAccount: ''
    };

    // 利息轉入帳號當前選擇物件
    chooseInterestAccountObj = {
        accountId: '',
        nickName: ''
    };

    outputData = {
        action: '',
        accountId: '',
        turnCount: '',
        turnType: '',
        interestAcc: '',
        isCompositeAccount: ''
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
        private autoCarryOverService: AutoCarryOverService,
        private alert: AlertService,
        private handleError: HandleErrorService
    ) { }

    ngOnInit() {
        this.headerCtrl.setLeftBtnClick(() => {
            this.onCancel();
        });

        this.getAccountData();
    }

    /**
     * 頁籤選擇完返回事件
     */
    onBookMarkBack(e) {
        if (this.nowBookMark == e.data.id) {
            return false;
        }
        
        this.nowBookMark = e.data.id;

        if (this.nowBookMark == 'principal') {
            this.turnType = '1';
        } else if (this.nowBookMark == 'principal-interest') {
            this.turnType = '2';
            this.selectInterestAcc = '';
            this.chooseInterestAccountObj = {
                accountId: '',
                nickName: ''
            };
        }

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
                this.onTransAccChange(accountItem, 'timeDeposit');
            },
            () => {
                // 使用者取消

            }
        );
    }

    /**
     * 打開利息轉入帳號選單popup
     */
    InterestAccPopOpen() {
        this.transAccPop.show({
            title: 'TIME_DEPOSIT.AUTO_CARRY_OVER.SELECT_INTEREST_ACC',
            data: this.interestAccount,
            select: this.selectInterestAcc,
            type: '7'
        }).then(
            (accountItem) => {
                this.onTransAccChange(accountItem, 'interest');
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
        this.outputData.action = 'create';
        this.outputData.accountId = this.selectTimeDepositAcc;
        this.outputData.turnCount = this.turnCount;
        this.outputData.turnType = this.turnType;
        this.outputData.isCompositeAccount = this.chooseTimeDepositAccountObj.isCompositeAccount;
        if (this.nowBookMark == 'principal' && this.chooseTimeDepositAccountObj['isCompositeAccount'] == '0') {
            this.outputData.interestAcc = this.selectInterestAcc;
        }

        this.checkData = this.autoCarryOverService.checkData(this.outputData);

        if (this.checkData.status) {
            this.nowPage = 'confirm';
        } else {
            this.alert.show('ERROR.DATA_FORMAT_ERROR');
        }

    }

    /**
     * [立即解約]按鈕點擊事件
     */
    onDelete() {
        this.outputData.action = 'delete';
        this.outputData.accountId = this.chooseTimeDepositAccountObj.accountId;
        this.outputData.turnCount = this.chooseTimeDepositAccountObj.turnCount;
        this.outputData.turnType = this.chooseTimeDepositAccountObj.turnType;
        this.outputData.interestAcc = this.chooseTimeDepositAccountObj.interestAcc;
        this.nowPage = 'confirm';
    }

    turnCountChange(output) {
        this.turnCount = output.value;
    }

    /**
     * 子層返回事件
     * @param e
     */
    onBackPage(e) {
        this.nowPage = 'edit';
        this.headerCtrl.setOption({ leftBtnIcon: 'edit-back', rightBtnIcon: '' }); // 變更Header按鈕樣式
        this.headerCtrl.setLeftBtnClick(() => {
            this.navgator.editBack();
        });
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
        this.autoCarryOverService.getData().then(
            (res) => {
                this.timeDepositAccount = res.timeDepositAccount;
                this.interestAccount = res.interestAccount;
                if (ObjectCheckUtil.checkEmpty(res.timeDepositAccount, true)) {
                    this.onTransAccChange(this.timeDepositAccount[0], 'timeDeposit');
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
     * @param type timeDeposit: 定存帳號 interest: 利息轉入帳號
     */
    private onTransAccChange(item, type) {
        if (type == 'timeDeposit') {
            if (item.isCompositeAccount == '1') {
                this.selectInterestAcc = '';
                this.chooseInterestAccountObj = {
                    accountId: '',
                    nickName: ''
                };
            }

            this.selectTimeDepositAcc = item.accountId;
            this.chooseTimeDepositAccountObj = {
                accountId: item.accountId,
                nickName: item.nickName,
                currencyCode: item.currencyCode,
                balance: item.balance,
                isSetted: item.isSetted,
                turnCount: item.turnCount,
                turnType: item.turnType,
                interestAcc: item.interestAcc,
                isCompositeAccount: item.isCompositeAccount
            };

            if (this.chooseTimeDepositAccountObj.turnType == '1') {
                this.turnTypeStr = 'TIME_DEPOSIT.AUTO_CARRY_OVER.PRINCIPAL';
            } else if (this.chooseTimeDepositAccountObj.turnType == '2') {
                this.turnTypeStr = 'TIME_DEPOSIT.AUTO_CARRY_OVER.PRINCIPAL_INTEREST';
            }
        } else if (type == 'interest') {
            this.selectInterestAcc = item.accountId;
            this.chooseInterestAccountObj = {
                accountId: item.accountId,
                nickName: item.nickName
            };
        }

    }

}
