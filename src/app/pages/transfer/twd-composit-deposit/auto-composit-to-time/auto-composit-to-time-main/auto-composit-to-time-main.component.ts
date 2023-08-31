/**
 * 綜存開戶約定
 */
import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    Output,
    EventEmitter
} from '@angular/core';
// import { FormateService } from '@template/formate/formate.service';
import { Logger } from '@systems/system/logger/logger.service';
// import { PaginatorCtrlService } from '@template/paginator/paginator-ctrl.srevice';
// import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
// import { AutoFundRedeemService } from '@pages/fund/shared/auto-fund-redeem.service';
import { FormateService } from '@template/formate/formate.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { TransAcctPopupService } from '@template/list/trans-acct-popup/trans-acct-popup.service';
import { AutoCompositToTimeMainService } from '@pages/transfer/shared/auto-composit-to-time-main.service';
import { AutoCompositToTimeModifyService } from '@pages/transfer/shared/auto-composit-to-time-modify.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Component({
    selector: 'app-auto-composit-to-time-main',
    templateUrl: './auto-composit-to-time-main.html',
    styleUrls: []
})
export class AutoCompositToTimeMainComponent implements OnInit {

    nowPage = 'autoCompositToTime';
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
    // request
    // reqData = {
    //     id: '',
    //     show: 'resultBox' // 顯示查詢結果, 'resultBox':成功, 'customBox':自訂清單, 'errorBox':錯誤畫面(白箱)
    // };
    acno: string; // 給acno用
    reqData = {
        // 放檢核欄位
        // acno: ''
    };
    resData = {
        accountId: '',
        accountIdNickName: '',
        modifyType: '',
        transDepositAmt: '',
        despoitType: '',
        transSaveData: '',
        rateFunction: '',
        payCycle: '',
        payCycleMonth: '',
        savingsRange: '',
        takerate: '',
        notifyData: '',
        owndData: ''
    };
    outPutData = {
        acno: '',
        modifyType: '',
        transDepositAmt: '',
        transSaveData: '',
        despoitType: '',
        rateFunction: '',
        rateFunctionCode: '',
        payCycle: '',
        payCycleCode: '',
        payCycleMonth: '1',
        savingsRange: '',
        notifyData: '',
        owndData: '',
        type: ''
    };
    errorMsg = {

        transDepositAmt: '', // 留存餘額
        savingsRange: '', // 存款期間
    };

    acctData: any; // 帳號資料

    // 帳號popup
    showAcct = {
        accountId: '',
        nickName: '',
        avlAmount: '',
        openAnAccount: ''
    };
    // 給popoup顯示資訊(轉出帳號)
    acctOption = {
        data: [],
        select: '',
        type: '6'
    };

    // 判斷帳號是否做約定
    // showOpenAcct = {
    //     avlAmount: '',
    //     openAnAccount: ''
    // };
    openAcctList: any; // 開戶資訊array
    keyAcctData: any;
    openAutoList: any; // 自動開戶資訊array
    // noteData: any; // 注意資訊
    // expandFlag = false; // 是否全部展開
    // expandStr = 'BTN.UNFOLD';

    // 分頁機制相關 Start
    // pageCounter = 1; // 當前頁次
    // totalPages = 0; // 全部頁面
    // 搬過來的
    infoData: any = {}; // SPEC05030102 存款帳戶明細查詢(資訊)
    // listData: any = []; //SPEC05030102 存款帳戶明細查詢(明細)
    // contentData = {}; // 選擇的明細資料
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();

    // @ViewChild('pageBox', { read: ViewContainerRef }) pageBox: ViewContainerRef; // 動態生成(自訂)
    private nowAppendBox: any;
    // 錯誤處理相關
    // errorMsg = ''; // 顯示白箱(錯誤訊息)
    // defaultAcct = ''; // 取得預設帳號(不一定有)
    // hasInit = false; //是否初始化
    changpage = false; // 控制編輯
    showpage = false; // 控制開戶
    errorboxFlag = false; // 控制白箱
    info: any;
    contentData: any;
    changemodify = false; // 切換編輯頁
    changresult = false; // 切換結果頁
    showmodify = false; // 控制結果
    getListData = true;
    errorContent = "";
    emptyAcc = false;
    showlift = false; // 控制解除
    changlift = false; // 控制解除按鈕
    liftmodify = false; // 控制解除編輯
    // 打勾用
    tick = '0';
    // 變換用
    rate = '1'; // 選擇利率方式, 固定：'1', 機動：'2'
    cycle = 'cycle1'; // 選擇付息周期, 到期取息：'cycle1', 每x個月：'cycle2'

