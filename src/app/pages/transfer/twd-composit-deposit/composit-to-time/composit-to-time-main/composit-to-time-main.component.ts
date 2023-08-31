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
import { CompositToTimeMainService } from '@pages/transfer/shared/composit-to-time-main.service';
import { CompositToTimeModifyService } from '@pages/transfer/shared/composit-to-time-modify.service';
import { TransAcctPopupService } from '@template/list/trans-acct-popup/trans-acct-popup.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';

@Component({
    selector: 'app-composit-to-time-main',
    templateUrl: './composit-to-time-main.html',
    styleUrls: []
})
export class CompositToTimeMainComponent implements OnInit {
    // request
    // reqData = {
    //     id: '',
    //     show: 'resultBox' // 顯示查詢結果, 'resultBox':成功, 'customBox':自訂清單, 'errorBox':錯誤畫面(白箱)
    // };
    nowPage = 'compositToTime';
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

    reqData = {
        acno: '',
        transsaVeamt: '',
        rateFormType: '',
        saveRang: 'type1',
        pageflowSaveType: '',
        autoTurnTypes: '',
        turnCount: '',
        payCycle: '',
        payCycleMonth: '0',
        avlAmount: ''
    };
    resData = {
        accountId: '',
        accountIdNickName: '',
        hasProFit: '',
        hasOrderProfit: '',
        transSaveData: '',
        transSaveDataCode: '',
        transSaveAmt: '',
        rateTypeCht: '',
        rateTypeCht_Code: '',
        autoTrunCount: '',
        payRateType: '',
        autoTrunType: '',
        AutoTrunType_Code: '',
        saveType: '',
        forWard: '',
        payCycle: '',
        payCycleMonth: ''
    };
    errorMsg = {
        transsaVeamt: '', // 轉出帳號
        pageflowSaveType: '', // 銀行代號
        turnCount: '' // 銀行代號(非約)
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

    // 打勾用
    tick = '0';
    // 變換用
    rate = '1'; // 選擇利率方式, 固定：'1', 機動：'2'
    cycle = 'cycle1'; // 選擇利率方式, 到期取息：'cycle1', 每x個月：'cycle2'
    types = 'type1'; // 自動轉期類別, 本金續存：'type1', 本金及利息：'type2'
    payCycleMonth = '0'; // 每X個月取息 到期取息帶0
    showTypes = true; // 是否顯示轉期方式選項

    // ------ 畫面顯示相關 ------
    showTranssaVeamt = ''; // 轉存金額
    pageflowSaveType = ''; // 存款期間
    turnCount = ''; // 轉期次數
    noteInfo: any; // 注意資訊

    outputData = {
        backPage: 'compositToTime'
    };

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
        private composittotimemainservice: CompositToTimeMainService,
        private composittotimemodifyservice: CompositToTimeModifyService,
        private _headerCtrl: HeaderCtrlService,
        private acctPopupService: TransAcctPopupService
    ) {}

    ngOnInit() {
        this._headerCtrl.setLeftBtnClick(() => {
            this.onCancelBtnClick();
        });
        // this._logger.log("godetail:",this.godetail);
        this._logger.log('into AccountMainComponent');
        this._initEvent();
        // this._logger.log("godetail:",this.godetail);
    }

