/**
 * 設備綁定
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { DeviceBindService } from '@pages/setting/shared/service/device-bind.service';
import { CheckDeviceBindService } from '@systems/system/init/check-device-bind.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { BiometricInterfaceService } from '@lib/biometric/biometric-interface.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { environment } from '@environments/environment';
import { LocalStorageService } from '@lib/storage/local-storage.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { CryptoService } from '@lib/crypto/crypto.service';
import { DeviceListService } from '@pages/setting/shared/service/device-list.service';
import { FormateService } from '@template/formate/formate.service';

@Component({
    selector: 'app-device-bind',
    templateUrl: './device-bind.component.html',
    styleUrls: []
})

export class DeviceBindComponent implements OnInit {

    @Input() inputData;

    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();

    setSecurity = {
        transServiceId: '',
        nameOfSecurity: 'DEVICEBIND'
    };
    setSecurityError: any = {}; // 安控錯誤變數
    securityAction = {
        method: 'init' 
    };
    securityObj = {};

    nowPage = 'edit';
    isOTPing = false; // 是否按下手機確認碼發送按鈕

    nowStep = 'edit'; // 當前步驟
    // 步驟列data
    stepMenuData = [
        {
            id: 'agree-content',
            name: 'STEP_BAR.DEVICE_BIND.STEP1' // 同意條款頁
        },
        {
            id: 'edit',
            name: 'STEP_BAR.DEVICE_BIND.STEP2' // 認證資料頁
        },
        {
            id: 'result',
            name: 'STEP_BAR.COMMON.RESULT', // 結果頁
            // 執行此步驟時是否隱藏步驟列
            hidden: true
        }
    ];

    deviceName = ''; // 自取裝置名稱
    fastStatus = '1'; // 快速設定狀態 1:約定 2:約定及非約
    fastNonAgree = '0'; // 非約轉按鈕 0:關 1:開
    phoneNumber = ''; // OTP電話號碼

    output = {
        uuid: '',
        deviceName: '',
        fastType: '',
        fastStatus: '',
        fastMac: '',
        os: '',
        platform: '',
        otpNumber: '',
        bioToken: ''
    };

    checkData = { // 欄位檢核回傳物件
        status: false,
        errMsgObj: {}
    };

    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj

    constructor(
        private logger: Logger,
        private headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private deviceBindService: DeviceBindService,
        private checkDeviceBind: CheckDeviceBindService,
        private confirm: ConfirmService,
        private bioService: BiometricInterfaceService,
        private handleErrorService: HandleErrorService,
        private localStorage: LocalStorageService,
        private auth: AuthService,
        private alert: AlertService,
        private crypto: CryptoService,
        private deviceListService: DeviceListService,
        private _formateService: FormateService
    ) { }

    ngOnInit() {
        // 變更Header標題
        this.headerCtrl.setOption({title: 'SETTING.FAST_SETTING.TITLE4'});
        // 變更Header左側按鈕功能
        this.headerCtrl.setLeftBtnClick(() => {
            this.onBackPageEvent('result');
        });

        if (!this.inputData.phone && !this.inputData.phoneOtp && !!this.inputData.phoneCard && this.inputData.isCardUser) {
            this.fastStatus = '1';
            this.fastNonAgree = '0';
            this.phoneNumber = this.inputData.phoneCard;
            this.setSecurity.transServiceId = 'SPEC03010101C';
        } else if (!!this.inputData.phone && !!this.inputData.phoneOtp) {
            if (this.inputData.fastStatus == '1') {
                this.fastStatus = '1';
                this.fastNonAgree = '0';
                this.phoneNumber = this.inputData.phone;
                this.setSecurity.transServiceId = 'SPEC03010101A';
            } else if (this.inputData.fastStatus == '2') {
                this.fastStatus = '2';
                this.fastNonAgree = '1';
                this.phoneNumber = this.inputData.phoneOtp;
                this.setSecurity.transServiceId = 'SPEC03010101B';
            }
        } else if (!!this.inputData.phone) {
            this.fastStatus = '1';
            this.fastNonAgree = '0';
            this.phoneNumber = this.inputData.phone;
            this.setSecurity.transServiceId = 'SPEC03010101A';
        } else if (!!this.inputData.phoneOtp) {
            this.fastStatus = '2';
            this.fastNonAgree = '1';
            this.phoneNumber = this.inputData.phoneOtp;
            this.setSecurity.transServiceId = 'SPEC03010101B';
        }
    }

    /**
     * 非約定快速交易 按鈕點擊事件
     */
    onClickNonAgree() {
        if (!this.inputData.phoneOtp && this.fastNonAgree == '0') {
            // 使用者沒有臨櫃約定電話，要開啟非約快速設定，提示
            this.alert.show("SETTING.FAST_SETTING.MSG.NO_OTP_PHONE");
            return false;
        } else if (!!this.inputData.phoneOtp && this.fastNonAgree == '0') {
            this.fastStatus = '2';
            this.fastNonAgree = '1';
            this.phoneNumber = this.inputData.phoneOtp;
            this.setSecurity.transServiceId = 'SPEC03010101B';
            this.isOTPing = false;
            this.securityAction = {
                method: 'init'
            };
        } else if (!this.inputData.phone && this.fastNonAgree == '1') {
            // 使用者沒有聯絡電話，要關閉非約快速設定，提示
            this.alert.show("SETTING.FAST_SETTING.MSG.NO_NORMAL_PHONE");
            return false;
        } else if (this.fastNonAgree == '1') {
            this.fastStatus = '1';
            this.fastNonAgree = '0';
            this.phoneNumber = this.inputData.phone;
            this.setSecurity.transServiceId = 'SPEC03010101A';
            this.isOTPing = false;
            this.securityAction = {
                method: 'init'
            };
        }

    }

    /**
     * [取消]按鈕點擊事件
     */
    onCancelBtnClick() {
        this.confirm.cancelEdit({type: 'edit'}).then(
            (res) => {
                this.navgator.editBack();
            },
            (errObj) => {

            }
        );
    }

    /**
     * [手機確認碼發送]按鈕點擊事件
     */
    onSendOTPClick() {
        this.output.uuid = this.inputData.uuid;
        this.output.deviceName = this.deviceName;
        this.output.fastType = this.inputData.fastType;
        this.output.fastStatus = this.fastStatus;
        this.output.fastMac = this.inputData.uuid;
        this.output.os = this.inputData.os;
        this.output.platform = this.inputData.platform;
        this.output.bioToken = this.inputData.bioToken;

        this.checkData = this.deviceBindService.checkData(this.output);
        
        if (this.checkData.status) {
            this.isOTPing = true;
        }
        
    }
    
    /**
     * 確認後發送電文
     */
    onConfirm() {
        if (this.checkData.status) {
            let requestData = this.deviceBindService.modifyReqData(this.output);

            this.deviceBindService.sendData(requestData, {security: this.securityObj}).then(
                (res) => {
                    this.resStatus = res.status;
                    this.statusObj = res.statusObj;
                    let fastData = {
                        fast_custId: '',
                        bindStatus: '',
                        fastType: '',
                        fastStatus: '',
                        patternErrCount: ''
                    };
                    this.localStorage.setObj('token', this.output.bioToken);
                    if (environment.NATIVE) {
                        fastData = {
                            fast_custId: '',
                            bindStatus: res.bindStatus,
                            fastType: res.fastType,
                            fastStatus: res.fastStatus,
                            patternErrCount: res.patternErrCount
                        };

                        // 加密儲存到localStorage
                        this.crypto.AES_Encrypt('lb_scsb', res.custId).then(
                            (res_Encode) => {
                                fastData.fast_custId = res_Encode.value;
                                this.checkDeviceBind.saveLocalBindData(fastData);
                            },
                            (error_Encode) => {
                                this.logger.error('error_Encode', error_Encode);
                            }
                        );
                    } else {
                        fastData = {
                            fast_custId: this.inputData.custId,
                            bindStatus: '1',
                            fastType: this.inputData.fastType,
                            fastStatus: this.fastStatus,
                            patternErrCount: '0'
                        };
                        this.checkDeviceBind.saveLocalBindData(fastData);
                    }
                    
                    let setObj = {
                        fastPay: (fastData.bindStatus == '1' ? 'Y' : 'N'),
                        deviceBind: fastData.bindStatus,
                        mode: fastData.fastType,
                        fastAgreement: fastData.fastStatus
                    };
                    this.auth.setFastData(setObj);
                    
                    if (fastData.fastType == '2') {
                        // 啟用生物辨識
                        this.bioService.enableBioService().then(
                            (result) => {

                            },
                            (err) => {
                                
                            }
                        );
                    }
                    return Promise.resolve();
                },
                (errObj) => {
                    // Error
                    this.resStatus = false;
                    let error_type = this._formateService.checkField(errObj, 'resultType');
                    if (error_type == 'security' || error_type == 'check') {
                        this.securityAction = { method: 'error' };
                        this.setSecurityError = errObj;
                        return Promise.reject(errObj);
                    } else {
                        // Error
                        this.statusObj = errObj;
                        return Promise.resolve();
                    }
                }
            ).then(
                () => {
                    this.nowPage = 'result';
                    this.headerCtrl.setOption(
                        { title: 'SETTING.FAST_SETTING.TITLE4', leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
                    this.headerCtrl.setRightBtnClick(() => {
                        this.onBackPageEvent('result');
                    });
                    this.deviceListService.removeCache();
                },
                () => {
                    // reject
                }
            );
        }
        
    }

    /**
     * 安控[確認]按鈕點擊事件
     */
    onSecurityClick() {
        this.output.uuid = this.inputData.uuid;
        this.output.deviceName = this.deviceName;
        this.output.fastType = this.inputData.fastType;
        this.output.fastStatus = this.fastStatus;
        this.output.fastMac = this.inputData.uuid;
        this.output.os = this.inputData.os;
        this.output.platform = this.inputData.platform;
        this.output.bioToken = this.inputData.bioToken;

        this.checkData = this.deviceBindService.checkData(this.output);

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
        this.onConfirm();
    }
    
    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 返回快速交易設定頁面
     */
    private onBackPageEvent(type) {
        let output = {
            page: type
        };
        this.backPageEmit.emit(output);
    }

}
