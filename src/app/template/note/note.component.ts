/**
 * [樣版] 注意事項
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { NotePopupService } from '@template/msg/note-popup/note-popup.service';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: [],
    providers: []
})
export class NoteComponent implements OnInit {
    /**
     * 參數處理
     */
    @Input() options: any; // NotePopup的title、content

    constructor(
        private notePopup: NotePopupService,
        private _logger: Logger
    ) { }

    ngOnInit() {
        
    }

    /**
     * 打開popup
     */
    popOpen() {
        this.notePopup.show(this.options);
    }

    // --------------------------------------------------------------------------------------------
    //  ____       _            _         _____                 _
    //  |  _ \ _ __(_)_   ____ _| |_ ___  | ____|_   _____ _ __ | |_
    //  | |_) | '__| \ \ / / _` | __/ _ \ |  _| \ \ / / _ \ '_ \| __|
    //  |  __/| |  | |\ V / (_| | ||  __/ | |___ \ V /  __/ | | | |_
    //  |_|   |_|  |_| \_/ \__,_|\__\___| |_____| \_/ \___|_| |_|\__|
    // --------------------------------------------------------------------------------------------

}
