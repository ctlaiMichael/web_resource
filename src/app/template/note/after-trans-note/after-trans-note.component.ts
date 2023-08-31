/**
 * [樣版] 交易結果注意事項
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { AuthService } from '@systems/system/auth/auth.service';
import { CheckService } from '@template/check/check.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'after-trans-note',
    templateUrl: './after-trans-note.component.html',
    styleUrls: [],
    providers: []
})
export class AfterTransNoteComponent implements OnInit {
    /**
     * 參數處理
     */
    setInfo = {
        type: '',
        mail: '',
        phone: ''
    };
    content = '';

    private send_info = {
        default: 'FIELD.INFO.TRANS_NOTE_UNKNOW', // 都沒有時
        mail: 'FIELD.INFO.TRANS_NOTE_MAIL',
        phone: 'FIELD.INFO.TRANS_NOTE_PHONE'
    };

    constructor(
        private _logger: Logger,
        private auth: AuthService,
        private _checkService: CheckService
    ) { }

    ngOnInit() {
        let mail = this.auth.getEmail();
        let phone = this.auth.getPhone(); // [TODO: 待確認發的簡訊用哪個電話]
        this.setInfo.mail = mail;
        this.setInfo.phone = phone;

        if (this._checkService.checkEmpty(mail, true)) {
            this.content = this.send_info['mail'];
        } else if (this._checkService.checkEmpty(phone, true)) {
            this.content = this.send_info['phone'];
        } else {
            this.content = this.send_info['default'];
        }

    }


    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}