    // ------ 畫面顯示相關 ------
    showTransDepositAmt = ''; // 留存餘額
    savingsRange = ''; // 存款期間
    noteInfo: any; //   注意資訊

    openAccData = {
        acno: ''
    };

    constructor(
        private alert: AlertService,
        private _formateServcie: FormateService,
        private _logger: Logger,
        private handleError: HandleErrorService,
        // private _headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private _confirm: ConfirmService,
        private autocomposittotimemainservice: AutoCompositToTimeMainService,
        private autocomposittotimemodifyservice: AutoCompositToTimeModifyService,
        private _headerCtrl: HeaderCtrlService,
        private acctPopupService: TransAcctPopupService
    ) { }

    ngOnInit() {
        // this._logger.log("godetail:",this.godetail);
        this._logger.log('into AccountMainComponent');
        this._initEvent();
        // this._logger.log("godetail:",this.godetail);
    }

    private _initEvent() {


        // send ap
        // 取得注意資訊
        this.noteInfo = this.autocomposittotimemainservice.getNoteInfo();

        this.getAcctList(false); // 查詢帳號

        // 

        // this.composittotimeaccountservice.getListData({}, {}).then(
        //     (result) => {
        //         console.log("縱存開戶約定成功", result);
        //         this.infoData = result.infoData;
        //     },
        //     (errorObj) => {
        //         console.log("縱存開戶約定失敗", errorObj);
        //     }
        // );
    }

    /**
     *
     * @param type 固定：'1', 機動：'2'
     */
    onSelectRate(type) {
        this.rate = type;
        this._logger.log('onSelectRate, rate:', this.rate);
    }
    // 付息週期
    onSelectCycle(type) {
        this.cycle = type;
        this._logger.log('onSelectCycle, cycle:', this.cycle);
    }

    // 點擊選擇帳號
    onSelectAcct() {
        this._logger.log('onSelectAcct');
        this.acctPopupService.show(this.acctOption).then(
            result => {
                this._logger.log('onSelectAcct, result:', result);
                this.acctOption.select = result['accountId']; // 記錄下次要顯示的帳號
                // 畫面顯示用
                this.showAcct = {
                    accountId: result['accountId'],
                    nickName: result['nickName'],
                    avlAmount: result['avlAmount'],
                    openAnAccount: result['openAnAccount']
                };
                //   this. showAcct.accountId = result['accountId'];
                //   this.showOpenAcct.avl
                // this.getAcctList(true); // 查詢開戶註記 餘額
                
                this.getAutoAcctList(result);
            },
            cancel => {
                this._logger.log('into cancel');
            }
        );
    }

    //
    /**
     * 帳號回傳(準備查詢交易明細)
     * @param e
     */

    /**
     * 頁籤回傳
     * @param e
     */

    /**
     * 切換頁面
     * @param pageType
     * @param pageData
     */

    /**
     * 自訂表單查詢返回事件(變動查詢起訖)
     * @param e
     */

    /**
     * Scroll Event
     * @param next_page
     */

