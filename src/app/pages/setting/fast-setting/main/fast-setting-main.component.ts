/**
 * 快速設定
 */
import { environment } from '@environments/environment';
import { Component, OnInit } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { DeviceListService } from '@pages/setting/shared/service/device-list.service';
import { CheckDeviceBindService } from '@systems/system/init/check-device-bind.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { AlertService } from '@template/msg/alert/alert.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { PatternLockPopupService } from '@lib/pattern/pattern-lock-popup.service';
import { DeviceService } from '@lib/device/device.service';
import { BiometricInterfaceService } from '@lib/biometric/biometric-interface.service';
import { HandleErrorService } from '@systems/handle-error/handle-error.service';
import { CryptoService } from '@lib/crypto/crypto.service';
import { FormateService } from '@template/formate/formate.service';

@Component({
    selector: 'app-fast-setting-main',
    templateUrl: './fast-setting-main.component.html',
    styleUrls: []
})

export class FastSettingComponent implements OnInit {
    // notePopupOption = {}; // 注意事項設定

    nowPage = 'main';

    nowStep = 'agree-content'; // 當前步驟
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

    newBind = false; // true: 新綁定 false: 已綁定，變更模式
    fastSettingObj = { // 快速設定物件: 0 關閉 1 啟用
        fastStatus: '', // 快速設定狀態 1:約定 2:約定及非約
        fastNormal: '0', // 快速登入和一般快速交易
        fastNonAgree: '0', // 非約定快速交易
        fastType: '', // 使用模式 1:圖形 2:生物辨識
        pattern: '0', // 圖形碼
        biometrics: '0' // 臉部/指紋
    };
    fastStatus = '';
    fastNormal = '0';
    fastNonAgree = '0';
    fastType = '';
    pattern = '0';
    biometrics = '0';
    useTypeName = '';

    deviceListObj = { // 傳入裝置綁定清單頁面Obj
        action: '',
        deviceData: [],
        deviceList: {}
    };
    deviceData = []; // 已綁定裝置清單
    deviceList = {}; // 已綁定裝置Obj
    number = 0; // 已綁定裝置數量
    agreeContent = '0'; // 是否勾選同意 0:沒勾選 1:有勾選

    outputData = { // 傳入新增裝置綁定頁面Obj
        custId: '',
        uuid: '',
        fastType: '',
        fastStatus: '',
        fastMac: '',
        os: '',
        platform: '',
        bioToken: '',
        phone: '',
        phoneOtp: '',
        phoneCard: '',
        isCardUser: false
    };

    custId = '';
    tempFastData; // 本機裝置綁定資訊
    showNonAgreeBtn = false;
    phone = '';
    phoneOtp = '';
    phoneCard = '';
    isCardUser = false;
    haveList = false;

    constructor(
        private logger: Logger,
        private headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private deviceListService: DeviceListService,
        private checkBindService: CheckDeviceBindService,
        private auth: AuthService,
        private alert: AlertService,
        private confirm: ConfirmService,
        private patternPopup: PatternLockPopupService,
        private device: DeviceService,
        private bioService: BiometricInterfaceService,
        private handleErrorService: HandleErrorService,
        private crypto: CryptoService,
        private formateService: FormateService
    ) { }

