/**
 * [樣版] 安控介面
 */
import { Component, OnInit, OnChanges, EventEmitter, Input, Output, ElementRef, SimpleChanges, OnDestroy } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
// setting
import { SecurityOptions } from './security-options';
import { SECURITYSETTING, FINALSECURITYOBJ, FILTER } from '@conf/security/secruity-setting-of-function';
// service
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { SecurityInterfaceService } from './security-interface.service';
import { MenuPopupService } from '@template/list/menu-popup/menu-popup.service';
import { FormateService } from '@template/formate/formate.service';
import { CheckService } from '@template/check/check.service';
import { CheckDeviceBindService } from '@systems/system/init/check-device-bind.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { HandleErrorOptions } from '@systems/handle-error/handlerror-options';




@Component({
    selector: 'app-security-interface',
    templateUrl: './security-interface.component.html',
    styleUrls: [],
    providers: []
})
export class SecurityInterfaceComponent implements OnChanges, OnDestroy {

    /**
     * 參數處理
     */
    @Input() setSecurity: object;
    @Input() securityAction: object;
    @Input() setErrorObj: any; // 設定的error
    @Output() currentType: EventEmitter<any> = new EventEmitter<any>();
    @Output() bakSecurityObj: EventEmitter<any> = new EventEmitter<any>();
    private lockSubmitDubleClick = false; // 避免重複執行(重複點擊控制)
    seeStatus = false;

    inputValue = ''; // 明碼值
    inputValue_model = ''; // 顯示
    inputValue_mask = ''; // 遮碼值
    canUseSecurityList = []; // 對應的功能權限沒找到預設值
    currentMode = {}; // 現在執行的安控模式
    currentModeId = '';
    defaultTime = '300';
    leftTime = { time: this.defaultTime }; // 倒數秒數
    doClearTimer = false;
    errorMsg = '';

    finalSecurityobj = FINALSECURITYOBJ; // 最後送出的安控物件
    stopCountDown = false;

    resend = false;
    constructor(
        private securityObj: SecurityOptions,
        private _logger: Logger,
        private _handleError: HandleErrorService,
        private _mainService: SecurityInterfaceService,
        private _menuPop: MenuPopupService,
        private _formateService: FormateService,
        private _checkService: CheckService,
        private checkDeviceBind: CheckDeviceBindService,
        private auth: AuthService
        // private _SECURITYSETTING: SECURITYSETTING

    ) { }

    ngOnDestroy() {
        // 不顯示時關閉秒數
        this.stopCountDown = true;
    }


    async ngOnChanges(changes: SimpleChanges) {

        this._logger.log('Security', '傳入的安控設定值 security-interface.component.ts.63', this.securityAction, this.securityObj);
        let setSecurityMethod = this._formateService.checkField(this.securityAction, 'method');
        switch (setSecurityMethod) {
            // 安控初始化
            case 'init':
                this.securityInitEvent();
                break;
            case 'submit':
                this.securitySubmitEvent();
                break;
            case 'resend':
                // 根據選擇安控執行對應程式是邏輯 Promise
                this.doSecurity(this.currentMode);
                break;
            case 'error':
                // 設定錯誤訊息
                this.securityErrorEvent();
                break;
            default:
                this._logger.log('Security', '不做任何處理', setSecurityMethod);
                break;
        }

    }

    /**
     * 切換模式
     */
    changeTransMode() {
        // 使用 popup 模組 點選切換安控模式
        this._menuPop.show({
            // title: '',
            menu: this.canUseSecurityList,
            select: this.currentModeId
        }).then(
            (selectMode) => {
                // 不同才切換安控方式
                if (this.currentModeId != selectMode['id']) {
                    // 參數重設
                    // 根據選擇安控執行對應程式是邏輯
                    this.doSecurity(selectMode);
                }
            }, () => {
                // 使用者取消
            }
        );
    }

    /**
     * 
     * @param status 
     */
    getTimeStatus(status) {
        if (status == '0') {
            // 倒數時間
            this.reSetData();
            this.resend = true;

        } else if (status == 'leave') {
            // 
        }
    }