    /**
     * 子層返回事件(分頁)
     * @param e
     */
    onPageBackEvent(e) {
        this._logger.log('Deposit', 'onPageBackEvent123', e);
        let page = 'list';
        let pageType = 'list';
        let tmp_data: any;
        this.changemodify = false;
        if (typeof e === 'object') {
            if (e.hasOwnProperty('page')) {
                page = e.page;
            }
        }

        if (page == 'openAccount') {
            this.changpage = false;
            this.showpage = true;
        }
        
        if (page == 'confirm') {
            this.changpage = true;
            this.showpage = false;
        }

        if (page == 'result') {
            this.showAcct = {
                accountId: '',
                nickName: '',
                avlAmount: '',
                openAnAccount: ''
            };
            this.showTransDepositAmt = '';
            this.savingsRange = '';
            this.rate = '1';
            this.cycle = 'cycle1';
        }
        this.nowPage = 'autoCompositToTime';
        this._headerCtrl.setOption({
            leftBtnIcon: 'back',
            rightBtnIcon: ''
        }); // 變更Header按鈕樣式
        this._headerCtrl.setLeftBtnClick(() => {
            this.navgator.editBack();
        });
    }
    onPageBackEventLift(e) {
        this._logger.log('doodododood', e);
        let page = 'list';
        let pageType = 'list';
        let tmp_data: any;
        this.showpage = false;
        this.changpage = false;
        this.changemodify = false;
        this.showlift = true;
        this.changlift = true;
        this.liftmodify = false;
        if (typeof e === 'object') {
            if (e.hasOwnProperty('page')) {
                page = e.page;
            }
        }
        this._headerCtrl.setOption({
            leftBtnIcon: 'back',
            rightBtnIcon: ''
        }); // 變更Header按鈕樣式
        this._headerCtrl.setLeftBtnClick(() => {
            this.navgator.editBack();
        });
    }

