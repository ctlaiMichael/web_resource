/**
 * [樣版] 錯誤訊息(白箱)
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';

@Component({
    selector: 'app-error-box',
    templateUrl: './error-box.component.html',
    styleUrls: [],
    providers: []
})
export class ErrorBoxComponent implements OnInit {
    /**
     * 參數處理
     */
    @Input() errorMsg: string; 
    message = '';

    constructor (
        private _logger: Logger
    ) { }

    ngOnInit() {
        this._logger.log("into ErrorBoxComponent, errorMsg:",this.errorMsg);
        this.message = this.errorMsg;
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}