    // dofast 快速交易例外處理傳值且==true 才執行快速交易
    async doSecurity(selectMode, dofast?) {
        this._logger.log('Security', "目前切換的安控 security-interface.component.ts.171", selectMode, this.securityObj.setSecurity);
        try {
            // 一進功能執行安控判斷

            let backdata = await this._mainService.doSecurity(selectMode, this.securityObj.setSecurity, dofast);
            
            this._logger.log('Security', 'do security:', backdata);
            // 回來後重製
            this.reSetData();
            // 紀錄選擇的安控方法物件
            this.currentMode = selectMode;
            this.currentModeId = selectMode['id'];
            // 如果為OTP SSL更新畫面資料與merge最後準備送出的資料 
            this.finalSecurityobj = { ...this.finalSecurityobj, ...backdata };
            // 目前次回傳物件沒有一定要使用
            this.currentType.emit(selectMode);
            // 快速交易直接透過PLUGIN回傳一個動作完成才直接回傳其他要等使用者送出後才回傳
            if ((this.currentModeId == '4' || this.currentModeId == '3') && backdata && dofast == true) {
                if (this.finalSecurityobj['securityType'] == '4') {
                    this.finalSecurityobj['securityType'] = '3';
                }
                this.bakSecurityObj.emit(FILTER(this.finalSecurityobj));
            }
        } catch (errorObj) {
            this._logger.error('Security', errorObj, typeof errorObj);

            let check_code = this._formateService.checkField(errorObj, 'app_error_code', {
                to_string: true,
                trim_flag: true
            });
            // this._logger.error('check_code', check_code, typeof check_code);

            // 不是使用者取消才處理error
            if (check_code != '10') { 
                // 生物辨識有異動
                if (check_code == '3') {
                    // 清除本機裝置綁定資訊
                    this.checkDeviceBind.clearLocalBindData();
                    // 通知中台解除綁定
                    this.checkDeviceBind.unBind();

                    let security = {
                        fastPay: 'N'
                    };
                    this.auth.setSecurity(security); // 修改使用者的快速交易為停用
                }

                let errorOption = errorObj;
                if (!(errorObj instanceof HandleErrorOptions)) {
                    if (typeof errorObj == 'string') {
                        errorOption = this._handleError.getErrorObj({}, errorObj);
                    } else {
                        errorOption = this._handleError.getErrorObj(errorObj);
                    }
                }
                this._handleError.handleError(errorOption);
                // 統一跳error
            } else {
                // 使用者取消(no do)
            }
        }

    }

    /**
     * 遮碼
     */
    switchSee() {
        this.seeStatus = (!this.seeStatus) ? true : false;
        this.inputValue_model = (this.seeStatus ? this.inputValue : this.inputValue_mask);
    }

