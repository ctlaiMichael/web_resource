/**
 * 台幣轉入帳號popup
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { Logger } from '@systems/system/logger/logger.service';
import { TwdTrainInPopupService } from './twd-tran-in-popup.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { FormateService } from '@template/formate/formate.service';
import { AccountMaskUtil } from '@util/formate/mask/account-mask-util';

@Component({
    selector: 'app-twd-tran-in-popup',
    templateUrl: './twd-tran-in-popup.component.html',
    styleUrls: [],
    providers: []
})

export class TwdTrainInPopupComponent implements OnInit {
    /**
     * 參數處理
     */
    offenData: any; // 常用帳號清單
    traninData: any; // 約定轉入帳號清單
    initChosse: string; // 紀錄第一次進component時的頁籤(判斷打勾使用)
    errorBoxMsg = '';
    nowPage = 'offen';
    // hasError = false; // 是否錯誤
    @Input() chooseType: string; // 顯示帳號種類, 預設常用
    @Input() select: string; // popup打勾之帳號
    @Input() compareAcct: string; // 比對之帳號(當下畫面之轉出帳號),用於比對轉入清單是否有與轉出相同之帳號
    @Input() deviceTrust: boolean; // 是否jbroot註記錯誤, true:正確 false:錯誤
    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();
    @Output() errorPageEmit: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _headerCtrl: HeaderCtrlService,
        private _logger: Logger,
        private _mainService: TwdTrainInPopupService,
        private _handleError: HandleErrorService,
        private _formateService: FormateService
    ) { }

    ngOnInit() {
        this._initEvent();
    }

    // 初始事件
    private _initEvent() {
        // 設定左側返回
        this._headerCtrl.setLeftBtnClick(() => {
            this.onBackPageEvent('tranint-popup', 'back', {});
        });
        // 預設常用
        this.chooseType = (typeof this.chooseType == 'undefined' || this.chooseType == '') ? 'tranIn' : this.chooseType;
        this.initChosse = this.chooseType; // 紀錄第一次進component時的頁籤(判斷打勾使用)
        this.nowPage = this.chooseType; // 切換頁面
        // 若選擇約定轉入帳號, 發約定轉入帳號api
        if (this.chooseType == 'tranIn') {
            this.getTranInData();
            // 若選擇常用帳號, 發常用帳號api
        } else {
           // 若為常用（非約轉） jbroot註記錯誤, 顯示錯誤畫面,不繼續後續流程
           let jbrootError = this.showJbrootError();
           // 檢核正確發送常用帳號api
           if(jbrootError == true) {
               this.getOffenData();
           } 
        }
    }

    /**
     * 點擊Tag 選擇「常用帳號」or「約定轉入帳號」
     * @param type 'offen': 常用帳號, 'tranIn': 約定轉入帳號
     */
    onSelectTag(type) {
        this._logger.log("into onSelectTag, type:", type);
        this._logger.log("into onSelectTag, chooseType:", this.chooseType);
        this.chooseType = type;
        this.nowPage = type;
        // 若選擇約定轉入帳號, 發約定轉入帳號api
        if (this.chooseType == 'tranIn') {
            this.getTranInData();
            // 若選擇常用帳號, 發常用帳號api
        } else {
            // 若為常用（非約轉） jbroot註記錯誤, 顯示錯誤畫面,不繼續後續流程
            let jbrootError = this.showJbrootError();
            // 檢核正確發送常用帳號api
            if(jbrootError == true) {
                this.getOffenData();
            }    
        }
    }

    /**
     * 取得「約定轉入帳號」
     */
    private getTranInData() {
        this._logger.log("getTranInData");
        this._mainService.getTranInData().then(
            (result) => {
                this._logger.log("getTranInData, result:", result);
                // 過濾轉入帳號清單,傳入之轉出帳號,若於轉入清單有重複,需過濾掉
                this.traninData = this.doFilterInAcct(this.compareAcct, result.data); // 約定轉入帳號清單
                // this.traninData = result.data; // 約定轉入帳號清單
                this._logger.log("getTranInData, traninData:", this.traninData);
            },
            (errorObj) => {
                this._logger.log("getTranInData, errorObj:", errorObj);
                this._handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorPage'; // 錯誤頁面
                // this.hasError = true;
            }
        );
    }

    /**
     * 取得「常用帳號」
     */
    private getOffenData() {
        this._logger.log("getOffenData");
        this._mainService.getOffenData().then(
            (result) => {
                this._logger.log("getOffenData, result:", result);
                this.offenData = result.data; // 常用帳號清單
                this._logger.log("getOffenData, offenData:", this.offenData);
            },
            (errorObj) => {
                this._logger.log("getOffenData, errorObj:", errorObj);
                this._handleError.handleError(errorObj);
                this.errorBoxMsg = errorObj.content;
                this.nowPage = 'errorPage'; // 錯誤頁面
            }
        );
    }

    /**
     * 點擊其中一筆
     * @param item 這筆資料
     * @param type 判斷點擊的帳戶為哪種帳號, 'offen': 常用帳號, 'tranIn': 約定轉入帳號
     */
    chooseOver(item, type) {
        this._logger.log("chooseOver, item:", item);
        this._logger.log("chooseOver, type:", type);
        let chooseData = {};
        chooseData = item;
        chooseData['chooseType'] = type;
        let show_bank_name = [];
        let bank_code = this._formateService.checkField(item, 'bankCode');
        let bank_name = this._formateService.checkField(item, 'bankName');
        if (bank_code != '') {
            show_bank_name.push(bank_code);
        }
        if (bank_name != '') {
            show_bank_name.push(bank_name);
        }
        chooseData['showBankName'] = show_bank_name.join('-');
        this._logger.log("chooseData:", chooseData);
        if (chooseData['chooseType'] == 'offen') {
            chooseData['showMaxAmt'] = '50000';
            this._logger.log("chooseType offen, chooseData['showMaxAmt']:", chooseData['showMaxAmt']);
        }
        if (chooseData['chooseType'] == 'tranIn') {
            this._logger.log("chooseType tranIn, idFlag:", chooseData['idFlag']);
            chooseData['showMaxAmt'] = chooseData['idFlag'] == 'Y' ? '9999999999' : '2000000';
            this._logger.log("chooseType tranIn, chooseData['showMaxAmt']:", chooseData['showMaxAmt']);
        }
        this.onBackPageEvent('tranint-popup', 'go', chooseData);
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
     * 過濾轉入帳號清單,傳入之轉出帳號,若於轉入清單有重複,需過濾掉
     * @param outAcct 傳入轉出帳號
     * 比對的帳號 轉出,轉入階須補0至16位
     */
    private doFilterInAcct(outAcct, inAcctData) {
        let inAcctList = [];
        let zeroOutAcct = AccountMaskUtil.accountAllNoFormate(outAcct); // 轉出 補至16位
        inAcctData.forEach(item => {
            let itemAcct = this._formateService.checkField(item, 'accountId');
            let zeroItemAcct = AccountMaskUtil.accountAllNoFormate(itemAcct);
            // 若不是重複,且不為空,就放入轉入帳號清單 (補0後比對)
            if (zeroItemAcct != '' && zeroOutAcct != zeroItemAcct) {
                inAcctList.push(item);
            }
        });
        return inAcctList;
    }

    /**
     * 顯示判斷jbroot錯誤
     */
    private showJbrootError() {
    // 若為常用（非約轉） jbroot註記錯誤, 顯示錯誤畫面,不繼續後續流程
    if(this.deviceTrust == false) {
         this.errorBoxMsg = 'ERROR.TRUSTED_DEVICE.INIT';
         this.nowPage = 'errorPage';
         return false;
        } else {
            return true;
        }
    }

}
