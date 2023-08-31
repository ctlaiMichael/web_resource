/**
 * 已綁定裝置清單
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { DeviceListService } from '@pages/setting/shared/service/device-list.service';
import { CheckDeviceBindService } from '@systems/system/init/check-device-bind.service';
import { ConfirmService } from '@template/msg/confirm/confirm.service';
import { DeviceService } from '@lib/device/device.service';
import { AuthService } from '@systems/system/auth/auth.service';

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: []
})

export class DeviceListComponent implements OnInit {

    @Input() inputData;

    @Output() backPageEmit: EventEmitter<any> = new EventEmitter<any>();

    nowPage = 'device-list';
    isEditing = false; // 是否按下編輯按鈕
    device_uuid = ''; // 此裝置uuid

    deviceData = []; // 已綁定裝置清單
    deviceList = {}; // 已綁定裝置Obj

    nowStep_update = 'edit'; // 當前步驟
    // 步驟列data
    stepMenuData_update = [
        {
            id: 'edit',
            name: 'STEP_BAR.DEVICE_BIND.UPDATE' // 修改資料頁
        },
        {
            id: 'result',
            name: 'STEP_BAR.COMMON.RESULT', // 結果頁
            // 執行此步驟時是否隱藏步驟列
            hidden: true
        }
    ];

    nowStep_delete = 'check'; // 當前步驟
    // 步驟列data
    stepMenuData_delete = [
        {
            id: 'check',
            name: 'STEP_BAR.DEVICE_BIND.CHECK' // 確認資料頁
        },
        {
            id: 'result',
            name: 'STEP_BAR.COMMON.RESULT', // 結果頁
            // 執行此步驟時是否隱藏步驟列
            hidden: true
        }
    ];

    chooseDeviceObj = {
        uuid: '',
        deviceName: '',
        platform: ''
    };

    output_update = {
        uuid: '',
        deviceName: '',
        platform: ''
    };

    output_delete = {
        uuid: '',
        deviceName: '',
        platform: '',
        bindTime: '',
        type: '1'
    };

    checkData = {
        status: false,
        errMsgObj: {}
    };

    resStatus = false; // 交易結果 true: 成功
    statusObj = {}; // 交易結果Obj
    resultType = false;

    constructor(
        private logger: Logger,
        private headerCtrl: HeaderCtrlService,
        private navgator: NavgatorService,
        private deviceListService: DeviceListService,
        private checkDeviceBind: CheckDeviceBindService,
        private confirm: ConfirmService,
        private deviceService: DeviceService,
        private auth: AuthService
    ) { }

    ngOnInit() {
        // 變更Header標題和右側按鈕樣式
        this.headerCtrl.setOption({title: 'SETTING.FAST_SETTING.TITLE1', rightBtnIcon: 'edit'});
        // 變更Header左側按鈕功能
        this.headerCtrl.setLeftBtnClick(() => {
            let output = {
                page: 'edit'
            };
            this.onBackPageEvent(output);
        });
        // 變更Header右側按鈕功能
        this.headerCtrl.setRightBtnClick(() => {
            this.onRightBtnClick();
        });
        this.device_uuid = this.deviceService.getDevicesInfo('uuid');
        this.deviceData = this.inputData.deviceData;
        this.deviceList = this.inputData.deviceList;

        if (this.inputData.action == 'delete') {
            this.chooseDeviceObj.uuid = this.device_uuid;
            this.chooseDeviceObj.deviceName = this.deviceList[this.device_uuid].deviceName;
            this.chooseDeviceObj.platform = this.deviceList[this.device_uuid].platform;
            this.nowPage = 'delete';
            // 變更Header標題和右側按鈕樣式
            this.headerCtrl.setOption({ title: 'SETTING.FAST_SETTING.TITLE3', rightBtnIcon: '' });
            // 變更Header左側按鈕功能
            this.headerCtrl.setLeftBtnClick(() => {
                let output = {
                    page: 'edit'
                };
                this.onBackPageEvent(output);
            });
        }
    }

    /**
     * [刪除]按鈕點擊事件
     */
    onDeleteBtnClick(item) {
        this.chooseDeviceObj.uuid = item.uuid;
        this.chooseDeviceObj.deviceName = item.deviceName;
        this.chooseDeviceObj.platform = item.platform;
        this.nowPage = 'delete';
        // 變更Header標題和右側按鈕樣式
        this.headerCtrl.setOption({title: 'SETTING.FAST_SETTING.TITLE3', rightBtnIcon: ''});
        // 變更Header左側按鈕功能
        this.headerCtrl.setLeftBtnClick(() => {
            this.backToDeviceList();
        });

    }

    /**
     * [修改]按鈕點擊事件
     */
    onModifyBtnClick(item) {
        this.chooseDeviceObj.uuid = item.uuid;
        this.chooseDeviceObj.deviceName = item.deviceName;
        this.chooseDeviceObj.platform = item.platform;
        this.nowPage = 'update';
        // 變更Header標題和右側按鈕樣式
        this.headerCtrl.setOption({title: 'SETTING.FAST_SETTING.TITLE2', rightBtnIcon: ''});
        // 變更Header左側按鈕功能
        this.headerCtrl.setLeftBtnClick(() => {
            this.backToDeviceList();
        });

    }

    /**
     * [取消]按鈕點擊事件
     */
    onCancelBtnClick() {
        this.backToDeviceList();

        // this.confirm.cancelEdit({type: 'edit'}).then(
        //     (res) => {
        //         this.navgator.editBack();
        //     },
        //     (errObj) => {

        //     }
        // );
    }

    /**
     * [儲存]按鈕點擊事件
     */
    onSaveBtnClick() {
        this.checkData = this.deviceListService.checkData(this.chooseDeviceObj);

        if (this.checkData.status) {
            this.output_update.uuid = this.chooseDeviceObj.uuid;
            this.output_update.deviceName = this.chooseDeviceObj.deviceName;

            this.deviceListService.updateData(this.output_update).then(
                (res) => {
                    this.resStatus = res.status;
                    this.statusObj = res.statusObj;
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
                    this.resultType = true;
                    this.headerCtrl.setOption(
                        { title: 'SETTING.FAST_SETTING.TITLE2', leftBtnIcon: '', rightBtnIcon: 'finish' }, true); // 變更Header按鈕樣式
                    this.headerCtrl.setRightBtnClick(() => {
                        this.backToDeviceList();
                        // this.navgator.editBack();
                    });
                    this.deviceListService.removeCache();
                }
            );
        }
        
    }

    /**
     * [確認]按鈕點擊事件
     */
    onConfirmBtnClick() {
        this.checkData = this.deviceListService.checkData(this.chooseDeviceObj);

        if (this.checkData.status) {
            this.output_delete.uuid = this.chooseDeviceObj.uuid;

            this.deviceListService.deleteData(this.output_delete).then(
                (res) => {
                    this.resStatus = res.status;
                    this.statusObj = res.statusObj;
                    if (this.output_delete.uuid == this.device_uuid) {
                        let setObj = {
                            fastPay: 'N',
                            deviceBind: '0',
                            mode: '',
                            fastAgreement: ''
                        };
                        this.auth.setFastData(setObj);
                        this.checkDeviceBind.clearLocalBindData();
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
                    this.resultType = true;
                    this.headerCtrl.setOption(
                        { title: 'SETTING.FAST_SETTING.TITLE3', leftBtnIcon: '', rightBtnIcon: 'finish' }, true); // 變更Header按鈕樣式
                    this.headerCtrl.setRightBtnClick(() => {
                        this.backToDeviceList();
                        // this.navgator.editBack();
                    });
                    this.deviceListService.removeCache();
                }
            );
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
     * 返回快速交易設定頁面
     */
    private onBackPageEvent(output) {
        this.backPageEmit.emit(output);
    }

    /**
     * Header右側按鈕點擊事件
     */
    private onRightBtnClick() {
        if (this.isEditing) {
            this.isEditing = false;
            this.headerCtrl.setOption({title: 'SETTING.FAST_SETTING.TITLE1', rightBtnIcon: 'edit'}); // 變更Header右側按鈕樣式
        } else {
            this.isEditing = true;
            this.headerCtrl.setOption({title: 'SETTING.FAST_SETTING.TITLE1', rightBtnIcon: 'finish'}); // 變更Header右側按鈕樣式
        }
        // 變更Header左側按鈕功能
        this.headerCtrl.setLeftBtnClick(() => {
            let output = {
                page: (this.resultType ? 'result' : 'edit')
            };
            this.onBackPageEvent(output);
        });

    }

    /**
     * 返回裝置清單頁面
     */
    private backToDeviceList() {
        this.nowPage = 'device-list';
        this.isEditing = false;
        // 變更Header標題和右側按鈕樣式
        this.headerCtrl.setOption({title: 'SETTING.FAST_SETTING.TITLE1', rightBtnIcon: 'edit'});
        // 變更Header右側按鈕功能
        this.headerCtrl.setRightBtnClick(() => {
            this.onRightBtnClick();
        });
        // 變更Header左側按鈕功能
        this.headerCtrl.setLeftBtnClick(() => {
            let output = {
                page: (this.resultType ? 'result' : 'edit')
            };
            this.onBackPageEvent(output);
        });

        if (this.resultType) {
            this.deviceData = [];
            this.deviceList = {};
            this.deviceListService.getData().then(
                (res) => {
                    this.deviceData = res.deviceData;
                    this.deviceList = res.deviceList;
                },
                (errObj) => {
                    
                }
            );
        }
    }

}