    ngOnInit() {
        this.deviceListService.removeCache();
        // this.notePopupOption = {
        //     title: 'POPUP.NOTE.TITLE',
        //     content: '',
        // };

        this.phone = this.auth.getPhone();
        this.phoneOtp = this.auth.getPhoneOtp();
        this.phoneCard = this.auth.getPhoneCard();
        this.isCardUser = this.auth.checkAllowAuth("isCardUser");
        this.outputData.phone = this.phone;
        this.outputData.phoneOtp = this.phoneOtp;
        this.outputData.phoneCard = this.phoneCard;
        this.outputData.isCardUser = this.isCardUser;

        // 取得本機裝置綁定資訊
        this.custId = this.auth.getCustId();
        this.tempFastData = this.checkBindService.getLocalBindData();

        if (this.tempFastData !== null && this.tempFastData.hasOwnProperty('fast_custId')) {
            if (environment.NATIVE) {
                this.crypto.AES_Decrypt('lb_scsb', this.tempFastData.fast_custId).then(
                    (res_Dncode) => {
                        this.tempFastData.fast_custId = res_Dncode.value;

                        // 如果本機有裝置綁定資訊且綁定的ID與當前使用者相同，帶入快速設定資料
                        if (this.tempFastData.fast_custId == this.custId && this.tempFastData.bindStatus == '1') {
                            this.fastSettingObj.fastType = this.tempFastData.fastType;
                            if (this.fastSettingObj.fastType == '1') {
                                this.fastSettingObj.pattern = '1';
                                this.useTypeName = 'SETTING.FAST_SETTING.PATTERN';
                            } else if (this.fastSettingObj.fastType == '2') {
                                this.fastSettingObj.biometrics = '1';
                                this.useTypeName = 'SETTING.FAST_SETTING.FACE_FINGER_PRINT';
                            }
                            this.fastSettingObj.fastStatus = this.tempFastData.fastStatus;
                            if (this.tempFastData.fastStatus == '1') {
                                this.fastSettingObj.fastNormal = '1';
                                this.showNonAgreeBtn = true;
                            } else if (this.tempFastData.fastStatus == '2') {
                                this.fastSettingObj.fastNormal = '1';
                                this.fastSettingObj.fastNonAgree = '1';
                                this.showNonAgreeBtn = false;
                            } else {

                            }
                            this.fastStatus = this.fastSettingObj.fastStatus;
                            this.fastNormal = this.fastSettingObj.fastNormal;
                            this.fastNonAgree = this.fastSettingObj.fastNonAgree;
                            this.fastType = this.fastSettingObj.fastType;
                            this.pattern = this.fastSettingObj.pattern;
                            this.biometrics = this.fastSettingObj.biometrics;
                        }
                    },
                    (error_Dncode) => {
                        this.logger.error('fastData error_Dncode', error_Dncode);
                    }
                );
            } else {
                // 如果本機有裝置綁定資訊且綁定的ID與當前使用者相同，帶入快速設定資料
                if (this.tempFastData.fast_custId == this.custId && this.tempFastData.bindStatus == '1') {
                    this.fastSettingObj.fastType = this.tempFastData.fastType;
                    if (this.fastSettingObj.fastType == '1') {
                        this.fastSettingObj.pattern = '1';
                        this.useTypeName = 'SETTING.FAST_SETTING.PATTERN';
                    } else if (this.fastSettingObj.fastType == '2') {
                        this.fastSettingObj.biometrics = '1';
                        this.useTypeName = 'SETTING.FAST_SETTING.FACE_FINGER_PRINT';
                    }
                    this.fastSettingObj.fastStatus = this.tempFastData.fastStatus;
                    if (this.tempFastData.fastStatus == '1') {
                        this.fastSettingObj.fastNormal = '1';
                        this.showNonAgreeBtn = true;
                    } else if (this.tempFastData.fastStatus == '2') {
                        this.fastSettingObj.fastNormal = '1';
                        this.fastSettingObj.fastNonAgree = '1';
                        this.showNonAgreeBtn = false;
                    }
                    this.fastStatus = this.fastSettingObj.fastStatus;
                    this.fastNormal = this.fastSettingObj.fastNormal;
                    this.fastNonAgree = this.fastSettingObj.fastNonAgree;
                    this.fastType = this.fastSettingObj.fastType;
                    this.pattern = this.fastSettingObj.pattern;
                    this.biometrics = this.fastSettingObj.biometrics;
                }
            }

        }

        this.getBindDeviceList();
    }

