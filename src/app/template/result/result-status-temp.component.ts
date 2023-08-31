/**
 * 交易結果頁公版
 */
import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '@systems/system/logger/logger.service';
import { NavgatorService } from '@systems/route/navgator/navgator.service';
import { FormateService } from '@template/formate/formate.service';
import { ResultStatusTemp } from '@template/result/result-status-temp.class';
import { HeaderCtrlService } from '@systems/route/layout/header/header-ctrl.service';
import { TranslateService } from '@ngx-translate/core';
import { ObjectCheckUtil } from '@util/check/object-check-util';

@Component({
    selector: 'app-result-status-temp',
    templateUrl: './result-status-temp.component.html',
    styleUrls: [],
    providers: []
})

export class ResultStatusTempComponent implements OnInit {
    /**
     * 參數處理
     */
    @Input() setData: any;
    @Input() ctrlHeader: any; // 共用自動調整Header 0: 關閉 1: 開啟 

    showClass = '';
    showClass2 = '';
    title = ''; // 標題
    title_trans = ''; // 交易功能標題
    title_params: any = {
        param: ''
    }; // 副標題i18n參數
    msg = ''; // 副標題
    msg_params: any = {}; // 副標題i18n參數
    responseTime = ''; // 交易時間
    errCode = ''; // 錯誤代碼

    showData = {
        msg: false, // 顯示副標題
        responseTime: false, // 顯示交易時間
        errCode: false // 顯示錯誤代碼
    };

    private classType = '';
    private class_list = {
        'success': 'result_line_succeed',
        'error': 'result_line_fault',
        'warning': 'result_line_error'
    };

    private class_list2 = {
        'success': 'i_succeed',
        'error': 'i_fault',
        'warning': 'i_error'
    };

    constructor(
        private _logger: Logger,
        private _formateService: FormateService,
        private navgator: NavgatorService,
        private headerCtrl: HeaderCtrlService,
        private translate: TranslateService,
    ) { }

    ngOnInit() {
        if (typeof this.ctrlHeader == 'undefined') {
            this.ctrlHeader = '1';
        }

        if (this.ctrlHeader == '1') {
            this.headerCtrl.setOption({ leftBtnIcon: '', rightBtnIcon: 'finish' }); // 變更Header按鈕樣式
            this.headerCtrl.setLeftBtnClick(() => {
                
            });
            this.headerCtrl.setRightBtnClick(() => {
                this.navgator.editBack();
            });
        }

        if (typeof this.setData === 'object' && this.setData) {
            let defaultOptions = new ResultStatusTemp();
            const paramsSet = { ...defaultOptions, ...this.setData };
            this.classType = paramsSet.classType;
            this.title = paramsSet.title;
            this.title_trans = paramsSet.title_trans;
            let param = ObjectCheckUtil.checkObjectList(paramsSet.title_params, 'param');
            if (!!param) {
                this.translate.get(paramsSet.title_params.param).subscribe((val) => {
                    this.title_params.param = val;
                });
            }
            if (paramsSet.title != paramsSet.msg) {
                this.msg = paramsSet.msg;
            }
            this.msg_params = paramsSet.msg_params;
            if (!!paramsSet.content) {
                this.msg = paramsSet.content;
            }
            this.responseTime = paramsSet.responseTime;
            if (this.msg !== '') {
                this.showData.msg = true;
            }
            if (this.responseTime !== '') {
                this.showData.responseTime = true;
            }

            if (this.class_list.hasOwnProperty(this.classType)) {
                this.showClass = this.class_list[this.classType];
                this.showClass2 = this.class_list2[this.classType];
            } else {
                this.showClass = this.class_list['success'];
                this.showClass2 = this.class_list2['success'];
            }

            let error_code = ObjectCheckUtil.checkObjectList(paramsSet, 'app_error_code');
            let error_code_hide = ObjectCheckUtil.checkObjectList(paramsSet, 'app_error_code_hide');
            if (!!error_code && error_code_hide == false) {
                this.errCode = '(' + error_code + ')';
                this.showData.errCode = true;
            }

        }
    }

}
