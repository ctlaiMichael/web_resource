/**
 * [樣版] 要義用注意資訊(上方)
 * 營業日注意事項
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { CheckService } from '@template/check/check.service';
import { CacheService } from '@systems/system/cache/cache.service';
// --- API --- //
import { SPEC00050102ApiService } from '@api/spec00/spec00050102/spec00050102-api.service'; // 營業日

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'trans-note',
    templateUrl: './trans-note.component.html',
    styleUrls: [],
    providers: [SPEC00050102ApiService]
})
export class TransNoteComponent implements OnInit {
    /**
     * 參數處理
     */
    @Input() showType = ''; // 顯示類型
    setInfo = {
    };
    content = '';
    showConfirmInfo = false;
    showBusiness = false;

    private send_info = {
        default: 'FIELD.INFO.BUSINESS_NEXT', // 都沒有時
        nextday: 'FIELD.INFO.BUSINESS_NEXT',
        holiday: 'FIELD.INFO.BUSINESS_HOLIDAY'
    };

    private businessData: any = {}; // 營業日資料

    constructor(
        private _logger: Logger,
        private _checkService: CheckService,
        private _cacheService: CacheService,
        private spec00050102: SPEC00050102ApiService
    ) { }

    ngOnInit() {
        if (this.showType == 'confirm') {
            this.showConfirmInfo = true;
        }

        this.checkBusinessInfo();
    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

    private checkBusinessInfo() {
        this.content = this.send_info['default'];
        

    }

    /**
     * 取得營業日
     */
    private getBusinessDay(): Promise<any> {
        let data: any;
        let option = {};
        const cache_key = 'business-info';
        const cache_data = this._cacheService.checkCacheData(cache_key, option);
        if (cache_data) {
            this.businessData = cache_data;
            return Promise.resolve(cache_data);
        }

        return this.spec00050102.getData({}, option).then(
            (successObj) => {
                let cache_option = this._cacheService.getCacheSet(cache_key);
                this._cacheService.save(cache_key, successObj, cache_option);
                this.businessData = successObj;
                return Promise.resolve(successObj);
            },
            (failedObj) => {
                return Promise.reject(failedObj);
            }
        );
    }


}
