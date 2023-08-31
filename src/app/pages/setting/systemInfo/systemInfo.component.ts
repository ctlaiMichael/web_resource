/**
 * 系統資訊
 */
import { Component, OnInit } from '@angular/core';
import { DeviceService } from '@lib/device/device.service';
import { logger } from '@util/log-util';
import { environment } from '@environments/environment';
import { Logger } from '@systems/system/logger/logger.service';
import { FormateService } from '@template/formate/formate.service';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-systemInfo',
    templateUrl: './systemInfo.component.html'
})
export class SystemInfoComponent implements OnInit {

    deviceInfo = {
        platform: '',
        appversion: '',
        name: '',
        uuid: '',
        new_udid: '',
        server_path: '',
        osversion: '',
        model: ''

    };
    constructor(
        private _logger: Logger,
        private _deviceService: DeviceService,
        private _formateService: FormateService
    ) { }

    ngOnInit() {
        // this._logger.error("有成功");
        this.getDeviceInfo();

    }

    /**
     * 取得裝置資訊
     */
    getDeviceInfo() {
        let systeminformation = this._deviceService.getDevicesInfo();
        this.deviceInfo.appversion = this._formateService.checkField(systeminformation, 'appVersion');
        this.deviceInfo.platform = this._formateService.checkField(systeminformation, 'platform');
        this.deviceInfo.name = this._formateService.checkField(systeminformation, 'hostname');
        this.deviceInfo.uuid = this._formateService.checkField(systeminformation, 'uuid');
        this.deviceInfo.osversion = this._formateService.checkField(systeminformation, 'osVersion');
        this.deviceInfo.model = this._formateService.checkField(systeminformation, 'model');

        this._logger.step('deviceInfo', 'systeminfo Component', systeminformation);
    }

}