    /**
     * 快速登入和一般快速交易 按鈕點擊事件
     */
    onClickNormal() {
        if (!this.phone && !this.phoneOtp && (!this.phoneCard || !this.isCardUser) && this.fastSettingObj.fastNormal == '0') {
            // 使用者沒有聯絡電話，要開啟一般快速設定，提示
            this.alert.show("SETTING.FAST_SETTING.MSG.NO_PHONE");
            return false;
        } else if ((!!this.phone || !!this.phoneOtp || (!!this.phoneCard && this.isCardUser)) && this.fastSettingObj.fastNormal == '0') {
            if (this.number >= 3) {
                // 使用者裝置綁定超過3台，要開啟一般快速設定，提示
                this.confirm.show("SETTING.FAST_SETTING.MSG.DEVICE_FULL").then(
                    () => {
                        this.deviceListObj.action = 'list';
                        this.deviceListObj.deviceData = this.deviceData;
                        this.deviceListObj.deviceList = this.deviceList;
                        this.nowPage = 'device-list';
                    },
                    () => {
                        
                    }
                );
                return false;
            } else if (this.tempFastData != null && this.tempFastData.fast_custId != this.custId) {
                // 裝置已被其他使用者綁定，提示
                this.confirm.show("SETTING.FAST_SETTING.MSG.ALREADY_BIND", {btnYesTitle: 'SETTING.FAST_SETTING.BTN.REPLACE'}).then(
                    () => {
                        this.newBind = true;
                        this.fastStatus = '1';
                        this.fastNormal = '1';
                        this.nowPage = 'useTypeSet';
                        // 變更Header左側按鈕功能
                        this.headerCtrl.setLeftBtnClick(() => {
                            // 返回把值改回原本設定的
                            this.backSetData();
                            this.nowPage = 'main';
                            this.headerCtrl.setLeftBtnClick(() => {
                                this.navgator.editBack();
                            });
                        });
                    },
                    () => {
                        
                    }
                );
            } else {
                this.newBind = true;
                this.fastStatus = '1';
                this.fastNormal = '1';
                this.nowPage = 'useTypeSet';
                // 變更Header左側按鈕功能
                this.headerCtrl.setLeftBtnClick(() => {
                    // 返回把值改回原本設定的
                    this.backSetData();
                    this.nowPage = 'main';
                    this.headerCtrl.setLeftBtnClick(() => {
                        this.navgator.editBack();
                    });
                });
            }
            return false;
        } else if (this.fastSettingObj.fastNormal == '1') {
            // 使用者要關閉一般快速設定，提示
            this.confirm.show("SETTING.FAST_SETTING.MSG.CLOSE_NORMAL_FAST").then(
                () => {
                    this.deviceListObj.action = 'delete';
                    this.deviceListObj.deviceData = this.deviceData;
                    this.deviceListObj.deviceList = this.deviceList;
                    this.nowPage = 'device-list';
                },
                () => {
                    
                }
            );
            return false;
        }
        
    }

    /**
     * 非約定快速交易 按鈕點擊事件
     */
    onClickNonAgree() {
        if (!this.phoneOtp && this.fastSettingObj.fastNonAgree == '0') {
            // 使用者沒有臨櫃約定電話，要開啟非約快速設定，提示
            this.alert.show("SETTING.FAST_SETTING.MSG.NO_OTP_PHONE");
            return false;
        } else if (!!this.phoneOtp && this.fastSettingObj.fastNonAgree == '0') {
            if (this.tempFastData != null && this.tempFastData.fast_custId != this.custId) {
                // 裝置已被其他使用者綁定，提示
                this.confirm.show("SETTING.FAST_SETTING.MSG.ALREADY_BIND", {btnYesTitle: 'SETTING.FAST_SETTING.BTN.REPLACE'}).then(
                    () => {
                        this.newBind = true;
                        this.fastStatus = '2';
                        this.fastNormal = '1';
                        this.fastNonAgree = '1';
                        this.biometrics = '0';
                        this.pattern = '0';
                        this.nowPage = 'useTypeSet';
                        // 變更Header左側按鈕功能
                        this.headerCtrl.setLeftBtnClick(() => {
                            // 返回把值改回原本設定的
                            this.backSetData();
                            this.nowPage = 'main';
                            this.headerCtrl.setLeftBtnClick(() => {
                                this.navgator.editBack();
                            });
                        });
                    },
                    () => {
                        
                    }
                );
            } else {
                this.newBind = true;
                this.fastStatus = '2';
                this.fastNormal = '1';
                this.fastNonAgree = '1';
                this.biometrics = '0';
                this.pattern = '0';
                this.nowPage = 'useTypeSet';
                // 變更Header左側按鈕功能
                this.headerCtrl.setLeftBtnClick(() => {
                    // 返回把值改回原本設定的
                    this.backSetData();
                    this.nowPage = 'main';
                    this.headerCtrl.setLeftBtnClick(() => {
                        this.navgator.editBack();
                    });
                });
            }
            return false;
        } else if (this.fastSettingObj.fastNonAgree == '1') {
            // 使用者要關閉非約快速設定，提示
            this.confirm.show("SETTING.FAST_SETTING.MSG.CLOSE_NON_AGREE_FAST").then(
                () => {
                    this.deviceListObj.action = 'delete';
                    this.deviceListObj.deviceData = this.deviceData;
                    this.deviceListObj.deviceList = this.deviceList;
                    this.nowPage = 'device-list';
                },
                () => {

                }
            );
            return false;
        }

    }