    /**
     * 失敗回傳(分頁)
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
        // 下方顯示白箱
        // this.reqData.show = 'errorBox';
        this.errorMsg = errorObj.content; // 給錯誤訊息
        this.errorboxFlag = true;
        // this.hasInit = false;
        // this._logger.log("onErrorBackEvent, pageCounter:", this.pageCounter);

        // switch (page) {
        //     case 'list-page':
        //         // == 分頁返回 == //
        //         if (this.pageCounter == 1) {
        //             this._logger.log("pageCounter == 1, errorObj:", errorObj);
        //             // 列表頁：首次近來錯誤推頁
        //             this.dataTime = (errorObj.hasOwnProperty('dataTime')) ? errorObj['dataTime'] : '';
        //             // == 2019/6/19 不alert錯誤原因(改頁面顯示) == //
        //             errorObj['type'] = 'dialog';
        //             this._handleError.handleError(errorObj);
        //         } else {
        //             this._logger.log("pageCounter !=1, errorObj:", errorObj);
        //             // 其他分頁錯誤顯示alert錯誤訊息
        //             errorObj['type'] = 'dialog';
        //             this._handleError.handleError(errorObj);
        //         }
        //         break;
        // }
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    // 取得帳號
    private getAcctList(hasSelect: boolean) {
        this.autocomposittotimemainservice.getOpenAcctData({}).then(
            (result) => {
                this.emptyAcc = false;
                this._logger.log('into getAcctListData, result:', result);
                this.acctData = result.data;
                this._logger.log('acctData:', this.acctData);
                if (this.acctData.length != 0) {
                    // 帶入帳號popup物件
                    this.acctOption.data = this.acctData;
                    // 顯示帳號相關
                    // this.showAcct.accountId = this.acctData[0]['accountId']; // default 預設第一筆
                    // this.showAcct.nickName = this.acctData[0]['nickName'];
                    // this.acctOption.select = this.acctData[0]['accountId'];
                }
                if (!hasSelect) {
                    // default
                    this.showAcct.accountId = this.acctData[0]['accountId']; // default 預設第一筆
                    this.showAcct.avlAmount = this.acctData[0]['avlAmount'];
                    this.showAcct.openAnAccount = this.acctData[0]['openAnAccount'];
                    this.showAcct.nickName = this.acctData[0]['nickName'];
                    this.acctOption.select = this.acctData[0]['accountId'];

                    this.getAutoAcctList(this.showAcct);
                }

            },
            (errorObj) => {
                this._logger.log('into getAcctListData, errorOb:', errorObj);
                this.changpage = false;
                this.showpage = false;
                this.emptyAcc = true;
            }
        );
    }
    /**
     * 取帳號資料
     * @param reqData 
     */
    private getAutoAcctList(nowAct) {
        // 開戶處理
        if (this.showAcct.openAnAccount == '1') {
            this._headerCtrl.setOption({
                title: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.AUTO_TRANSFER_TO_TIME_DEPOSIT',
                leftBtnIcon: 'back',
                rightBtnIcon: ''
            }); // 變更Header按鈕樣式
            this.showpage = true;
            this.changpage = false;
            this.getListData = true;
            this.showlift = false;
            this.changlift = false;

            return false;
        } else {
            this.showpage = false;
            this.changpage = false;
            this.acno = this.showAcct.accountId;
        }

        let reqData = {
            "acno": this._formateServcie.checkField(nowAct, 'accountId')
        };
        // let resData = {
        //     modifyType: this.resData.modifyType,
        //     transDepositAmt: this.resData.transDepositAmt,
        //     savingsRange: this.resData.savingsRange,
        //     rateFunction: this.resData.rateFunction,
        //     payCycle: this.resData.payCycle,
        // };

        this.autocomposittotimemodifyservice.getListData(reqData).then(
            result => {
                this.getListData = true;
                this._logger.log('auto getAcctListData, result:', result);
                this.acno = this.showAcct.accountId;
                this.openAutoList = result.infoData;
                this._logger.log('auto AutoList, result:', this.openAutoList);
                this.outPutData.modifyType = this.openAutoList.modifyType;
                this.outPutData.notifyData = this.openAutoList.notifyData;
                this.outPutData.owndData = this.openAutoList.owndData;
                if (this.openAutoList.modifyType == 'N') {
                    this._headerCtrl.setOption({
                        title: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.AUTO_TRANSFER_TO_TIME_DEPOSIT',
                        leftBtnIcon: 'back',
                        rightBtnIcon: ''
                    }); // 變更Header按鈕樣式
                    this.showpage = false;
                    this.changpage = true;
                    this.changemodify = false;
                    this.changlift = false;
                    this.showlift = false;
                    this.showTransDepositAmt = '';
                    this.savingsRange = '';
                    this.rate = '1';
                    this.cycle = 'cycle1';
                } else {
                    this._headerCtrl.setOption({
                        title: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.AUTO_TRANSFER_TO_TIME_DEPOSIT_DEL',
                        leftBtnIcon: 'back',
                        rightBtnIcon: ''
                    }); // 變更Header按鈕樣式
                    this.showTransDepositAmt = this.openAutoList['transDepositAmt']; // default 預設第一筆
                    this.savingsRange = this.openAutoList['savingsRange'];
                    this.rate = this.openAutoList['rateFunction'];
                    this.cycle = this.openAutoList['payCycle'];
                    
                    this.outPutData.acno = this.openAutoList['accountId'];
                    this.outPutData.transDepositAmt = this.openAutoList['transDepositAmt'];
                    this.outPutData.transSaveData = this.openAutoList['transSaveData'];
                    this.outPutData.despoitType = this.openAutoList['despoitType'];
                    this.outPutData.rateFunctionCode = this.openAutoList['rateFunction'];
                    this.outPutData.savingsRange = this.openAutoList['savingsRange'];
                    this.outPutData.payCycleCode = this.openAutoList['payCycle'];
                    this.outPutData.payCycleMonth = this.openAutoList['payCycleMonth'];
                    this.outPutData.notifyData = this.openAutoList['notifyData'];
                    this.outPutData.owndData = this.openAutoList['owndData'];
                    switch (this.rate) {
                        case '1':
                            this.rate = "COMPOSIT_TO_TIME.RATE1";
                            break;
                        case '2':
                            this.rate = "COMPOSIT_TO_TIME.RATE2";
                            break;
                    }
                    switch (this.cycle) {
                        case 'cycle1':
                            this.cycle = "COMPOSIT_TO_TIME.CYCLE1";
                            break;
                        case 'cycle2':
                            this.cycle = "COMPOSIT_TO_TIME.CYCLE2";
                            break;
                    }
                    this.showpage = false;
                    this.changpage = false;
                    this.showlift = true;
                    this.changlift = true;
                    this.changemodify = false;
                }
            },
            errorObj => {
                if (errorObj.hasOwnProperty('content')) {
                    this.errorContent = errorObj.content;
                }
                this.getListData = false;
                this._logger.log('into getAcctListData, errorOb:', errorObj);
                this.changpage = false;
                this.showpage = false;
                this.handleError.handleError(errorObj);
            }
        );
    }