    private _initEvent() {
        // 取得注意資訊
        // this.noteData = this._mainService.getNoteData();
        // this._logger.log("into _initEvent");
        // this.bookmarkData = this._mainService.getBookmark();
        // this._logger.log("_initEvent, bookmarkData:", this.bookmarkData);
        // 查詢頁面條件
        // this.searchBoxRule = this._mainService.getDateSet('custom');
        // this.composittotimeaccountservice.removeAllCache();
        // this.hasInit = true;
        // this._logger.log("godetail:",this.godetail);

        // send ap
        // 取得注意資訊
        this.noteInfo = this.composittotimemainservice.getNoteInfo();

        this.getAcctList(); // 查詢帳號

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
        if (this.cycle == 'cycle1') {
            this.payCycleMonth = '0';
        } else if (this.cycle == 'cycle2') {
            this.payCycleMonth = '1';
        }
        this._logger.log('onSelectCycle, cycle:', this.cycle);
    }
    // 自動轉期類別
    onSelectTypes(type) {
        this.types = type;
        this._logger.log('onSelectTypes, types:', this.types);
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
                
                if (this.showAcct.openAnAccount == '1') {
                    this.showpage = true;
                    this.changpage = false;
                } else {
                    this.showpage = false;
                    this.changpage = true;
                }

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
    // onScrollEvent(next_page) {
    // this._logger.log("into onScrollEvent, this.reqData:", this.reqData);
    // let appendBox: any;
    // appendBox = this.pageBox;
    // // switch (this.nowPageType) {
    // //     case 'today': appendBox = this.pageBoxToday; break;
    // //     case '7D': appendBox = this.pageBox7D; break;
    // //     case '1M': appendBox = this.pageBox1M; break;
    // //     case 'custom': appendBox = this.pageBox; break;
    // // }
    // if (!appendBox && this.reqData.show != 'resultBox') {
    //     this._logger.log('Deposit', 'stop scroll');
    //     return false;
    // }
    // this.nowAppendBox = appendBox;
    // this._logger.log('Deposit', 'onScrollEvent', this.pageCounter, 'totalPages', this.totalPages, 'next_page', next_page);
    // this.pageCounter = next_page;
    // let componentRef: any = this.paginatorCtrl.addPages(this.nowAppendBox, FundRedeemDetailComponent);
    // componentRef.instance.setData = this.reqData;
    // componentRef.instance.page = next_page;
    // componentRef.instance.sort = this.sort;
    // componentRef.instance.backPageEmit.subscribe(event => this.onPageBackEvent(event));
    // componentRef.instance.errorPageEmit.subscribe(event => this.onErrorBackEvent(event));
    // }

    /**
     * 子層返回事件(分頁)
     * @param e
     */
    onPageBackEvent(e) {
        this._logger.log('Deposit', 'onPageBackEvent123', e);
        let page = '';
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
            this.showTranssaVeamt = '';
            this.rate = '1';
            this.pageflowSaveType = '';
            this.types = 'type1';
            this.turnCount = '';
            this.cycle = 'cycle1';
            this.payCycleMonth = '1';
            this.changpage = false;
            this.showpage = false;
            this.showTypes = true;
            this.getAcctList();
        }
        this.nowPage = 'compositToTime';
        this._headerCtrl.setOption({
            leftBtnIcon: 'back',
            rightBtnIcon: '',
            title: 'FUNC.COMPOSITE_ACCOUNT_SERVICES.TRANSFER_TO_TIME_DEPOSIT_NOW'
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

    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    // 取得帳號
    private getAcctList() {
        this.composittotimemainservice.getOpenAcctData({}).then(
            result => {
                this.emptyAcc = false;
                this._logger.log('into getAcctListData, result:', result);
                this.acctData = result.data;
                this._logger.log('acctData:', this.acctData);

                this.showAcct.accountId = this.acctData[0]['accountId']; // default 預設第一筆
                this.showAcct.avlAmount = this.acctData[0]['avlAmount'];
                this.showAcct.openAnAccount = this.acctData[0]['openAnAccount'];
                this.showAcct.nickName = this.acctData[0]['nickName'];
                this.acctOption.select = this.acctData[0]['accountId'];

                if (this.showAcct.openAnAccount == '1') {
                    this.showpage = true;
                    this.changpage = false;
                } else {
                    this.showpage = false;
                    this.changpage = true;
                }
                if (this.acctData.length != 0) {
                    // 帶入帳號popup物件
                    this.acctOption.data = this.acctData;
                    // 顯示帳號相關
                    // this.showAcct.accountId = this.acctData[0]['accountId']; // default 預設第一筆
                    // this.showAcct.nickName = this.acctData[0]['nickName'];
                    // this.acctOption.select = this.acctData[0]['accountId'];
                }
            },
            errorObj => {
                this._logger.log('into getAcctListData, errorOb:', errorObj);
                this.errorContent = errorObj.content;
                this.changpage = false;
                this.showpage = false;
                this.emptyAcc = true;
            }
        );
    }
    // 確認頁用
    private getModifyList(reqData) {
        this.composittotimemodifyservice.getListData(reqData).then(
            result => {
                this._logger.log('into getAcctListData, result:', result);
                let infoData = result.infoData;
                this._logger.log('acctData:', this.acctData);
                this.resData.accountId = infoData['accountId']; // default 預設第一筆
                this.resData.accountIdNickName = infoData['accountIdNickName'];
                this.resData.hasProFit = infoData['hasProFit'];
                this.resData.hasOrderProfit = infoData['hasOrderProfit'];
                this.resData.transSaveData = infoData['transSaveData'];
                this.resData.transSaveDataCode = infoData['transSaveDataCode'];
                this.resData.transSaveAmt = infoData['transSaveAmt'];
                this.resData.rateTypeCht = infoData['rateTypeCht'];
                this.resData.rateTypeCht_Code = infoData['rateTypeCht_Code'];
                if (this.resData.rateTypeCht_Code == '1') {
                    this.resData.rateTypeCht = "COMPOSIT_TO_TIME.RATE1";
                } else if (this.resData.rateTypeCht_Code == '2') {
                    this.resData.rateTypeCht = "COMPOSIT_TO_TIME.RATE2";
                }
                this.resData.autoTrunCount = infoData['autoTrunCount'];
                this.resData.payRateType = infoData['payRateType'];
                this.resData.autoTrunType = infoData['autoTrunType'];
                this.resData.AutoTrunType_Code = infoData['AutoTrunType_Code'];
                if (this.resData.AutoTrunType_Code == '1') {
                    this.resData.autoTrunType = "COMPOSIT_TO_TIME.ONSELECTTYPES1";
                } else if (this.resData.AutoTrunType_Code == '2') {
                    this.resData.autoTrunType = "COMPOSIT_TO_TIME.ONSELECTTYPES2";
                }
                this.resData.saveType = infoData['saveType'];
                this.resData.forWard = infoData['forWard'];
                this.resData.payCycle = reqData.payCycle;
                this.resData.payCycleMonth = this.payCycleMonth;
                this.changemodify = true;
                this.changpage = false;
            },
            errorObj => {
                this.showTranssaVeamt = '';
                this.rate = '1';
                this.pageflowSaveType = '';
                this.types = 'type1';
                this.turnCount = '';
                this.cycle = 'cycle1';
                this.payCycleMonth = '1';
                this._logger.log('into getAcctListData, errorOb:', errorObj);
                this.changpage = false;
                this.showpage = false;
                this.handleError.handleError(errorObj);
            }
        );
    }

    // 取得是否開戶註記 及 餘額
    // private getOpenAcct() {
    //     this.composittotimemainservice.getOpenAcctData({}).then(
    //         (result) => {
    //             this._logger.log("into getOpenAcct, result:", result);
    //             this.openAcctList = result.data;
    //             // this.keyAcctData = result.keyData;
    //             if (this.openAcctList.openAnAccount == '1'){
    //                 this.showOpenAcct.avlAmount = this.openAcctList[0]['avlAmount'];
    //                 this.showpage = true;
    //                 this.changpage = false;
    //                 this._logger.log("為什麼空值", this.showOpenAcct.avlAmount);
    //             }else{
    //                 this.showpage = false;
    //                 this.changpage = true;
    //                 this.showOpenAcct.avlAmount = this.openAcctList[0]['avlAmount'];
    //                 this._logger.log("為什麼空值", this.showOpenAcct.avlAmount);
    //                 // this.showOpenAcct.balance = this.openAcctList[0]['balance'];
    //                 // this.showOpenAcct.openAnAccount = this.openAcctList[0]['openAnAccount'];
    //             }
    //         },
    //         (errorObj) => {
    //             this._logger.log("into getOpenAcct, errorOb:", errorObj);
    //         }
    //     );
    // }

    // 初始化判斷畫面
    // private getInitPage(){
    //     this.composittotimemainservice.getOpenAcctData({}).then(
    //         (result) => {
    //             this._logger.log("into getOpenAcct, result:", result);
    //             this.openAcctList = result.data;
    //             this.keyAcctData = result.keyData;
    //             if (this.keyAcctData[this.showAcct.accountId]['openAnAccount'] == '1'){
    //                 this.changpage = false;
    //             }else{
    //                 this.showOpenAcct.balance = this.keyAcctData[this.showAcct.accountId]['balance'];
    //                 // this.showOpenAcct.balance = this.openAcctList[0]['balance'];
    //                 // this.showOpenAcct.openAnAccount = this.openAcctList[0]['openAnAccount'];
    //             }
    //         },
    //         (errorObj) => {
    //             this._logger.log("into getOpenAcct, errorOb:", errorObj);
    //         }
    //     );
    // }

    /**
     * 重設頁面
     */
    // private _resetPage() {
    //     this._logger.log("into _resetPage");
    //     this.pageCounter = 1;
    //     this.totalPages = 0;
    //     if (this.nowAppendBox) {
    //         this.nowAppendBox.clear();
    //     }
    // }
    /**
     * [取消]按鈕點擊事件
     */
    onCancelBtnClick() {
        this._confirm.cancelEdit({type: 'edit'}).then(
            (res) => {
                this.navgator.editBack();
            },
            (errObj) => {

            }
        );
    }

    // 點擊下一步
    onNext() {
        this._logger.log('onNext, showTranssaVeamt:', this.showTranssaVeamt);
        this._logger.log('onNext, pageflowSaveType:', this.pageflowSaveType);
        this._logger.log('onNext, turnCount:', this.turnCount);
        this.reqData = {
            acno: this.showAcct.accountId,
            transsaVeamt: this.showTranssaVeamt,
            rateFormType: this.rate,
            saveRang: 'type1',
            pageflowSaveType: this.pageflowSaveType,
            autoTurnTypes: this.types,
            turnCount: this.turnCount,
            payCycle: this.cycle,
            payCycleMonth: this.payCycleMonth,
            avlAmount: this.showAcct.avlAmount
        };
        let checkData = this.composittotimemainservice.checkData(this.reqData);
        if (checkData.status == true) {
            // 發api
            this._logger.log('有檢核過', checkData.status);
            this.errorMsg.transsaVeamt = '';
            this.errorMsg.pageflowSaveType = '';
            this.errorMsg.turnCount = '';
            this.getModifyList(this.reqData);
        } else {
            this.alert.show('ERROR.DATA_FORMAT_ERROR');
            // error show
            this._logger.log('無檢核', checkData.status);
            this._logger.log('checkData', checkData);
            this.errorMsg.transsaVeamt = checkData.error_list.transsaVeamt;
            this.errorMsg.pageflowSaveType =
                checkData.error_list.pageflowSaveType;
            this.errorMsg.turnCount = checkData.error_list.turnCount;
            return false;
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
        this.nowPage = 'currencyRate';
    }

    showTranssaVeamtChange(output) {
        this.showTranssaVeamt = output.value;
    }

    pageflowSaveTypeChange(output) {
        this.pageflowSaveType = output.value;
    }

    turnCountChange(output) {
        this.turnCount = output.value;
        if (this.turnCount == '0') {
            this.showTypes = false;
            this.types = 'type1';
        } else {
            this.showTypes = true;
        }
    }
}