    /**
     * 使用模式 按鈕點擊事件
     */
    onClickUseType() {
        this.newBind = false;
        this.nowPage = 'useTypeSet';
        // 變更Header左側按鈕功能
        this.headerCtrl.setLeftBtnClick(() => {
            // 返回把值改回原本設定的
            this.backSetData();
            this.nowPage = 'main';
            this.headerCtrl.setLeftBtnClick(() => {
                this.navgator.editBack();
            });
        });
    }

    /**
     * 圖形碼變更 按鈕點擊事件
     */
    onClickGraphChange() {
        this.logger.error("GraphChange");
    }
    
    /**
     * 設備綁定數量 按鈕點擊事件
     */
    onClickDeviceList() {
        if (this.number < 1) {
            return false;
        }
        this.deviceListObj.action = 'list';
        this.deviceListObj.deviceData = this.deviceData;
        this.deviceListObj.deviceList = this.deviceList;
        this.nowPage = 'device-list';
    }

    /**
     * 快速交易設定使用須知 點擊事件
     */
    onClickFastSettingReadme() {
        this.nowPage = 'readme';
        // 變更Header左側按鈕功能
        this.headerCtrl.setLeftBtnClick(() => {
            this.nowPage = 'main';
            this.headerCtrl.setLeftBtnClick(() => {
                this.navgator.editBack();
            });
        });
    }

    /**
     * 臉部/指紋 按鈕點擊事件
     */
    onClickBiometrics() {
        if (this.newBind) {
            this.fastType = '2';
            this.biometrics = '1';
            this.nowPage = 'agree-content';
            // 註銷原有綁定資訊
            this.deleteBio();
            // 變更Header左側按鈕功能
            this.headerCtrl.setLeftBtnClick(() => {
                // 返回把值改回原本設定的
                // this.backSetData();
                this.clearSetData();
                this.ngOnInit();
                this.nowPage = 'main';
                this.headerCtrl.setLeftBtnClick(() => {
                    this.navgator.editBack();
                });
            });
            return false;
        }

        if (this.fastSettingObj.biometrics == '0' && this.fastSettingObj.pattern == '1') {
            this.confirm.show("SETTING.FAST_SETTING.MSG.ALREADY_OPEN_PATTERN").then(
                () => {
                    this.identifyPattern();
                },
                () => {

                }
            );
            return false;
        } else if (this.fastSettingObj.biometrics == '0' && this.fastSettingObj.pattern == '0') {
            this.fastType = '2';
            this.biometrics = '1';
            this.nowPage = 'agree-content';
            // 註銷原有綁定資訊
            this.deleteBio();
            // 變更Header左側按鈕功能
            this.headerCtrl.setLeftBtnClick(() => {
                // 返回把值改回原本設定的
                // this.backSetData();
                this.clearSetData();
                this.ngOnInit();
                this.nowPage = 'main';
                this.headerCtrl.setLeftBtnClick(() => {
                    this.navgator.editBack();
                });
            });
        } else if (this.fastSettingObj.biometrics == '1') {
            this.confirm.show("SETTING.FAST_SETTING.MSG.CLOSE_BIO").then(
                () => {
                    this.identifyBiometrics();
                },
                () => {

                }
            );
            return false;
        }
    }

    /**
     * 圖形碼 按鈕點擊事件
     */
    onClickPattern() {
        if (this.newBind) {
            this.fastType = '1';
            this.pattern = '1';
            this.nowPage = 'agree-content';
            // 註銷原有綁定資訊
            this.deleteBio();
            // 變更Header左側按鈕功能
            this.headerCtrl.setLeftBtnClick(() => {
                // 返回把值改回原本設定的
                // this.backSetData();
                this.clearSetData();
                this.ngOnInit();
                this.agreeContent = '0';
                this.nowPage = 'main';
                this.headerCtrl.setLeftBtnClick(() => {
                    this.navgator.editBack();
                });
            });
            return false;
        }

        if (this.fastSettingObj.biometrics == '1' && this.fastSettingObj.pattern == '0') {
            this.confirm.show("SETTING.FAST_SETTING.MSG.ALREADY_OPEN_BIO").then(
                () => {
                    this.identifyBiometrics();
                },
                () => {

                }
            );
            return false;
        } else if (this.fastSettingObj.biometrics == '0' && this.fastSettingObj.pattern == '0') {
            this.fastType = '1';
            this.pattern = '1';
            this.nowPage = 'agree-content';
            // 註銷原有綁定資訊
            this.deleteBio();
            // 變更Header左側按鈕功能
            this.headerCtrl.setLeftBtnClick(() => {
                // 返回把值改回原本設定的
                // this.backSetData();
                this.clearSetData();
                this.ngOnInit();
                this.agreeContent = '0';
                this.nowPage = 'main';
                this.headerCtrl.setLeftBtnClick(() => {
                    this.navgator.editBack();
                });
            });
        } else if (this.fastSettingObj.pattern == '1') {
            this.confirm.show("SETTING.FAST_SETTING.MSG.CLOSE_PATTERN").then(
                () => {
                    this.identifyPattern();
                },
                () => {

                }
            );
            return false;
        }
    }