    /**
     * [取消]按鈕點擊事件
     */
    onCancelBtnClick() {
        // this.navgator.pop();//回上頁
        this.navgator.editBack(); // 回家
    }

    // 點擊下一步
    onNext() {
        this._logger.log('onNext, showtransDepositAmt:', this.showTransDepositAmt);
        this._logger.log('onNext, savingsRange:', this.savingsRange);
        let rangeMoney = 10000; // 預設檢核10000
        this.outPutData.acno = this.showAcct.accountId;
        this.outPutData.transDepositAmt = this.showTransDepositAmt.replace(/\,/g, '');
        this.outPutData.savingsRange = this.savingsRange;
        this.outPutData.rateFunction = this.rate;
        this.outPutData.rateFunctionCode = this.rate;
        this.outPutData.payCycle = this.cycle;
        this.outPutData.payCycleCode = this.cycle;
        // this.getModifyList(this.resData);
        let checkData = this.autocomposittotimemainservice.checkData(
            this.outPutData, rangeMoney
        );
        if (checkData.status == true) {
            // 發api
            this.errorMsg.transDepositAmt = '';
            this.errorMsg.savingsRange = '';
            this.showpage = false;
            this.changpage = false;
            this.changemodify = true;
            this._logger.log('測試轉換', this.outPutData.rateFunction, this.outPutData.payCycle);
            switch (this.outPutData.rateFunctionCode) {
                case '1':
                    this.outPutData.rateFunction = "COMPOSIT_TO_TIME.RATE1";
                    break;
                case '2':
                    this.outPutData.rateFunction = "COMPOSIT_TO_TIME.RATE2";
                    break;
            }
            switch (this.outPutData.payCycleCode) {
                case 'cycle1':
                    this.outPutData.payCycle = "COMPOSIT_TO_TIME.CYCLE1";
                    break;
                case 'cycle2':
                    this.outPutData.payCycle = "COMPOSIT_TO_TIME.CYCLE2";
                    break;
            }
            this._logger.log('測試轉換', this.outPutData.payCycle, this.outPutData.rateFunction);
        } else {
            this.alert.show('ERROR.DATA_FORMAT_ERROR');
            // error show
            this.errorMsg.transDepositAmt = checkData.error_list.transDepositAmt;
            this.errorMsg.savingsRange = checkData.error_list.savingsRange;
            return false;
        }
    }
    onNextlift() {
        this._logger.log('sjsjsjsjsjjsjsjsjsjsjjsjsj:', this.showTransDepositAmt);
        this._logger.log('onNext, savingsRange:', this.savingsRange);
        this.outPutData.type = "DEL";
        // this.getModifyList(this.resData);
        this.showpage = false;
        this.changpage = false;
        this.changemodify = false;
        this.showlift = false;
        this.changlift = false;
        this.liftmodify = true;
        switch (this.outPutData.rateFunctionCode) {
            case '1':
                this.outPutData.rateFunction = "COMPOSIT_TO_TIME.RATE1";
                break;
            case '2':
                this.outPutData.rateFunction = "COMPOSIT_TO_TIME.RATE2";
                break;
        }
        switch (this.outPutData.payCycleCode) {
            case 'cycle1':
                this.outPutData.payCycle = "COMPOSIT_TO_TIME.CYCLE1";
                break;
            case 'cycle2':
                this.outPutData.payCycle = "COMPOSIT_TO_TIME.CYCLE2";
                break;
        }
    }

    openAccount() {
        this.openAccData.acno = this.acctOption.select;
        this.nowPage = 'openAccount';
    }
    onchangeresult() {
        this.changresult = true;
    }
    goTwRate() {
        this.navgator.push('currencyRate');
    }

    showTransDepositAmtChange(output) {
        this.showTransDepositAmt = output.value;
    }

    savingsRangeChange(output) {
        this.savingsRange = output.value;
    }
}