    /**
     * 
     * @param output 
     */
    inputChange(output) {
        this.inputValue = output.value;
        this.inputValue_mask = output.value_mask;
        this.inputValue_model = (this.seeStatus ? this.inputValue : this.inputValue_mask);
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    // 資料初始化
    private reSetData() {
        this.errorMsg = '';
        this.seeStatus = false;
        this.inputValue = ''; // 明碼值
        this.inputValue_model = ''; // 顯示
        this.inputValue_mask = ''; // 遮碼值
        this.stopCountDown = false;
        this.resend = false;
        this.leftTime = { time: this.defaultTime }; // 倒數秒數
        this.finalSecurityobj = FINALSECURITYOBJ;
    }


    /**
     * 檢查是否可執行送出
     * 避免重覆執行
     */
    private checkAllowSubmit() {
        if (this.lockSubmitDubleClick) {
            this._logger.log('Security', "鎖定點擊事件");
            return false;
        }
        this.lockSubmitDubleClick = true;
        setTimeout(() => {
            this._logger.log('Security', "復原點擊事件");
            this.lockSubmitDubleClick = false;
        }, 3000);
        return true;
    }

    /**
     * 功能指定進行init事件
     * securityAction method = init
     */
    private securityInitEvent() {
        // merge 功能帶入的設定值
        this.securityObj.setSecurity = { ...this.securityObj.setSecurity, ...this.setSecurity };
        // 對應的功能權限項目有哪些 沒找到用預設值權限
        let sucuritySeting = SECURITYSETTING[this.securityObj.setSecurity.nameOfSecurity];
        let functionSecurityMode = sucuritySeting ? sucuritySeting : SECURITYSETTING['DEFAULT'];
        // 比對判斷user有哪些權限可以執行
        this.canUseSecurityList = this._mainService.checkSecurityList(functionSecurityMode);
        this._logger.log('Security', '可使用安控權限 security-interface.component.ts.73', this.canUseSecurityList);

        // 有權限
        if (this.canUseSecurityList.length > 0) {
            // 取第一個做為預設
            // 根據選擇安控執行對應程式是邏輯 Promise

            this.doSecurity(this.canUseSecurityList[0]);
        }
        // 送出資料欄位驗證   
    }

    /**
     * 功能指定進行submit事件
     * securityAction method = submit
     */
    private securitySubmitEvent() {
        let allow_submit = this.checkAllowSubmit();
        if (!allow_submit) {
            return false;
        }
        // 還原Action 狀態
        // 使用者送出資料 欄位檢核後回傳
        this._logger.log('Security', '使用者點選送出按鈕 security-interface.component.ts.85');
        // 欄位檢核
        if (this.currentModeId == '3' || this.currentModeId == '4') {
            // 更正signText
            let new_signText = this._formateService.checkObjectList(this.securityAction, 'signText', 'object');
            if (!!new_signText) {
                this.securityObj.setSecurity.signText = new_signText;
            }
            
            // 送出才執行快速登交易
            this.doSecurity(this.currentMode, true);

        } else {
            // 1 =>SSL or  2 => OTP
            if (!this.resend) { // 重送時間到防呆 
                let checkObj = this._mainService.checkinput(this.currentModeId, this.inputValue);
                if (!checkObj.checkStaus) {
                    this.errorMsg = checkObj.errorMsg;
                } else {
                    this.errorMsg = '';
                    // OTP或SSL輸入資料驗證後整理回傳
                    let setcurity = this.securityObj.setSecurity;
                    let inputVal = {};
                    // 送出時間關閉倒數
                    // this.stopCountDown = true; // 11/17 因為輸錯會維持在這一頁
                    /* 
                    (SSL) currentModeId == 1  回傳 KEY lastFourNum
                     else (OTP) currentModeId == 2 回傳 KEY otpNum
                     如果未來有新增需要輸入型的安控要改成if判斷不用三元
                     */
                    inputVal = (this.currentModeId == '1') ? { lastFourNum: this.inputValue } : { otpNum: this.inputValue };
                    setcurity = { ...setcurity, ...inputVal };

                    // FILTER()過濾只回傳的欄位
                    this.finalSecurityobj = FILTER({ ...this.finalSecurityobj, ...setcurity });
                    if (this.finalSecurityobj['securityType'] == '5') {
                        this.finalSecurityobj['securityType'] = '2';
                    }
                    // 回傳值
                    this.bakSecurityObj.emit(this.finalSecurityobj);
                }
            }
        }
        // OTP 逾時重送   
    }

    /**
     * 功能指定進行submit事件
     * securityAction method = error
     */
    private securityErrorEvent() {
        this._logger.log('Security', "指定錯誤事件", this.setErrorObj);
        if (!this._checkService.checkObject(this.setErrorObj)) {
            this._logger.log('Security', "沒設定錯誤資料", this.setErrorObj);
            return false;
        }
        let error_type = this._formateService.checkField(this.setErrorObj, 'resultType');
        let error_data = this._handleError.getErrorObj(this.setErrorObj);
        error_data['type'] = 'dialog';
        this._handleError.handleError(error_data);
        if (error_type == 'security') {
            // security 欄位錯誤
            this.errorMsg = error_data.content;
        }
    }

}