    /**
     * 子層返回事件
     * @param e
     */
    onPageBackEvent(e) {
        let page = 'list';
        if (typeof e === 'object') {
            if (e.hasOwnProperty('page')) {
                page = e.page;
            }
        }

        if (page == 'result') {
            this.clearSetData();
            this.ngOnInit();
        }

        // 返回把值改回原本設定的
        this.backSetData();
        this.nowPage = 'main';
        this.headerCtrl.setOption({title: 'FUNC.SETTING.FAST_LOGIN_TRANSACTIONS_SETTING', leftBtnIcon: 'back', rightBtnIcon: ''});
        this.headerCtrl.setLeftBtnClick(() => {
            this.navgator.editBack();
        });
    }

    /**
     * [同意勾選]按鈕點擊事件
     */
    onAgreeClick() {
        this.agreeContent = (this.agreeContent == '0' ? '1' : '0');
    }

    /**
     * 條款頁[確認]按鈕點擊事件
     */
    onAgreeConfirmClick() {
        if (this.agreeContent == '0') {
            this.alert.show("SETTING.FAST_SETTING.AGREE_CHECK", {});
            return false;
        }
        this.outputData.custId = this.auth.getCustId();
        this.outputData.uuid = this.device.getDevicesInfo('uuid');
        this.outputData.fastType = this.fastType;
        this.outputData.fastStatus = this.fastStatus;
        this.outputData.os = this.device.getDevicesInfo('osVersion');
        this.outputData.platform = this.device.getDevicesInfo('platform');

        if (this.newBind) { // 新綁定
            if (this.pattern == '1') {
                // this.outputData.bioToken = 'abcdefghi';
                // this.nowPage = 'device-bind';
            } else if (this.biometrics == '1') {
                this.bioService.registerBiometric().then(
                    (res) => {
                        this.outputData.bioToken = res.token;
                        this.nowPage = 'device-bind';
                    },
                    (err) => {
                        this.handleError(err);
                    }
                );
            }
        } else { // 已綁定，變更模式
            if (this.pattern == '1') {

            } else if (this.biometrics == '1') {
                this.bioService.registerBiometric().then(
                    (res) => {
                        this.outputData.fastMac = res.token;
                    },
                    (err) => {
                        this.handleError(err);
                    }
                );
            }
        }
            // this.patternPopup.show(
            //     {
            //         // 'title': '繪製圖形鎖',
            //         // 'content': '請輸入至少6個點',
            //         'type': '2',
            //         // 'value': ['01', '02', '03', '04', '05', '06', '07', '08', '09'],
            //         // 'set_obj': {
            //         //     'min': 6,
            //         //     'max': 12
            //         // }
            //     }
            //     ).then(
            //         (suc) => {
            //             this.logger.error("suc", suc);  // suc => return 圖形密碼鎖值
            //             let temp: any = suc;
            //             this.outputData.fastMac = temp;
            //             this.nowPage = 'device-bind';
            //         },
            //         (fail) => {
            //             this.logger.error("fail", fail);  // 使用者取消
            //         }
            //     );

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

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    /**
     * 取得裝置綁定清單
     */
    private getBindDeviceList() {
        this.deviceListService.getData().then(
            (res) => {
                this.deviceData = res.deviceData;
                this.deviceList = res.deviceList;
                this.number = res.deviceData.length;
                this.haveList = true;
            },
            (errObj) => {
                this.haveList = false;
            }
        );
    }

    /**
     * 把值清掉
     */
    private clearSetData() {
        this.deviceData = [];
        this.deviceList = {};
        this.number = 0;
        this.fastSettingObj = { // 快速設定物件: 0 關閉 1 啟用
            fastStatus: '', // 快速設定狀態 1:約定 2:約定及非約
            fastNormal: '0', // 快速登入和一般快速交易
            fastNonAgree: '0', // 非約定快速交易
            fastType: '', // 使用模式 1:圖形 2:生物辨識
            pattern: '0', // 圖形碼
            biometrics: '0' // 臉部/指紋
        };
        this.fastStatus = '';
        this.fastNormal = '0';
        this.fastNonAgree = '0';
        this.fastType = '';
        this.pattern = '0';
        this.biometrics = '0';
        this.useTypeName = '';
        this.showNonAgreeBtn = false;
    }

    /**
     * 返回把值改回原本設定的
     */
    private backSetData() {
        this.fastStatus = this.fastSettingObj.fastStatus;
        this.fastNormal = this.fastSettingObj.fastNormal;
        this.fastNonAgree = this.fastSettingObj.fastNonAgree;
        this.fastType = this.fastSettingObj.fastType;
        this.pattern = this.fastSettingObj.pattern;
        this.biometrics = this.fastSettingObj.biometrics;
        this.agreeContent = '0';
    }

    /**
     * 驗證生物辨識
     */
    private identifyBiometrics() {
        return this.bioService.identifyByBiometric().then(
            (res) => {
                if (res.ret_code == '0') {
                    this.fastType = '1';
                    this.biometrics = '0';
                    this.pattern = '1';
                    this.nowPage = 'agree-content';
                    // 註銷原有綁定資訊
                    this.deleteBio();
                    // 變更Header左側按鈕功能
                    this.headerCtrl.setLeftBtnClick(() => {
                        // 返回把值改回原本設定的
                        // this.backSetData();
                        this.clearSetData();
                        this.ngOnInit();
                        this.nowPage = 'main';
                        this.headerCtrl.setLeftBtnClick(() => {
                            this.navgator.editBack();
                        });
                    });
                }
            },
            (err) => {
                let check_code = this.formateService.checkField(err, 'app_error_code', {
                    to_string: true,
                    trim_flag: true
                });
        
                if (check_code != '10') {
                    this.handleErrorService.handleError(err);
                }
            }
        );
    }

    /**
     * 驗證圖形碼
     */
    private identifyPattern() {
        this.fastType = '2';
        this.biometrics = '1';
        this.pattern = '0';
        this.nowPage = 'agree-content';
        // 註銷原有綁定資訊
        this.deleteBio();
        // 變更Header左側按鈕功能
        this.headerCtrl.setLeftBtnClick(() => {
            // 返回把值改回原本設定的
            // this.backSetData();
            this.clearSetData();
            this.ngOnInit();
            this.nowPage = 'main';
            this.headerCtrl.setLeftBtnClick(() => {
                this.navgator.editBack();
            });
        });
    }

    private handleError(errObj) {
        let check_code = this.formateService.checkField(errObj, 'app_error_code', {
            to_string: true,
            trim_flag: true
        });

        if (check_code != '10') {
            this.handleErrorService.handleError(errObj);
        }
        // 因為generateBio()已經先做disableBio
        // 但是新id執行生物辨識註冊產製的過程中又點擊取消(ret_code=='10')
        // 如果bio_status===9&fastlogin==='1'要重啟enableBio
        // const tempFtData = this.checkBindService.getLocalBindData();
        // this.bioService.queryBioService().then(
        //     (res) => {
        //         if (res.bio_status === 9 && tempFtData != null) {
        //             // 重啟生物辨識
        //             this.bioService.enableBioService().then(
        //                 (result) => {

        //                 },
        //                 (err) => {

        //                 }
        //             );
        //         }
        //     },
        //     (err) => {

        //     }
        // );

    }

    /**
     * 註銷生物辨識綁定，清除app快速綁定資訊，並通知中台解除綁定
     */
    private deleteBio() {
        // 清除本機裝置綁定資訊
        this.checkBindService.clearLocalBindData();
        // 通知中台解除綁定
        this.checkBindService.unBind();

        let security = {
            fastPay: 'N'
        };
        this.auth.setSecurity(security); // 修改使用者的快速交易為停用
    }

}
